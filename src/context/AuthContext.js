import React, { createContext, useState, useEffect } from "react";

// Create authentication context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // 🔑 Check if user is logged in
  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  // 📌 Fetch user profile from backend
  const fetchUserProfile = async () => {
    try {
      const response = await fetch("https://your-backend.com/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
      } else {
        logout(); // If token is invalid, log out user
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      logout();
    }
  };

  // 🔓 Login function
  const login = async (email, password) => {
    try {
      const response = await fetch("https://your-backend.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        fetchUserProfile();
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  };

  // 🔒 Logout function
  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
