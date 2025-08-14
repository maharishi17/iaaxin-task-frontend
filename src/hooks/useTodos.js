import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../utils/api";

const LS_KEY = "todos-cache-v1";

export default function useTodos() {
  const [todos, setTodos] = useState(() => {
    try {
      const cached = localStorage.getItem(LS_KEY);
      return cached ? JSON.parse(cached) : [];
    } catch { return []; }
  });
  const [loading, setLoading] = useState(true);

  // load from backend on mount
  useEffect(() => {
    let alive = true;
    api.get("/tasks")
      .then(({ data }) => { if (alive) setTodos(data); })
      .catch(() => {}) // if unauthorized, page will redirect (App guard)
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  // cache to localStorage
  useEffect(() => { localStorage.setItem(LS_KEY, JSON.stringify(todos)); }, [todos]);

  const addTodo = useCallback(async ({ title, description, category, dueDate }) => {
    const { data } = await api.post("/tasks", { title, description, category, dueDate });
    setTodos((t) => [data, ...t]);
  }, []);

  const toggleComplete = useCallback(async (id, completed) => {
    const { data } = await api.put(`/tasks/${id}`, { completed: !completed });
    setTodos((t) => t.map(x => x._id === id ? data : x));
  }, []);

  const removeTodo = useCallback(async (id) => {
    await api.delete(`/tasks/${id}`);
    setTodos((t) => t.filter(x => x._id !== id));
  }, []);

  const updateTodo = useCallback(async (id, patch) => {
    const { data } = await api.put(`/tasks/${id}`, patch);
    setTodos((t) => t.map(x => x._id === id ? data : x));
  }, []);

  // helpers
  const counts = useMemo(() => ({
    all: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length
  }), [todos]);

  return { todos, loading, addTodo, toggleComplete, removeTodo, updateTodo, counts };
}
