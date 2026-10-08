export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm space-y-4">
        <h2 className="text-xl font-bold">Confirm Delete</h2>
        <p className="text-gray-700">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded border border-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}