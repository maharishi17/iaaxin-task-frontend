import React from "react";

export default function TaskList({ todos = [], onToggle, onDelete, onEdit }) {
  if (!todos.length) return <div className="empty">No tasks yet.</div>;

  return (
    <div className="task-list form-card">
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Due</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(t => (
            <tr key={t._id}>
              <td>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input
                    type="checkbox"
                    checked={!!t.completed}
                    onChange={() => onToggle && onToggle(t._id)}
                  />
                  <div>{t.title}</div>
                </div>
              </td>
              <td>{t.category || "-"}</td>
              <td>
                {t.dueDate
                  ? new Date(t.dueDate).toLocaleDateString()
                  : "-"}
              </td>
              <td className="action-buttons">
                <button
                  className="btn"
                  onClick={() => onEdit && onEdit(t)}
                >
                  Edit
                </button>
                <button
                  className="btn danger ml-20"
                  onClick={() => onDelete && onDelete(t._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
