import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTiktok, FaInstagram, FaBars, FaTimes } from "react-icons/fa"; // Social media & menu icons
import "./Home.css";
import logo from "../assets/logo.png"; // Septorch logo

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <img src={logo} alt="Septorch Logo" className="logo" />
        
        {/* Mobile Menu Toggle */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          <Link to="/register" className="signup-btn" onClick={() => setMenuOpen(false)}>Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <h1>Grow Your WhatsApp Contacts Effortlessly 🚀</h1>
        <p>Get more connections, share your contact, and earn premium benefits.</p>
        <Link to="/register" className="cta-btn">Get Started</Link>
      </header>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <h2>📢 Referral System</h2>
          <p>Invite friends and earn premium access after 10 referrals.</p>
        </div>
        <div className="feature-card">
          <h2>🌍 Country Selection</h2>
          <p>Supports all countries with an advanced country selector.</p>
        </div>
        <div className="feature-card">
          <h2>📂 Get VCF Files</h2>
          <p>Receive updated WhatsApp contact files daily via email.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Powered by <strong>Septorch</strong></p>
        <div className="social-links">
          <a href="https://www.tiktok.com/@septorch" target="_blank" rel="noopener noreferrer">
            <FaTiktok size={24} />
          </a>
          <a href="https://www.instagram.com/septorch29/" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
