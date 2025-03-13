import React from "react";
import "../assets/styles.css"; // Import global styles

const Footer = () => {
  return (
    <footer className="footer">
      <p>Powered by <strong>Septorch</strong></p>
      <div className="social-links">
        <a href="https://www.tiktok.com/@septorch" target="_blank" rel="noopener noreferrer">
          TikTok
        </a>
        <a href="https://www.instagram.com/septorch29/" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} WhatsApp Contact Gain. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
