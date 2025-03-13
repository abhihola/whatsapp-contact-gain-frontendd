import React, { useState, useEffect, useContext } from "react";
import "./ReferralDashboard.css";
import { AuthContext } from "../context/AuthContext";

const ReferralDashboard = () => {
  const { user } = useContext(AuthContext); // Get logged-in user
  const [referralCount, setReferralCount] = useState(0);
  const [topReferrers, setTopReferrers] = useState([]);
  const [copied, setCopied] = useState(false);

  // Referral Link
  const referralLink = `${window.location.origin}/register?ref=${user?.id}`;

  // Fetch referral count & leaderboard from backend
  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const response = await fetch(`/api/referrals/${user?.id}`);
        const data = await response.json();
        setReferralCount(data.count || 0);
        setTopReferrers(data.leaderboard || []);
      } catch (error) {
        console.error("Error fetching referrals:", error);
      }
    };

    if (user) fetchReferrals();
  }, [user]);

  // Copy referral link
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="referral-dashboard">
      <h2>Referral Dashboard</h2>
      <p>Invite friends and earn rewards!</p>

      <div className="referral-link">
        <input type="text" value={referralLink} readOnly />
        <button onClick={handleCopy}>{copied ? "Copied!" : "Copy"}</button>
      </div>

      <div className="referral-stats">
        <h3>Your Referrals: {referralCount}</h3>
        {referralCount >= 10 && <p>✅ You have unlocked **Premium Access!** 🎉</p>}
      </div>

      <div className="leaderboard">
        <h3>🏆 Top Referrers</h3>
        <ul>
          {topReferrers.map((referrer, index) => (
            <li key={index}>
              {index + 1}. {referrer.name} - {referrer.count} referrals
            </li>
          ))}
        </ul>
      </div>

      <footer>
        <p>Powered by <strong>Septorch</strong></p>
      </footer>
    </div>
  );
};

export default ReferralDashboard;
