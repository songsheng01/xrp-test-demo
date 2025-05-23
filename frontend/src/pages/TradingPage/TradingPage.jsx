// src/pages/TradingPage.jsx
import React, { useState, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import useOrderFeed from "../../hooks/useOrderFeed";
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
  const [asks, setAsk] = useState([]);
  const [bids, setBid] = useState([]);
  const [cardInfo, setCardInfo] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [xrpUsd, setXrpUsd] = useState(0)

  const events = useOrderFeed();

  const fectchInfo = async () => {
    try {
      const response = await axios.post(`${config.BACKEND_ENDPOINT}/api/offers`, { currency: "TESTHPS" }); // NEED TO CHANGE LATTER
      const response2 = await axios.post(`${config.BACKEND_ENDPOINT}/api/search`, { token: "5445535448505300000000000000000000000000" }); // NEED TO CHANGE LATTER
      setAsk(response.data.currentOffer.sellOffers.map(o => [
        Number(o.quality) / 1_000_000,          // price per token
        Number(o.TakerGets.value)         // quantity
      ]));
      setBid(response.data.currentOffer.buyOffers.map(o => [
        1 / (Number(o.quality) * 1_000_000),          // price per token
        Number(o.TakerPays.value)         // quantity
      ]));
      setOrderHistory(response.data.orderHistory);
      setCardInfo(response2.data);
      console.log(response.data.currentOffer.buyOffers)
    } catch (err) {
      console.log(err);
      console.error('Error refreshing file list:', err);
    }
  }
  useEffect(() => {
    fectchInfo();
  }, []);

  useEffect(() => {
    const fetchXrpUsd = async () => {
      try {
        // CoinGecko public API
        const resp = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price",
          { params: { ids: "ripple", vs_currencies: "usd" } }
        )
        setXrpUsd(resp.data.ripple.usd)
      } catch (err) {
        console.error("Failed to fetch XRP→USD price:", err)
      }
    }
    fetchXrpUsd()
    const iv = setInterval(fetchXrpUsd, 60_000)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    if (!events.length) return;
    const e = events[events.length - 1];     // handle newest only

    console.log("[HANDLE]", e.type, e.payload);

    switch (e.type) {
      /** full depth snapshot */
      case "DEPTH_UPDATE": {
        if (e.payload.currency !== "TESTHPS") return;   // TODO replace hard‑code

        setAsk(
          e.payload.sellOffers.map(o => [
            Number(o.quality) / 1_000_000,
            Number(o.TakerGets.value),
          ]),
        );
        setBid(
          e.payload.buyOffers.map(o => [
            1 / (Number(o.quality) * 1_000_000),
            Number(o.TakerPays.value),
          ]),
        );
        break;
      }

      /** executed trade → order history */
      case "ORDER_FILLED": {
        const { fill, time } = e.payload;
        if (fill.currency !== "TESTHPS") return;

        /* update history */
        setOrderHistory(h => [
          ...h,
          {
            token: fill.currency,
            side: "Buy",         // or derive from buyer/seller
            amount: fill.tokenAmount,
            value: fill.xrpAmount,
            status: "Filled",
            time
          }
        ]);

        /* update headline price */
        setCardInfo(ci =>
          ci ? { ...ci, price_rate: fill.unitPrice } : ci
        );
        break;
      }

      default:
        break;
    }
  }, [events]);

  const volume24h = useMemo(() => {
    if (!orderHistory?.length) return 0
    const nowTs = Date.now()
    const cutoff = nowTs - 24 * 60 * 60 * 1000
    return orderHistory
      .filter((o) => {
        const t = new Date(o.time).getTime()
        return t > cutoff && t <= nowTs
      })
      .reduce((sum, o) => sum + (o.quantity || 0), 0)
  }, [orderHistory]);

  const usdPrice = (cardInfo?.price_rate ?? 0) * xrpUsd

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 text-neutral-800">
      {/* Top bar */}
      <div className="mb-2">
        <TopBar />
      </div>

      {/* Page Content */}
      <div className="flex flex-1 gap-2 min-h-0 h-full">
        {/* Sidebar */}
        <SideBar currentPage="trading" />
        {/* Main content area */}
        <div className="flex-1 flex flex-row h-full min-h-0 overflow-hidden p-6 bg-white rounded-2xl shadow-lg">
          {/* ← LEFT PANEL (40% width) */}
          <div className="w-2/5 flex flex-col p-2 h-full min-h-0">
            {/* Token header */}
            <TokenHeader
              title={cardInfo?.type ?? '—'}
              grade={config_t.grade}
              tokenId={tokenId}
            />
            {/* Main image fills rest */}
            <div className="flex-1 min-h-0 flex pt-7">
              <TokenImage
                imageUrl={config_t.imageUrl}
                alt={`${cardInfo?.type ?? '—'} art`}
              />
            </div>
          </div>
          <div className="mx-4 w-2 bg-gray-100 rounded-md" />
          {/* RIGHT COLUMN */}
          <div className="flex-1 flex flex-col space-y-4 overflow-y-auto">
            <TokenStats
              tokenId={tokenId}
              price={cardInfo?.price_rate ?? 0}
              usdPrice={usdPrice}
              change24h={cardInfo?.price_pct ?? 0}
              marketCap={
                cardInfo
                  ? cardInfo.pcs_list.length * 1000 * cardInfo.price_rate
                  : 0
              }
              supply={cardInfo
                ? cardInfo.pcs_list.length * 1000
                : 0}
              volume24h={volume24h}
            />

            <div className="flex gap-4 flex-[0_0_40%] min-h-0">
              <PriceChart tokenId={tokenId} trades={orderHistory} className="flex-1 h-full min-h-0" />
              <OrderBook tokenId={tokenId} bids={bids} asks={asks} className="w-1/5 h-full" />
            </div>

            <OrderForm tokenId={tokenId} currentPrice={10.89} />

            <OrderHistory tokenId={tokenId} orders={orderHistory} />
          </div>
        </div>
      </div>
    </div>
  )
}