import React, { useState, useEffect, useContext } from "react";
import "./ReferralDashboard.css";
import { AuthContext } from "../context/AuthContext";

const ReferralDashboard = () => {
  const { user } = useContext(AuthContext);
  const [referralCount, setReferralCount] = useState(0);
  const [topReferrers, setTopReferrers] = useState([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Referral Link
  const referralLink = `${window.location.origin}/register?ref=${user?.id}`;

  // Fetch referral count & leaderboard
  useEffect(() => {
    if (!user?.id) return;

    const fetchReferrals = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/referrals/${user.id}`);
        if (!response.ok) throw new Error("Failed to fetch referrals");

        const data = await response.json();
        setReferralCount(data.count || 0);
        setTopReferrers(data.leaderboard || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, [user?.id]);

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
        <input type="text" value={referralLink} readOnly aria-label="Referral link" />
        <button onClick={handleCopy} aria-label="Copy referral link">
          {copied ? "✅ Copied!" : "📋 Copy"}
        </button>
      </div>

      {loading ? (
        <p>Loading referrals...</p>
      ) : error ? (
        <p className="error-message">⚠️ {error}</p>
      ) : (
        <>
          <div className="referral-stats">
            <h3>Your Referrals: {referralCount}</h3>
            {referralCount >= 10 && <p>🎉 ✅ You have unlocked <strong>Premium Access!</strong></p>}
          </div>

          <div className="leaderboard">
            <h3>🏆 Top Referrers</h3>
            {topReferrers.length > 0 ? (
              <ul>
                {topReferrers.map((referrer, index) => (
                  <li key={index}>
                    {index + 1}. {referrer.name} - {referrer.count} referrals
                  </li>
                ))}
              </ul>
            ) : (
              <p>No top referrers yet. Be the first!</p>
            )}
          </div>
        </>
      )}

      <footer>
        <p>Powered by <strong>Septorch</strong></p>
      </footer>
    </div>
  );
};

export default ReferralDashboard;
