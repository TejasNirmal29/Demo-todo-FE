import { useEffect, useState } from "react";
import API from "./api";

function App() {
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", dueDate: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add or Update todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.dueDate) return;

    try {
      if (editingId) {
        await API.put(`/todos/${editingId}`, form);
        setEditingId(null);
      } else {
        await API.post("/todos", form);
      }
      setForm({ title: "", description: "", dueDate: "" });
      fetchTodos();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving todo");
    }
  };

  // Delete todo
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;
    await API.delete(`/todos/${id}`);
    fetchTodos();
  };

  // Edit todo
  const handleEdit = (todo) => {
    setForm({ title: todo.title, description: todo.description, dueDate: todo.dueDate?.slice(0, 10) });
    setEditingId(todo._id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "#f1c40f";
      case "done": return "#2ecc71";
      case "rejected": return "#e74c3c";
      default: return "#95a5a6";
    }
  };

  return (
    <div style={{
      maxWidth: "700px",
      margin: "2rem auto",
      padding: "2rem",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <h1 style={{ textAlign: "center", color: "#34495e" }}>📝 Todo App</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          style={{
            padding: "0.75rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem"
          }}
          required
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={{
            padding: "0.75rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem"
          }}
          required
        />
        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          style={{
            padding: "0.75rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem"
          }}
          required
        />
        <button type="submit" style={{
          padding: "0.75rem",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#3498db",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "background-color 0.2s"
        }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = "#2980b9"}
          onMouseOut={e => e.currentTarget.style.backgroundColor = "#3498db"}
        >
          {editingId ? "Update Todo" : "Add Todo"}
        </button>
      </form>

      {/* Todo List */}
      <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
        {todos.map((todo) => (
          <li key={todo._id} style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
          }}>
            <div>
              <b style={{ color: "#34495e" }}>{todo.title}</b>: {todo.description}
              <div style={{ fontSize: "0.85rem", color: "#7f8c8d" }}>Due: {new Date(todo.dueDate).toLocaleDateString()}</div>
              <div style={{ fontSize: "0.85rem", fontWeight: "bold", color: getStatusColor(todo.status) }}>{todo.status.toUpperCase()}</div>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => handleEdit(todo)}
                style={{
                  backgroundColor: "#2ecc71",
                  border: "none",
                  color: "#fff",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.85rem"
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = "#27ae60"}
                onMouseOut={e => e.currentTarget.style.backgroundColor = "#2ecc71"}
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(todo._id)}
                style={{
                  backgroundColor: "#e74c3c",
                  border: "none",
                  color: "#fff",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.85rem"
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = "#c0392b"}
                onMouseOut={e => e.currentTarget.style.backgroundColor = "#e74c3c"}
              >
                ❌ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;