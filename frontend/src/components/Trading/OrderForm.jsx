import React, { useState, useContext, useEffect } from "react"
import axios from "axios"
import { WalletContext } from '../../context/WalletContext';
import config from "../../config/config";

const ORDER_TYPES = ["Market", "Limit", "Stop", "Trailing Stop"]

export default function OrderForm({ tokenId, currentPrice }) {
  // form state
  const [side, setSide] = useState("Buy")
  const [type, setType] = useState("Market")
  const [limitPrice, setLimit] = useState(currentPrice)
  const [amountTok, setAmountTok] = useState("")
  const { walletAddress, connectWallet, signAndSubmit, ensureTrustLine } = useContext(WalletContext);

  /* derived helper */
  const isMarket = type === "Market"

  const handleSubmit = async (e) => {
    e.preventDefault()
    // TODO: connect to backend / wallet
    console.log({ side, type, limitPrice, amountTok })

    let userAddress = walletAddress;
    if (!userAddress) {
      alert("Wallet not connected");
      return;
    }

    try {
      /* ── Limit and Market both use the same backend route ── */
      const buy_or_sell = side === 'Buy' ? "buy" : "sell";

      /* 1) determine price for Market vs Limit */
      let price = limitPrice
      if (type === "Market") {
        price = side === "Buy" ? 1000 : 0.0001        // BUY @ 1000, SELL @ 0 (arbitrarily extreme limits)
      }

      if (type === 'Limit' || type === 'Market') {

        console.log(userAddress);

        let response = await axios.post(`${config.BACKEND_ENDPOINT}/api/${buy_or_sell}`, {
          userAddress,
          currency: "TESTHPS",
          tokenAmount: amountTok,
          xrpAmount: price * amountTok
        });
        if (response.data.response.needsTrust === true) {
          const { trustTransaction } = response.data.response;
          const trustRes = await ensureTrustLine({ trustTransaction });
          console.log(trustRes);
          if (trustRes.success !== true) {
            console.log(trustRes);
            throw new Error(`TrustSet Failed：${trustRes.error}`);
          } else {
            response = await axios.post(`${config.BACKEND_ENDPOINT}/api/${buy_or_sell}`, {
              userAddress,
              currency: "TESTHPS",
              tokenAmount: amountTok,
              xrpAmount: price * amountTok,
            });
          }
        }
        const offerTransaction = response.data.response.offerTransaction;
        const res = await signAndSubmit(offerTransaction);
        if (res.success) {
          console.log('TxHash:', res.txHash);
          response = await axios.post(`${config.BACKEND_ENDPOINT}/api/transaction`, {
            TxHash: res.txHash
          });
          console.log(response);
        } else {
          console.log(res.error);
        }
      }
    } catch (error) {
      console.error('Error submitting offer:', error);
      alert('There was an error submitting your offer.');
    }
  }

  useEffect(() => {
    connectWallet();
  }, []);
  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl p-5 bg-gray-50 border-gray-100 space-y-4"
    >

      {/* 4‑column grid */}
      <div className="grid grid-cols-4 gap-6 items-start">
        {/* ── 1) Side + submit ───────────────────────── */}
        <div className="flex flex-col gap-4">
          {/* side selector */}
          {["Buy", "Sell"].map(s => {
            const base = s === "Buy" ? "text-gray-500 hover:text-[#00a300]" : "text-gray-500 hover:text-red-500"
            const active = s === "Buy" ? "text-[#00a300]" : "text-red-500"
            return (
              <button
                key={s}
                type="button"
                onClick={() => setSide(s)}
                className={`text-lg w-24 py-0 font-bold transition
            ${side === s ? active : base} hover:brightness-110`}
              >
                {s}
              </button>
            )
          })}

          {/* submit button */}
          <button
            type="submit"
            className={`w-24 px-4 py-2 rounded-md font-semibold mt-auto ml-2
        ${side === "Buy"
                ? "bg-[#00a300] text-white hover:brightness-110"
                : "bg-red-500 text-white hover:brightness-110"}`}
          >
            Place
          </button>
        </div>

        {/* ── 2) Order Type list ─────────────────────── */}
        <div className="flex flex-col space-y-1">
          {ORDER_TYPES.map(o => (
            <button
              key={o}
              type="button"
              onClick={() => setType(o)}
              className={`text- py-0.5 text-left transition hover:text-[#ff7700]
          ${o === type ? "font-bold text-[#ff7700]" : "text-gray-500"}`}
            >
              {o}
            </button>
          ))}
        </div>

        {/* ── 3) Price box / input ───────────────────── */}
        <div className="flex flex-col gap-2">
          {isMarket ? (
            <>
              <span className="text-md">Market Price:</span>
              <span className="w-32 rounded-md border-y-2 border-transparent py-1 text-[#ff7700] font-medium focus:outline-none focus:border-[#ff7700]">
                {side === "Sell" ? "≤" : "≥"}{currentPrice.toFixed(4)} XRP
              </span>
            </>
          ) : (
            <>
              <label className="text-md">
                {type === "Limit" ? "Limit Price" : "Stop Price"}
              </label>
              <input
                type="number"
                step="0.0001"
                value={limitPrice}
                onChange={e => setLimit(e.target.value)}
                className="w-32 rounded-md border-2 px-2 py-1 text-[#ff7700] font-medium focus:outline-none focus:border-[#ff7700]"
              />
            </>
          )}
          <span className="text-md">
            Max {side === "Buy" ? "Buy" : "Sell"}:
          </span>
          <span className="text-md font-medium text-[#ff7700]">
            54.95 {tokenId}
          </span>
        </div>

        {/* ── 4) Amount inputs ───────────────────────── */}
        <div className="flex flex-col gap-2">
          <label className="text-md">Amount ({tokenId})</label>
          <input
            type="number"
            value={amountTok}
            onChange={e => setAmountTok(e.target.value)}
            className="w-32 rounded-md border-2 px-2 py-1 text-[#ff7700] font-medium focus:outline-none focus:border-[#ff7700]"
          />
          <span className="text-md">
            Order Value:
          </span>
          <span className="text-md font-medium text-[#ff7700]">
            1089.00 XRP
          </span>
        </div>
      </div>
    </form>
  )
}
