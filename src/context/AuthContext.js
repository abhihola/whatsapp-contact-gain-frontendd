import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(); // ✅ Named Export

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/user`, {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error.response?.data || error.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []); // ✅ Runs once on mount

  // Login function
  const login = async (credentials) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, credentials, {
        withCredentials: true,
      });
      setUser(res.data);
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      return { success: false, message: error.response?.data?.message || "Login failed" };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; // ✅ Default Export
