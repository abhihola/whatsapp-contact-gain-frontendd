import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./UserDashboard.css";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [referrals, setReferrals] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const referralLink = `${window.location.origin}/register?ref=${user?.id}`;

  useEffect(() => {
    if (!user?.id) return;

    const fetchReferrals = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/referrals/${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch referrals");
        
        const data = await res.json();
        setReferrals(data.referralCount || 0);
        setIsPremium(data.isPremium || false);
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
    <div className="dashboard">
      <h2>Welcome, {user?.name}! </h2>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : error ? (
        <p className="error-message"> {error}</p>
      ) : (
        <>
          <div className="dashboard-section">
            <h3>Your Referral Link</h3>
            <input type="text" value={referralLink} readOnly aria-label="Referral link" />
            <button onClick={handleCopy} aria-label="Copy referral link">
              {copied ? " Copied!" : " Copy Link"}
            </button>
          </div>

          <div className="dashboard-section">
            <h3>Referrals</h3>
            <p> You have referred <strong>{referrals}</strong> people.</p>
            {referrals >= 10 ? (
              <p className="premium-status"> Congrats! You have premium access!</p>
            ) : (
              <p className="non-premium">
                Invite <strong>{10 - referrals}</strong> more to unlock premium.
              </p>
            )}
          </div>

          {isPremium && (
            <div className="dashboard-section">
              <h3>Premium VCF Access</h3>
              <p> You can generate and download your own VCF file.</p>
              <a href="/premium-vcf" className="vcf-btn">Generate VCF</a>
            </div>
          )}
        </>
      )}

      <footer>
        <p>Powered by <strong>Septorch</strong></p>
      </footer>
    </div>
  );
};

export default UserDashboard;
