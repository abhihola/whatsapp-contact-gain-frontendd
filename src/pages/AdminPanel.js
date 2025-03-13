import React, { useState, useEffect } from "react";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [referralEnabled, setReferralEnabled] = useState(true);
  const [premiumEnabled, setPremiumEnabled] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await fetch("https://your-backend-url.com/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  // Toggle Referral System
  const toggleReferral = async () => {
    try {
      const response = await fetch("https://your-backend-url.com/api/admin/toggle-referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !referralEnabled }),
      });
      if (response.ok) {
        setReferralEnabled(!referralEnabled);
      }
    } catch (err) {
      console.error("Error toggling referral system", err);
    }
  };

  // Toggle Premium Access
  const togglePremium = async () => {
    try {
      const response = await fetch("https://your-backend-url.com/api/admin/toggle-premium", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !premiumEnabled }),
      });
      if (response.ok) {
        setPremiumEnabled(!premiumEnabled);
      }
    } catch (err) {
      console.error("Error toggling premium access", err);
    }
  };

  // Send Announcement to Users
  const sendAnnouncement = async () => {
    try {
      const response = await fetch("https://your-backend-url.com/api/admin/send-announcement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: announcement }),
      });
      if (response.ok) {
        setMessage("Announcement sent successfully!");
        setAnnouncement("");
      }
    } catch (err) {
      console.error("Error sending announcement", err);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      {/* Toggle Referral System */}
      <div className="toggle">
        <h3>Referral System</h3>
        <button onClick={toggleReferral}>
          {referralEnabled ? "Disable" : "Enable"}
        </button>
      </div>

      {/* Toggle Premium Access */}
      <div className="toggle">
        <h3>Premium Access</h3>
        <button onClick={togglePremium}>
          {premiumEnabled ? "Disable" : "Enable"}
        </button>
      </div>

      {/* User Management */}
      <div className="users">
        <h3>Manage Users</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Referrals</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.referrals}</td>
                <td>
                  <button className="remove">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Announcements */}
      <div className="announcement">
        <h3>Send Announcement</h3>
        <textarea
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
          placeholder="Write your message here..."
        ></textarea>
        <button onClick={sendAnnouncement}>Send</button>
        {message && <p className="success">{message}</p>}
      </div>

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

export default AdminPanel;
