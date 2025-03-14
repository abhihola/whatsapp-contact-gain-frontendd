import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../assets/styles.css";
import logo from "../assets/logo.png";

const Navbar = ({ toggleTheme, currentTheme }) => {
  const { user, logout } = useContext(AuthContext);
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

  useEffect(() => {
    localStorage.setItem("language", language);
    // Future: Implement multi-language switching logic here
  }, [language]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Septorch Logo" />
        <h1>WhatsApp Contact Gain</h1>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        {user ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            {user.isAdmin && <li><Link to="/admin">Admin Panel</Link></li>}
            <li>
              <button className="logout-btn" onClick={logout} aria-label="Logout">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>

      <div className="navbar-actions">
        <select
          className="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          aria-label="Select language"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
        </select>
        
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {currentTheme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
