import React, { useContext } from "react";
import { WalletContext } from "../../context/WalletContext";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook
import TokenCard from "../../components/TokenCard/TokenCard";
import sampleImage from "../../assets/SV3pt5_EN_1.png";
import sampleImage2 from "../../assets/NBA.png";
import sampleImage3 from "../../assets/SV3pt5_EN_2.png";
import sampleImage4 from "../../assets/SV3pt5_EN_3.png";
import sampleImage5 from "../../assets/p1.png";
import sampleImage6 from "../../assets/p2.png";
import sampleImage7 from "../../assets/p3.png";
import sampleImage8 from "../../assets/p4.png";
import sampleImage9 from "../../assets/p5.png";
import sampleImage10 from "../../assets/p6.png";

import "../HomePage/Home.css";

const Home = () => {
  const { walletAddress, xrpBalance, connectWallet } = useContext(WalletContext);

  // Function to shorten wallet address (e.g., "rXy...abc")
  const shortenAddress = (address) => {
    if (!address) return "Please connect wallet";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleProfileClick = () => {
    if (walletAddress) {
      navigate("/profile"); // ✅ Redirect if logged in
    } else {
      connectWallet(); // ✅ Prompt wallet connection
    }
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
            <button className="profile-button" onClick={handleProfileClick}>My Profile</button>
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
          <TokenCard token={{ name: "Pokemon 1", price: 154.00, change: -3.21, image: sampleImage }} />
          <TokenCard token={{ name: "Victor Wembanyama", price: 146431.00, change: 10.6, image: sampleImage2 }} />
          <TokenCard token={{ name: "Pokemon 2", price: 14.5, change: -8.73, image: sampleImage3 }} />
          <TokenCard token={{ name: "Token D", price: 15.5, change: 1.16, image: sampleImage4 }} />
          <TokenCard token={{ name: "Token E", price: 16.5, change: 2.92, image: sampleImage5 }} />
          <TokenCard token={{ name: "Token F", price: 17.5, change: 3.64, image: sampleImage6 }} />
          <TokenCard token={{ name: "Token G", price: 18.5, change: 0.67, image: sampleImage7 }} />
          <TokenCard token={{ name: "Token H", price: 19.5, change: 9.45, image: sampleImage8 }} />
          <TokenCard token={{ name: "Token I", price: 20.5, change: 4.12, image: sampleImage9 }} />
          <TokenCard token={{ name: "Token J", price: 21.5, change: 1.35, image: sampleImage10 }} />
        </div>
      </div>
    </div>
  );
};

export default Home;
