import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../assets/styles.css"; // Import global styles
import logo from "../assets/logo.png"; // Septorch Logo

const Navbar = ({ toggleTheme, currentTheme }) => {
  const { user, logout } = useContext(AuthContext);
  const [language, setLanguage] = useState("en");

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    // Future: Implement multi-language switching logic here
  };

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
            <li><button className="logout-btn" onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
      <div className="navbar-actions">
        <select className="language-select" value={language} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
        </select>
        <button className="theme-toggle" onClick={toggleTheme}>
          {currentTheme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
