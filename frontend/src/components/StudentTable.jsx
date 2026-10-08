export default function StudentTable({ students, onEdit, onDelete }) {
  if (students.length === 0) {
    return <p className="text-gray-500">No students found.</p>;
  }

  return (
    <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="p-3">ID</th>
          <th className="p-3">Name</th>
          <th className="p-3">Email</th>
          <th className="p-3">Age</th>
          <th className="p-3">Department</th>
          <th className="p-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s.id} className="border-t border-gray-200 hover:bg-gray-50">
            <td className="p-3">{s.id}</td>
            <td className="p-3">{s.name}</td>
            <td className="p-3">{s.email}</td>
            <td className="p-3">{s.age}</td>
            <td className="p-3">{s.department}</td>
            <td className="p-3 text-right space-x-2">
              <button
                onClick={() => onEdit?.(s)}
                className="px-3 py-1 rounded border border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete?.(s)}
                className="px-3 py-1 rounded border border-red-600 text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}