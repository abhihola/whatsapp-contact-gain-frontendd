import React, { useState, useEffect, useContext } from "react";
import "./PremiumVCF.css";
import { AuthContext } from "../context/AuthContext";

const PremiumVCF = () => {
  const { user } = useContext(AuthContext);
  const [isPremium, setIsPremium] = useState(false);
  const [vcfContent, setVcfContent] = useState("");

  // Check if the user has premium access
  useEffect(() => {
    const fetchPremiumStatus = async () => {
      try {
        if (!user?.id) return;
        const response = await fetch(`/api/premium/${user.id}`);
        if (!response.ok) throw new Error("Failed to fetch premium status");
        const data = await response.json();
        setIsPremium(data.isPremium);
      } catch (error) {
        console.error("Error fetching premium status:", error);
      }
    };

    fetchPremiumStatus();
  }, [user?.id]);

  // Generate VCF content
  const generateVCF = () => {
    if (!user) return;
    const vcfData = `BEGIN:VCARD
VERSION:3.0
FN:${user.name}
TEL;TYPE=CELL:${user.phone}
EMAIL:${user.email}
END:VCARD`;
    setVcfContent(vcfData);
  };

  // Download VCF file
  const downloadVCF = () => {
    if (!vcfContent) return;
    const blob = new Blob([vcfContent], { type: "text/vcard" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${user.name}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="premium-vcf">
      <h2>Premium VCF Generator</h2>

      {!isPremium ? (
        <p className="not-premium">
          ❌ You do not have premium access. Invite 10 friends to unlock!
        </p>
      ) : (
        <>
          <p>✅ You have <strong>Premium Access!</strong> 🎉</p>
          <button onClick={generateVCF}>Generate VCF</button>
          {vcfContent && <button onClick={downloadVCF}>Download VCF</button>}
        </>
      )}

      <footer>
        <p>Powered by <strong>Septorch</strong></p>
      </footer>
    </div>
  );
};

export default PremiumVCF;
