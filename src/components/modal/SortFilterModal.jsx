import { X, Calendar, Clock, ArrowUpDown } from "lucide-react";
import Overlay from "../common/overlay";

function SortFilterModal({
  onClose,
  sortBy,
  setSortBy,
  filterStatus,
  setFilterStatus,
}) {
  const sortOptions = [
    { id: "Due Date", icon: <Calendar size={18} /> },
    { id: "Creation Date", icon: <Clock size={18} /> },
    { id: "Alphabetical", icon: <ArrowUpDown size={18} /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <Overlay onClose={onClose} />

      <div className="relative sm:w-2/4 sm:m-auto sm:rounded-3xl bg-white rounded-t-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Sort & Filter</h2>
          <button
            onClick={() => {
              setSortBy("Due Date");
              setFilterStatus("All");
            }}
            className="text-blue-500 font-semibold text-sm"
          >
            Reset
          </button>
        </div>

        <section className="mb-8">
          <p className="font-bold text-gray-700 mb-4">Sort By</p>
          <div className="space-y-3">
            {sortOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSortBy(option.id)}
                className={`w-full flex justify-between items-center p-4 rounded-2xl border transition-all ${
                  sortBy === option.id
                    ? "border-blue-500 bg-blue-50/50"
                    : "border-gray-100"
                }`}
              >
                <div className="flex items-center gap-3 text-gray-600">
                  {option.icon}
                  <span className="font-medium">{option.id}</span>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    sortBy === option.id ? "border-blue-500" : "border-gray-300"
                  }`}
                >
                  {sortBy === option.id && (
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <p className="font-bold text-gray-700 mb-4">Filter by Status</p>
          <div className="flex bg-gray-100 p-1 rounded-xl">
            {["All", "Active", "Completed"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all ${
                  filterStatus === status
                    ? "bg-white shadow-sm text-gray-800"
                    : "text-gray-500"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </section>

        {/* Footer Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-4 border border-gray-100 rounded-2xl font-bold text-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-4 bg-blue-600 rounded-2xl font-bold text-white shadow-lg shadow-blue-200"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default SortFilterModal;
