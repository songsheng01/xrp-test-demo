import React from "react"

export default function OrderBook({
  tokenId,
  className = "",
  asks,
  bids,
  lastPrice = 10.8905
}) {
  return (
    <div className={`h-full flex flex-col items-center px-2 ${className}`}>
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* ── Column titles ─────────────── */}
        <div className="grid grid-cols-2 w-full text-right font-medium mb-1">
          <span>Price</span>
          <span>Qty</span>
        </div>

        {/* ── Asks (top‑3) ─────────────────── */}
        <div className="grid grid-cols-2 gap-y-0.5 text-right w-full mb-1">
          {/* 5 lowest asks, displayed highest→lowest */}
          {[...asks]
            .sort((a, b) => a[0] - b[0])     // lowest first
            .slice(0, 5)                     // keep 5
            .sort((a, b) => b[0] - a[0])     // reverse inside the subset
            .map(([price, amount], i) => (
              <Row
                key={`ask-${i}`}
                price={price}
                amount={amount}
                color="text-red-600"
              />
            ))}
        </div>

        {/* ── Last price ───────────────────── */}
        <span className="text-lg text-left font-bold text-[#00a300] my-1">
          {lastPrice.toFixed(4)}
        </span>

        {/* ── Bids (top‑3) ─────────────────── */}
        <div className="grid grid-cols-2 gap-y-0.5 text-right w-full mt-1">
          {/* 5 highest bids, displayed lowest→highest */}
          {[...bids]
            .sort((a, b) => b[0] - a[0])     // highest first
            .slice(0, 5)                     // keep 5
            .map(([price, amount], i) => (
              <Row
                key={`bid-${i}`}
                price={price}
                amount={amount}
                color="text-[#00a300]"
              />
            ))}
        </div>
      </div>
    </div>
  )
}

/* ───────── helpers ─────────────────────────────────────────────── */

function Row({ price, amount, color }) {
  return (
    <>
      <span className={`${color}`}>{Number(price).toFixed(2)}</span>
      <span className={`${color}`}>{Number(amount).toFixed(2)}</span>
    </>
  )
}