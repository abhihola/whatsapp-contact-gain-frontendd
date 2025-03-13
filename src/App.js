import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminPanel from "./pages/AdminPanel";
import ReferralDashboard from "./components/ReferralDashboard";
import PremiumVCF from "./components/PremiumVCF";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/referrals" element={<ReferralDashboard />} />
          <Route path="/premium-vcf" element={<PremiumVCF />} />
          <Route path="*" element={<NotFound />} /> {/* Handles 404 */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
