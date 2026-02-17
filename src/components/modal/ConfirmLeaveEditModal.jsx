function LeaveEdit({ onCancel, onConfirm, }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm">
        <h3 className="font-bold text-lg mb-2">Do you want to leave?</h3>
        <p className="text-gray-600 mb-6">you have an unsaved changes</p>

        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Leave
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeaveEdit;