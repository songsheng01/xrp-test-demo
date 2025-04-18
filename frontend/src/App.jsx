import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext.jsx";
import Home from "./pages/HomePage/Home.js";
import Profile from "./pages/ProfilePage/Profile.js";
import TokenPage from "./pages/tokenPage/tokenPage.jsx";
import OwnTokenCardPage from "./pages/OwenTokenCardPage/OwnTokenCardPage.js";
import MarketplacePage from "./pages/MarketplacePage/MarketplacePage.jsx";
import TradingPage from "./pages/TradingPage/TradingPage.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MarketplacePage />} /> {/* temporary: home page is marketplace */}
      <Route path="/marketplace" element={<MarketplacePage />} /> {/* marketplace page */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/token" element={<TokenPage />} />
      <Route path="/ownTokenCardPage" element={<OwnTokenCardPage />} />
      <Route path="/trade/:tokenId" element={<TradingPage />} /> {/* trading page for each token */}
    </Routes>
  );
};

export default App;
