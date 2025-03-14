import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://your-backend-url.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        login(data.token, data.user);
        navigate("/dashboard"); // Redirect to Dashboard
      } else {
        setError(data.message || "Invalid login credentials");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Social Login Handler
  const handleSocialLogin = (provider) => {
    window.location.href = `https://your-backend-url.com/auth/${provider}`;
  };

  return (
    <div className="login-container">
      <h2>Login to Your Account</h2>
      
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Forgot Password */}
      <p>
        <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
      </p>

      {/* Social Login Buttons */}
      <div className="social-login">
        <button onClick={() => handleSocialLogin("google")} className="google-btn">
          Login with Google
        </button>
        <button onClick={() => handleSocialLogin("facebook")} className="facebook-btn">
          Login with Facebook
        </button>
      </div>

      <p>
        Don't have an account? <Link to="/register">Sign up here</Link>
      </p>

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

export default Login;
