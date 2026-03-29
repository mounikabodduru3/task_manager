import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard({ setPage }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🌙 persist dark mode
  const [dark, setDark] = useState(
    localStorage.getItem("dark") === "true"
  );

  // 🔔 toast state
  const [toast, setToast] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("dark", dark);
  }, [dark]);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: "Bearer " + token
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/tasks",
        { headers }
      );
      setTasks(res.data);
    } catch {
      alert("Error fetching tasks");
    }
    setLoading(false);
  };

  const addOrUpdateTask = async () => {
    if (!title) return alert("Enter task");

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/v1/tasks/${editId}`,
          { title },
          { headers }
        );
        showToast("Task updated ✏️");
        setEditId(null);
      } else {
        await axios.post(
          "http://localhost:5000/api/v1/tasks",
          { title },
          { headers }
        );
        showToast("Task added successfully ✅");
      }

      setTitle("");
      fetchTasks();
    } catch {
      alert("Error saving task");
    }
  };

  const deleteTask = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/v1/tasks/${id}`,
      { headers }
    );
    showToast("Task deleted 🗑️");
    fetchTasks();
  };

  const startEdit = (task) => {
    setTitle(task.title);
    setEditId(task._id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setPage("login");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="dashboard">

      {/* 🔔 Toast */}
      {toast && <div className="toast">{toast}</div>}

      <div className="topbar">
        <h2>📋 Task Dashboard</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setDark(!dark)}>
            {dark ? "☀️" : "🌙"}
          </button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      {/* 👋 Welcome */}
      <h3>👋 Welcome, {user?.name}</h3>

      <div className="task-input">
        <input
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addOrUpdateTask}>
          {editId ? "Update" : "+ Add Task"}
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && tasks.length === 0 && (
        <p className="empty">No tasks yet 🚀</p>
      )}

      {tasks.map((task) => (
        <div className="task" key={task._id}>
          <span>{task.title}</span>
          <div>
            <button onClick={() => startEdit(task)}>✏️</button>
            <button onClick={() => deleteTask(task._id)}>🗑️</button>
          </div>
        </div>
      ))}
    </div>
  );
}