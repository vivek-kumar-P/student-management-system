import { useEffect, useState } from "react";
import api from "../api/axios";
import StudentTable from "../components/StudentTable";
import StudentForm from "../components/StudentForm";
import ConfirmDialog from "../components/ConfirmDialog";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadStudents = () => {
    api
      .get("/students/", { params: { search, department } })
      .then((res) => {
        setStudents(res.data);
        setError("");
      })
      .catch(() => setError("Could not load students."))
      .finally(() => setLoading(false));
  };

  const loadDepartments = () => {
    api.get("/students/").then((res) => {
      setDepartments([...new Set(res.data.map((s) => s.department))].sort());
    });
  };

  useEffect(() => {
    const timer = setTimeout(loadStudents, 300);
    return () => clearTimeout(timer);
  }, [search, department]);

  useEffect(loadDepartments, []);

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setFormErrors({});
  };

  const handleSave = (data) => {
    const request = editing
      ? api.put(`/students/${editing.id}/`, data)
      : api.post("/students/", data);

    request
      .then(() => {
        showToast(editing ? "Student updated" : "Student added");
        closeForm();
        loadStudents();
        loadDepartments();
      })
      .catch((err) => setFormErrors(err.response?.data || {}));
  };

  const handleDelete = () => {
    api
      .delete(`/students/${deleting.id}/`)
      .then(() => {
        showToast("Student deleted");
        setDeleting(null);
        loadStudents();
        loadDepartments();
      })
      .catch(() => {
        showToast("Delete failed", "error");
        setDeleting(null);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Student Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          + Add Student
        </button>
      </div>

      <div className="flex gap-3 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="flex-1 border border-gray-300 rounded p-2"
        />
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border border-gray-300 rounded p-2"
        >
          <option value="">All departments</option>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <StudentTable
          students={students}
          onEdit={(s) => {
            setEditing(s);
            setShowForm(true);
          }}
          onDelete={(s) => setDeleting(s)}
        />
      )}

      {showForm && (
        <StudentForm
          initialData={editing}
          onSubmit={handleSave}
          onClose={closeForm}
          errors={formErrors}
        />
      )}

      {deleting && (
        <ConfirmDialog
          message={`Delete ${deleting.name}? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
        />
      )}

      {toast && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded text-white shadow ${
            toast.type === "error" ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}