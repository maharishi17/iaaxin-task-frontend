import { useEffect, useState } from "react";
import AddTodoForm from "../Components/AddTodoForm";
import CategoryFilter from "../Components/CategoryFilter";
import SearchBar from "../Components/SearchBar";
import api from "../utils/api";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // const API = "http://localhost:5000/api/tasks";
  // const authHeader = () => {
  //   const token = localStorage.getItem("token");
  //   return token ? { Authorization: `Bearer ${token}` } : {};
  // };

  // async function fetchTodos() {
  //   const res = await fetch(API, { headers: { ...authHeader() } });
  //   if (!res.ok) return;
  //   const data = await res.json();
  //   setTodos(data);
  // }
  async function fetchTodos() {
    try {
      const { data } = await api.get("/tasks");
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  }
  useEffect(() => {
    fetchTodos();
  }, []);

  // async function handleAdd(todo) {
  //   const res = await fetch(API, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json", ...authHeader() },
  //     body: JSON.stringify(todo),
  //   });
  //   if (!res.ok) return;
  //   fetchTodos();
  // }

  async function handleAdd(todo) {
    try {
      await api.post("/tasks", todo);
      fetchTodos();
    } catch (error) {
      console.error("Failed to add todo:", error);
      // Optionally handle error (e.g., show notification)
    }
  }

  // async function handleEdit(todo) {
  //   const newTitle = prompt("Edit task name:", todo.title);
  //   if (newTitle === null) return;
  //   const res = await fetch(`${API}/${todo._id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json", ...authHeader() },
  //     body: JSON.stringify({ title: newTitle }),
  //   });
  //   if (!res.ok) return;
  //   fetchTodos();
  // }

  async function handleEdit(todo) {
    const newTitle = prompt("Edit task name:", todo.title);
    if (newTitle === null) return;

    try {
      await api.put(`/tasks/${todo._id}`, { title: newTitle });
      fetchTodos();
    } catch (error) {
      console.error("Failed to edit todo:", error);
    }
  }
  // async function handleDelete(id) {
  //   const res = await fetch(`${API}/${id}`, {
  //     method: "DELETE",
  //     headers: { ...authHeader() },
  //   });
  //   if (!res.ok) return;
  //   fetchTodos();
  // }

  async function handleDelete(id) {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Failed to delete todo:", error);
      // Optionally notify user of the failure
    }
  }

  // async function handleToggle(id) {
  //   const todo = todos.find((t) => t._id === id);
  //   if (!todo) return;
  //   const res = await fetch(`${API}/${id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json", ...authHeader() },
  //     body: JSON.stringify({ completed: !todo.completed }),
  //   });
  //   if (!res.ok) return;
  //   fetchTodos();
  // }

  async function handleToggle(id) {
    const todo = todos.find((t) => t._id === id);
    if (!todo) return;

    try {
      await api.put(`/tasks/${id}`, {
        completed: !todo.completed,
      });
      fetchTodos();
    } catch (error) {
      console.error("Failed to toggle todo:", error);
      // Optionally notify the user
    }
  }
  const filteredTodos = todos.filter((todo) => {
    const cat = (todo.category || "general").toLowerCase();
    const matchesCategory =
      categoryFilter === "all" || cat === categoryFilter.toLowerCase();
    const hay = `${todo.title || ""} ${todo.description || ""}`.toLowerCase();
    const matchesSearch = hay.includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && !todo.completed) ||
      (statusFilter === "completed" && todo.completed);
    return matchesCategory && matchesSearch && matchesStatus;
  });

  return (
    <div className="todos-container">
      <AddTodoForm onAdd={handleAdd} />
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <CategoryFilter selected={categoryFilter} onSelect={setCategoryFilter} />

      <div className="status-filter">
        <button
          className={`btn ${statusFilter === "all" ? "active" : "secondary"}`}
          onClick={() => setStatusFilter("all")}
        >
          All
        </button>
        <button
          className={`btn ${
            statusFilter === "active" ? "active" : "secondary"
          }`}
          onClick={() => setStatusFilter("active")}
        >
          Active
        </button>
        <button
          className={`btn ${
            statusFilter === "completed" ? "active" : "secondary"
          }`}
          onClick={() => setStatusFilter("completed")}
        >
          Completed
        </button>
      </div>

      <div className="tasks-table-wrap">
        <table className="tasks-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Due</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.map((todo) => {
              const isCompleted = !!todo.completed;
              const hasDue = todo?.dueDate && !isNaN(Date.parse(todo.dueDate));
              const dueText = hasDue
                ? new Date(todo.dueDate).toLocaleDateString()
                : "—";
              const categoryText = todo.category || "general";

              return (
                <tr key={todo._id} className={isCompleted ? "completed" : ""}>
                  <td className="col-title">
                    <div className="title-cell">
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={() => handleToggle(todo._id)}
                        aria-label={
                          isCompleted
                            ? "Mark as not completed"
                            : "Mark as completed"
                        }
                      />
                      <div className="task-main">
                        <div className="task-title">{todo.title}</div>
                        {todo.description && (
                          <div className="task-desc">{todo.description}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="col-category">
                    <span className="badge">{categoryText}</span>
                  </td>
                  <td className="col-due">
                    {hasDue ? (
                      <span className="badge due">Due: {dueText}</span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="col-actions">
                    <div className="task-actions">
                      <button className="btn" onClick={() => handleEdit(todo)}>
                        Edit
                      </button>
                      <button
                        className="btn danger"
                        onClick={() => handleDelete(todo._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filteredTodos.length === 0 && (
              <tr>
                <td colSpan={4}>
                  <div className="empty">No todos yet.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
