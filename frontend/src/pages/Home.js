import React, { useContext } from "react";
import { WalletContext } from "../context/WalletContext";
import TokenCard from "../components/TokenCard";
import "./Home.css";

const Home = () => {
  const { walletAddress, xrpBalance, connectWallet } = useContext(WalletContext);

  // Function to shorten wallet address (e.g., "rXy...abc")
  const shortenAddress = (address) => {
    if (!address) return "Please connect wallet";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="home-container">
      {/* 🔹 Top Bar */}
      <div className="top-bar">
        {walletAddress ? (
          <div className="welcome-message">Welcome, {shortenAddress(walletAddress)}</div>
        ) : (
          <button className="connect-wallet" onClick={connectWallet}>Connect Wallet</button>
        )}
        <div className="leaderboard">
          <span className="leaderboard-item">BTC +4.5%</span>
          <span className="leaderboard-item">ETH -1.2%</span>
          <span className="leaderboard-item">XRP +3.0%</span>
        </div>
      </div>

      <div className="content-container">
        {/* 🔹 Sidebar */}
        <div className="sidebar">
          <div className="profile-section">
            <button className="profile-button">My Profile</button>
            <div className="wallet-address">{shortenAddress(walletAddress)}</div>
            {/* Display XRP Balance if logged in */}
            {walletAddress && (
              <div className="xrp-balance">XRP Balance: {xrpBalance} XRP</div>
            )}
          </div>
          <input type="text" placeholder="Search tokens..." className="search-bar" />
          <h1 className="logo">XCard</h1>
        </div>

        {/* 🔹 Token Grid */}
        <div className="token-grid">
          <TokenCard token={{ name: "Token A", price: 12.5, change: 3.2, image: "https://randomuser.me/api/portraits/men/1.jpg" }} />
        </div>
      </div>
    </div>
  );
};

export default Home;
