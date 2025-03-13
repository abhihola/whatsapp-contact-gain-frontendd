import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import logo from "../../public/logo.png"; // Septorch logo

const Home = () => {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <img src={logo} alt="Septorch Logo" className="logo" />
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/register" className="signup-btn">Sign Up</Link>
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
          <a href="https://www.tiktok.com/@septorch" target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href="https://www.instagram.com/septorch29/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
