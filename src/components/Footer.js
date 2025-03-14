import React from "react";
import "../assets/styles.css"; // Import global styles

const Footer = () => {
  return (
    <footer className="footer">
      <p>Powered by <strong>Septorch</strong></p>
      
      <div className="social-links">
        <a href="https://www.tiktok.com/@septorch" target="_blank" rel="noopener noreferrer" aria-label="Visit our TikTok">
          <img src="/icons/tiktok.svg" alt="TikTok" className="social-icon" /> TikTok
        </a>
        <a href="https://www.instagram.com/septorch29/" target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram">
          <img src="/icons/instagram.svg" alt="Instagram" className="social-icon" /> Instagram
        </a>
        {/* Future social links */}
        {/* <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">
          <img src="/icons/twitter.svg" alt="Twitter" className="social-icon" /> Twitter
        </a> */}
      </div>
      
      <p>&copy; {new Date().getFullYear()} WhatsApp Contact Gain. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
