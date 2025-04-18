import React, { useContext } from "react";
import { WalletContext } from "../../context/WalletContext";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar/TopBar"
import SideBar from "../../components/SideBar/SideBar"

export default function Marketplace() {
  const navigate = useNavigate()
  const handleMyHoldingsClick = () => navigate("/profile")
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
          {/* Your marketplace grid or card display */}
          <h1 className="text-2xl font-semibold mb-4">Marketplace</h1>
          {/* Add CardGrid component here */}
        </div>
      </div>
    </div>
  )
}