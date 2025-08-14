import React, { useState, useEffect } from "react";

export default function TaskForm({ initial = null, onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setDescription(initial.description || "");
      setCategory(initial.category || "general");
      setDueDate(initial.dueDate ? initial.dueDate.split("T")[0] : "");
    }
  }, [initial]);

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Title required");

    const task = {
      id: initial?.id || Date.now().toString(),
      title: title.trim(),
      description: description.trim() || null,
      category,
      dueDate: dueDate || null,
      completed: initial?.completed ?? false
    };

    onAdd && onAdd(task);

    if (!initial) {
      setTitle("");
      setDescription("");
      setCategory("general");
      setDueDate("");
    }
  }

  return (
    <form className="form-card" onSubmit={submit} style={{ marginBottom: "20px" }}>
      <div className="form-row column">
        <label>Task title</label>
        <input
          className="search-box"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter task title"
        />
      </div>

      <div className="form-row" style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 1 }}>
          <label>Category</label>
          <select
            className="search-box"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="general">General</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
          </select>
        </div>
        <div style={{ width: 180 }}>
          <label>Due</label>
          <input
            className="search-box"
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <div className="form-row column">
        <label>Description</label>
        <textarea
          className="search-box"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Task details..."
        />
      </div>

      <div className="form-actions" style={{ marginTop: "10px" }}>
        <button className="btn" type="submit">
          {initial ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}
