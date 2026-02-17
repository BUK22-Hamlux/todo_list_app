import { useState } from "react";
import Overlay from "./Overlay";

function CreateTodo({ onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState(false);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError(true);
      return;
    }

    const newTodo = {
      id: Date.now(),
      title: title,
      description: description,
      dueDate: dueDate,
    };
    onSave(newTodo);
  };
  return (
    <fieldset className="fixed inset-0 z-50 flex flex-col justify-end">
      <Overlay onClose={onClose} />

      <form className="relative sm:w-2/4 sm:m-auto sm:rounded-3xl bg-white rounded-t-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
        <h2 className="text-xl font-bold mb-6">Create New Task</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Task Name
            </label>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError(false);
              }}
              type="text"
              placeholder="e.g., Buy groceries"
              className={`
                            w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 
                            ${error ? "border-red-500 focus:ring-red-500" : "border-blue-400 focus:ring-blue-500"}
                        `}
            />
            {error && (
              <p className="text-red-500 text-xs text-left mt-1 ml-1">
                Please add a title to your task.
              </p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-semibold">Description</label>
              <span className="text-xs text-gray-400 font-normal">
                Optional
              </span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details, sub-tasks, or notes here..."
              className="w-full p-3 border border-gray-200 rounded-xl h-28 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl text-gray-500"
            />
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <button
            onClick={handleCreate}
            className="w-full bg-blue-600 text-white py-3 rounded-full font-bold"
          >
            Create Task
          </button>

          <button
            onClick={onClose}
            className="w-full bg-white text-gray-500 py-3 rounded-full font-bold border border-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </fieldset>
  );
}

export default CreateTodo;
