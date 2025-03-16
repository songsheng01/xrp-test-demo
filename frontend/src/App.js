import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext";
import Home from "./pages/Home";
import Profile from "./pages/Profile"; // ✅ Import Profile page

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} /> {/* ✅ Add Profile route */}
    </Routes>
  );
};

export default App;
