import React from "react"

export default function OrderBook({
  tokenId,
  className = "",
  asks = demoAsks,
  bids = demoBids,
  lastPrice = 10.8905
}) {
  return (
    <div className={`h-full flex flex-col items-center px-2 ${className}`}>
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* ── Asks (top‑3) ─────────────────── */}
        <div className="grid grid-cols-2 gap-y-0.5 text-right w-full mb-1">
          {asks.slice(0, 5).map(([price, amount], i) => (
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
          {bids.slice(0, 5).map(([price, amount], i) => (
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
      <span className={`font-medium ${color}`}>{price.toFixed(4)}</span>
      <span className={`${color}`}>{amount}</span>
    </>
  )
}

/* ───────── demo data (replace with live feed) ──────────────────── */

const demoAsks = [
  [10.9220, 200],
  [10.9189, 1000],
  [10.9030, 100],
  [10.8951, 300],
  [10.8923, 100]
]

const demoBids = [
  [10.8900, 100],
  [10.8897, 80],
  [10.8708, 50],
  [10.8680, 150],
  [10.8630, 200]
]
