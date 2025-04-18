// src/pages/TradingPage.jsx
import React from "react"
import { useParams } from "react-router-dom"
import TokenHeader from "../../components/Trading/TokenHeader"
import TokenImage from "../../components/Trading/TokenImage"
import TokenStats from "../../components/Trading/TokenStats"
import PriceChart from "../../components/Trading/PriceChart"
import OrderBook from "../../components/Trading/OrderBook"
import OrderForm from "../../components/Trading/OrderForm"
import OrderHistory from "../../components/Trading/OrderHistory"
import TopBar from "../../components/TopBar/TopBar"
import SideBar from "../../components/SideBar/SideBar"

export default function TradingPage() {
  const { tokenId } = useParams()
  const config = {
    tokenId: tokenId,
    title: "2023 Japanese Pokémon 151 #2 Bulbasaur",
    grade: "0 / 10",
    imageUrl: "../../assets/SV3pt5_EN_1.png",
    price: 0,
    usdPrice: 0,
    change24h: 0,
    marketCap: 0,
    supply: 0,
    volume24h: 0
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 text-gray-900 p-4">
      {/* Top bar */}
      <div className="mb-4">
        <TopBar />
      </div>

      {/* Page Content */}
      <div className="flex flex-1 gap-4 min-h-0 h-full">
        {/* Sidebar */}
        <SideBar currentPage="trading" />

        {/* Main content area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden p-6 bg-white rounded-2xl shadow-lg">
          <div className="flex-1 flex gap-6">
            {/* ← LEFT PANEL (40% width) */}
            <div className="w-2/5 flex flex-col p-6">
              {/* Token header */}
              <TokenHeader
                title={config.title}
                grade={config.grade}
                tokenId={tokenId}
              />
              {/* Main image fills rest */}
              <div className="mt-6 flex-1 overflow-hidden">
                <TokenImage
                  imageUrl={config.imageUrl}
                  alt={`${config.title} art`}
                />
              </div>
            </div>
            <div className="mx-4 w-1 bg-gray-300 opacity-50" />
            {/* RIGHT COLUMN */}
            {/* <div className="flex-1 flex flex-col space-y-6 overflow-y-auto">
              <TokenStats
                price={config.price}
                usdPrice={config.usdPrice}
                change24h={config.change24h}
                marketCap={config.marketCap}
                supply={config.supply}
                volume24h={config.volume24h}
              />

              <div className="flex gap-4">
                <PriceChart tokenId={tokenId} className="flex-1" />
                <OrderBook tokenId={tokenId} className="w-1/3" />
              </div>

              <OrderForm tokenId={tokenId} />

              <OrderHistory tokenId={tokenId} />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}