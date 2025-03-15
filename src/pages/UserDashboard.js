import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./UserDashboard.css"; // Ensure this file exists

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No authentication token found.");
          return;
        }

        const response = await axios.get("https://your-backend-url.com/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data.user);
        setReferrals(response.data.referrals);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div className="dashboard-loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.name}!</h1>
      <p>Your referral link: <strong>{user?.referralLink}</strong></p>

      <h2>Your Referrals</h2>
      {referrals.length > 0 ? (
        <ul>
          {referrals.map((referral, index) => (
            <li key={index}>{referral.name} - {referral.email}</li>
          ))}
        </ul>
      ) : (
        <p>No referrals yet. Share your link to invite others!</p>
      )}

      <Link to="/premium-vcf" className="dashboard-button">Download Premium VCF</Link>
    </div>
  );
};

export default UserDashboard;
