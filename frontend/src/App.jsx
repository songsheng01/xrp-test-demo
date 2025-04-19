import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext";
import Home from "./pages/HomePage/HomePage";
import Profile from "./pages/ProfilePage/Profile";
import TokenPage from "./pages/tokenPage/tokenPage";
import OwnTokenCardPage from "./pages/OwenTokenCardPage/OwnTokenCardPage";
import MarketplacePage from "./pages/MarketplacePage/MarketplacePage";
import AboutPage from "./pages/AboutPage/About";
import TradingPage from "./pages/TradingPage/TradingPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MarketplacePage />} />
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/token" element={<TokenPage />} />
      <Route path="/ownTokenCardPage" element={<OwnTokenCardPage />} />
      <Route path="/about" element={<AboutPage />}/>
      <Route path="/trade/:tokenId" element={<TradingPage />} />
    </Routes>
  );
};

export default App;
