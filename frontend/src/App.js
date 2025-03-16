import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext";
import Home from "./pages/Home";
import Profile from "./pages/Profile"; // ✅ Import Profile page
import TokenPage from "./pages/tokenPage/tokenPage.jsx";
import OwnTokenCardPage from "./pages/tokenPage/OwnTokenCardPage.js";

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
