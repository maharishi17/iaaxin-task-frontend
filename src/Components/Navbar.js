import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";
import { useAuth } from "../Context/AuthContext";

export default function Navbar() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { logout, token } = useAuth();
  return (
    <nav className="navbar">
      {/* Left: links */}
      <div className="nav-links">
        <Link to="/home" className="nav-link">
          Home
        </Link>
        <Link to="/todos" className="nav-link">
          Todos
        </Link>
        <Link to="/tasks" className="nav-link">
          Tasks
        </Link>
      </div>

      {/* Center: brand */}
      <div className="nav-brand">
        <Link to="/home" className="brand" aria-label="IAAXIN home">
          IAAXIN
        </Link>
      </div>

      {/* Right: dark/light toggle */}
      <div className="nav-right">
        <button className="dark-mode-toggle" onClick={()=>{
          console.log("env test : ",process.env.REACT_APP_BASE_URL)
          toggleTheme()}
          }>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        {token && (
          <button className="dark-mode-toggle" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
