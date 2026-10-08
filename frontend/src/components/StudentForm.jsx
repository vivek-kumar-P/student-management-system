import { useState } from "react";

const empty = { name: "", email: "", age: "", department: "" };

export default function StudentForm({ initialData, onSubmit, onClose, errors }) {
  const [form, setForm] = useState(initialData || empty);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, age: Number(form.age) });
  };

  const fields = [
    { name: "name", label: "Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "age", label: "Age", type: "number" },
    { name: "department", label: "Department", type: "text" },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-full max-w-md space-y-3"
      >
        <h2 className="text-xl font-bold">
          {initialData ? "Edit Student" : "Add Student"}
        </h2>

        {fields.map((f) => (
          <div key={f.name}>
            <label className="block text-sm font-medium mb-1">{f.label}</label>
            <input
              name={f.name}
              type={f.type}
              value={form[f.name]}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded p-2"
            />
            {errors?.[f.name] && (
              <p className="text-red-600 text-sm mt-1">{errors[f.name][0]}</p>
            )}
          </div>
        ))}

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}