import React, { useState } from "react"

const ORDER_TYPES = ["Market", "Limit", "Stop", "Trailing Stop"]

export default function OrderForm({ tokenId, currentPrice }) {
  // form state
  const [side, setSide] = useState("Buy")
  const [type, setType] = useState("Market")
  const [limitPrice, setLimit] = useState(currentPrice)
  const [amountTok, setAmountTok] = useState("")

  /* derived helper */
  const isMarket = type === "Market"

  const handleSubmit = e => {
    e.preventDefault()
    // TODO: connect to backend / wallet
    console.log({ side, type, limitPrice, amountTok })
  }

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
              <span className="text-md font-semibold">
                {currentPrice.toFixed(4)} XRP
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
                className="w-32 rounded-md border-2 px-2 py-1 text-[#ff7700] font-semibold focus:outline-none focus:border-[#ff7700]"
              />
            </>
          )}
          <span className="text-md">
            Max {side === "Buy" ? "Buy" : "Sell"}:
          </span>
          <span className="text-md font-semibold text-[#ff7700]">
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
            className="w-32 rounded-md border-2 px-2 py-1 text-[#ff7700] font-semibold focus:outline-none focus:border-[#ff7700]"
          />
          <span className="text-md">
            Order Value:
          </span>
          <span className="text-md font-semibold text-[#ff7700]">
            1089.00 XRP
          </span>
        </div>
      </div>

    </form>
  )
}
