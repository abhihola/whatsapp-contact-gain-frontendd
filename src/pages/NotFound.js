
import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css"; // Ensure you create this CSS file

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="home-btn">Go Back Home</Link>
    </div>
  );
};

export default NotFound;
