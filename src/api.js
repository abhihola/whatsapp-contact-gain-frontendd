const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchUserData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/user`, { credentials: "include" });
    return response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    return response.json();
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};

export const logoutUser = async () => {
  try {
    await fetch(`${API_BASE_URL}/auth/logout`, { method: "POST", credentials: "include" });
  } catch (error) {
    console.error("Logout error:", error);
  }
};
