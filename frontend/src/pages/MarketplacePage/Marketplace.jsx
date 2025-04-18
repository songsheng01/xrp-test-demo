import React, { useContext } from "react";
import { WalletContext } from "../../context/WalletContext";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar/TopBar"
import SideBar from "../../components/SideBar/SideBar"
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

export default function Marketplace() {
  const navigate = useNavigate()
  const handleMyHoldingsClick = () => navigate("/marketplace")
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 text-gray-900 p-4">
      <div className="mb-4">
        <TopBar />
      </div>
      {/* Page Content */}
      <div className="flex flex-1 gap-4 min-h-0">
        <SideBar onMyHoldingsClick={handleMyHoldingsClick} currentPage="marketplace" />

        {/* Main content (e.g. grid of cards) */}
        <div className="flex-1 p-6">
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
    </div>
  )
}