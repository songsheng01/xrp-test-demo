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

import bulbasaurImage from "../../assets/p1.png";

export default function TradingPage() {
  const { tokenId } = useParams()
  const config = {
    tokenId: tokenId,
    title: "2023 Japanese Pokémon 151 #2 Bulbasaur",
    grade: "0 / 10",
    imageUrl: bulbasaurImage,
    price: 10.89,
    usdPrice: 21.05,
    change24h: 3.6,
    marketCap: 1089000,
    supply: 100000,
    volume24h: 3500000
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 text-gray-900 px-4 pb-4 pt-1">
      {/* Top bar */}
      <div className="mb-2">
        <TopBar />
      </div>

      {/* Page Content */}
      <div className="flex flex-1 gap-4 min-h-0 h-full">
        {/* Sidebar */}
        <SideBar currentPage="trading" />
        {/* Main content area */}
        <div className="flex-1 flex flex-row h-full min-h-0 overflow-hidden p-6 bg-white rounded-2xl shadow-lg">
          {/* ← LEFT PANEL (40% width) */}
          <div className="w-2/5 flex flex-col p-2 h-full min-h-0">
            {/* Token header */}
            <TokenHeader
              title={config.title}
              grade={config.grade}
              tokenId={tokenId}
            />
            {/* Main image fills rest */}
            <div className="flex-1 min-h-0 flex pt-7">
              <TokenImage
                imageUrl={config.imageUrl}
                alt={`${config.title} art`}
              />
            </div>
          </div>
          <div className="mx-4 w-2 bg-gray-100 rounded-md" />
          {/* RIGHT COLUMN */}
          <div className="flex-1 flex flex-col space-y-4 overflow-y-auto">
            <TokenStats
              tokenId={tokenId}
              price={config.price}
              usdPrice={config.usdPrice}
              change24h={config.change24h}
              marketCap={config.marketCap}
              supply={config.supply}
              volume24h={config.volume24h}
            />

            <div className="flex gap-4 flex-[0_0_40%] min-h-0">
              <PriceChart tokenId={tokenId} className="flex-1 h-full min-h-0" />
              <OrderBook tokenId={tokenId} className="w-1/5 h-full" />
            </div>

            <OrderForm tokenId={tokenId} currentPrice={10.89} />
            
            <OrderHistory tokenId={tokenId} />
          </div>
        </div>
      </div>
    </div>
  )
}