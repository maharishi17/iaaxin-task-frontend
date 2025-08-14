import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <div className="home-hero">
        <h2>Welcome to the Task Management System</h2>
        <p className="muted">Use the navigation bar or the button below to manage your todos.</p>

        <div className="home-actions">
          <Link to="/todos" className="btn primary">Go to Todos</Link>
          <Link to="/tasks" className="btn">Tasks (alt view)</Link>
        </div>
      </div>
    </div>
  );
}
