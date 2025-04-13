import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext";
import Home from "./pages/HomePage/Home.js";
import Profile from "./pages/ProfilePage/Profile.js";
import TokenPage from "./pages/tokenPage/tokenPage.jsx";
import OwnTokenCardPage from "./pages/OwenTokenCardPage/OwnTokenCardPage.js";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} /> {/* ✅ Add Profile route */}
      <Route path="/token" element={<TokenPage />} />
      <Route path="/ownTokenCardPage" element={<OwnTokenCardPage />} />
    </Routes>
  );
};

export default App;
