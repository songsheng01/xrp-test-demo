import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext";
import Home from "./pages/HomePage/Home.js";
import Profile from "./pages/ProfilePage/Profile.js";
import TokenPage from "./pages/tokenPage/tokenPage.jsx";
import OwnTokenCardPage from "./pages/OwenTokenCardPage/OwnTokenCardPage.js";
import Marketplace from "./pages/MarketplacePage/Marketplace.jsx";
import AboutPage from "./pages/AboutPage/About.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Marketplace />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="home" element={<Home />} />
      <Route path="/profile" element={<Profile />} /> {/* ✅ Add Profile route */}
      <Route path="/token" element={<TokenPage />} />
      <Route path="/ownTokenCardPage" element={<OwnTokenCardPage />} />
      <Route
            path="/about"
            element={
              <AboutPage />
            }
          />
    </Routes>
  );
};

export default App;
