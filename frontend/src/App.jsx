import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import TokenPage from "./pages/tokenPage/tokenPage";
import MarketplacePage from "./pages/MarketplacePage/MarketplacePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import TradingPage from "./pages/TradingPage/TradingPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import ListingPage from "./pages/ListingPage/ListingPage";
import RedeemPage from "./pages/RedeemPage/RedeemPage";
import RedeemHistoryPage from "./pages/RedeemPage/RedeemHistoryPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="home" element={<LandingPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/token" element={<TokenPage />} />
      <Route path="/about" element={<AboutPage />}/>
      <Route path="/trade/:tokenId" element={<TradingPage />} />
      <Route path="/list" element={<ListingPage />}/>
      <Route path="/redeem/:tokenId" element={<RedeemPage />} />
      <Route path="/redeemhistory" element={<RedeemHistoryPage />}/>
    </Routes>
  );
};

export default App;
