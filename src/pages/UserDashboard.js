import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import "./UserDashboard.css"; // Ensure this file exists for styling

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [referrals, setReferrals] = useState(0);
  const [premiumAccess, setPremiumAccess] = useState(false);
  const [vcfDownloadLink, setVcfDownloadLink] = useState("");

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/dashboard`,
        { withCredentials: true }
      );
      setReferrals(response.data.referrals);
      setPremiumAccess(response.data.premiumAccess);
      setVcfDownloadLink(response.data.vcfDownloadLink);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user?.name}!</h2>
      <p>Your referral link:</p>
      <div className="referral-link">
        <input
          type="text"
          value={`${window.location.origin}/register?ref=${user?.referralCode}`}
          readOnly
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(
              `${window.location.origin}/register?ref=${user?.referralCode}`
            );
            alert("Referral link copied!");
          }}
        >
          Copy
        </button>
      </div>

      <div className="stats">
        <p>Referrals: <strong>{referrals}</strong></p>
        <p>Premium Access: <strong>{premiumAccess ? "Active" : "Inactive"}</strong></p>
      </div>

      {premiumAccess && vcfDownloadLink && (
        <div className="vcf-section">
          <p>Download your premium VCF file:</p>
          <a href={vcfDownloadLink} download>
            <button>Download VCF</button>
          </a>
        </div>
      )}

      <div className="nav-links">
        <Link to="/premium-vcf">Generate VCF</Link>
        <Link to="/referrals">Referral Dashboard</Link>
      </div>

      <footer className="dashboard-footer">
        <p>Powered by <strong>Septorch</strong></p>
        <div className="social-links">
          <a href="https://www.tiktok.com/@septorch" target="_blank" rel="noopener noreferrer">
            TikTok
          </a>
          <a href="https://www.instagram.com/septorch29/" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;
