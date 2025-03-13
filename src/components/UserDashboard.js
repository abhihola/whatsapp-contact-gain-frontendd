import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./UserDashboard.css";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [referrals, setReferrals] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const referralLink = `${window.location.origin}/register?ref=${user?.id}`;

  useEffect(() => {
    if (user) {
      fetch(`/api/referrals/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setReferrals(data.referralCount);
          setIsPremium(data.isPremium);
        })
        .catch((error) => console.error("Error fetching referrals:", error));
    }
  }, [user]);

  return (
    <div className="dashboard">
      <h2>Welcome, {user?.name}! 👋</h2>

      <div className="dashboard-section">
        <h3>Your Referral Link</h3>
        <input type="text" value={referralLink} readOnly />
        <button
          onClick={() => {
            navigator.clipboard.writeText(referralLink);
            alert("Referral link copied!");
          }}
        >
          Copy Link
        </button>
      </div>

      <div className="dashboard-section">
        <h3>Referrals</h3>
        <p>👥 You have referred <strong>{referrals}</strong> people.</p>
        {referrals >= 10 ? (
          <p className="premium-status">🎉 Congrats! You have premium access!</p>
        ) : (
          <p className="non-premium">Invite {10 - referrals} more to unlock premium.</p>
        )}
      </div>

      {isPremium && (
        <div className="dashboard-section">
          <h3>Premium VCF Access</h3>
          <p>🔓 You can generate and download your own VCF file.</p>
          <a href="/premium-vcf" className="vcf-btn">Generate VCF</a>
        </div>
      )}

      <footer>
        <p>Powered by <strong>Septorch</strong></p>
      </footer>
    </div>
  );
};

export default UserDashboard;
