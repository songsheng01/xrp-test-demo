// src/pages/TradingPage.jsx
import React,{ useState,useEffect } from "react"
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
import config from "../../config/config"
import axios from "axios";


export default function TradingPage() {
  const { tokenId } = useParams()
  const config_t = {
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

  // const comInfo = useState(null);
  const [asks,setAsk] = useState([]);
  const [bids,setBid] = useState([]);
  const fectchInfo = async () => {
    try {
      const responese = await axios.post(`${config.BACKEND_ENDPOINT}/api/offers`,{currency:"TESTHPS"}); // NEED TO CHANGE LATTER
      console.log(responese.data.currentOffer.buyOffers);
      setAsk(responese.data.currentOffer.sellOffers);
      setBid(responese.data.currentOffer.buyOffers);
    }catch(err){
      console.log(err);
      console.error('Error refreshing file list:', err);
    }
  }
  useEffect(()=>{
    fectchInfo();
  },[]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 text-gray-900 px-4 pb-2 pt-1">
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
              title={config_t.title}
              grade={config_t.grade}
              tokenId={tokenId}
            />
            {/* Main image fills rest */}
            <div className="flex-1 min-h-0 flex pt-7">
              <TokenImage
                imageUrl={config_t.imageUrl}
                alt={`${config_t.title} art`}
              />
            </div>
          </div>
          <div className="mx-4 w-2 bg-gray-100 rounded-md" />
          {/* RIGHT COLUMN */}
          <div className="flex-1 flex flex-col space-y-4 overflow-y-auto">
            <TokenStats
              tokenId={tokenId}
              price={config_t.price}
              usdPrice={config_t.usdPrice}
              change24h={config_t.change24h}
              marketCap={config_t.marketCap}
              supply={config_t.supply}
              volume24h={config_t.volume24h}
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