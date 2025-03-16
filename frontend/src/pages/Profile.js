import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WalletContext } from "../context/WalletContext";
import { isInstalled, signTransaction } from "@gemwallet/api"; // ✅ Import GemWallet API
import axios from "axios";
import "./Profile.css";
import xrpl from "xrpl";
import sampleImage1 from "../assets/h1.png";
import sampleImage2 from "../assets/h2.png";
import sampleImage3 from "../assets/h3.png";
// import TokenCard from "../components/TokenCard"; // Added import for TokenCard
import OwnTokenCard from "../components/OwnTokenCard";

const Profile = () => {
  const { walletAddress, xrpBalance } = useContext(WalletContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ State for modal visibility
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const shortenAddress = (address) => {
    if (!address) return "Please connect wallet";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleAccept = async () => {
    if (!walletAddress) {
      setMessage("Please connect your wallet first.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // STEP 1: Check if Trustline Exists (from backend)
      const trustCheckResponse = await axios.post("http://localhost:5001/api/check-trust", {
        userAddress: walletAddress,
        currencyHex: "3130000000000000000000000000000000000000",
      });

      if (!trustCheckResponse.data.hasTrustLine) {
        setMessage("Trustline missing. Please approve in GemWallet.");

        // Verify GemWallet installation
        const { result } = await isInstalled();
        if (!result.isInstalled) {
          setMessage("Please install the GemWallet extension.");
          setLoading(false);
          return;
        }

        // Prompt user to sign TrustSet transaction via GemWallet
        const txResponse = await signTransaction({
          transaction: trustCheckResponse.data.transaction,
        });

        if (txResponse.type === "reject") {
          setMessage("Trustline approval rejected by user.");
          setLoading(false);
          return;
        }

        setMessage("Trustline approved! Minting tokens...");
      }

      // Mint and send tokens (trustline is now confirmed)
      const createResponse = await axios.post("http://localhost:5001/api/create", {
        recipient: walletAddress,
        type: "TEST",
        pcs: 1000,
      });

      setMessage(createResponse.data.message || "Tokens successfully minted and sent!");
      
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.response?.data?.message || "An error occurred.");
    }

    setLoading(false);
  };

  return (
    <div className="home-container">
      {/* 🔹 Top Bar */}
      <div className="top-bar">
        <div className="welcome-message">Welcome, {shortenAddress(walletAddress)}</div>
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
            <button className="marketplace-button" onClick={() => navigate("/")}>Marketplace</button>
            <div className="wallet-address">{shortenAddress(walletAddress)}</div>
            {walletAddress && <div className="xrp-balance">XRP Balance: {xrpBalance} XRP</div>}
          </div>

          {/* 🔹 List & Claim Buttons */}
          <div className="action-buttons">
            <button className="list-card-button" onClick={() => setIsModalOpen(true)}>List Card</button> {/* ✅ Opens modal */}
            <button className="claim-card-button">Claim Card</button>
          </div>

          <h1 className="logo">XCard</h1>
        </div>

        {/* 🔹 Holdings Grid */}
        <div className="token-grid">
          <h2 className="holdings-title">My Holdings</h2>
          {/* Added 3 TokenCards using the sampleImage */}
          <OwnTokenCard token={{ name: "Holding 1", image: sampleImage1 }} />
          <OwnTokenCard token={{ name: "Holding 2", image: sampleImage2 }} />
          <OwnTokenCard token={{ name: "Holding 3", image: sampleImage3 }} />
        </div>
      </div>

      {/* 🔹 Modal for Listing Requests */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Listing Requests</h2>
            <table className="listing-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Collection</th>
                  <th>Description</th>
                  <th>Shares</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* ✅ Placeholder Data */}
                <tr>
                  <td>307528</td>
                  <td>Sports - NBA</td>
                  <td>Stephen Curry 2020</td>
                  <td>1000</td>
                  <td className="approved">Approved</td>
                  <td>
                    <button className="action-button" onClick={handleAccept} disabled={loading}>
                      {loading ? "Processing..." : "Accept"}
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>307529</td>
                  <td>Anime - Pokemon</td>
                  <td>Pikachu 2015</td>
                  <td>1000</td>
                  <td className="pending">Pending Authentication</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <button className="close-button" onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
