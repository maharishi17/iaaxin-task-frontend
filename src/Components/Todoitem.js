export default function TodoItem({ todo, onToggle, onDelete }) {
  const due = todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : null;

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={!!todo.completed}
        onChange={() => onToggle(todo._id, !!todo.completed)}
      />
      <div className="todo-main">
        <div className="todo-title" style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
          {todo.title}
        </div>
        {todo.description && <div className="todo-desc">{todo.description}</div>}
        <div className="todo-meta">
          {todo.category && <span className="badge">{todo.category}</span>}
          {due && <span className="badge">Due: {due}</span>}
        </div>
      </div>
      <button className="danger" onClick={() => onDelete(todo._id)}>Delete</button>
    </li>
  );
}
