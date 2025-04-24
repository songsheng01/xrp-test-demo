import React from "react"
import clsx from "clsx"

export default function RedeemForm({
  tokenId,
  baseSymbol = "XRP",
  price,         // 1.85
  usdPrice,      // 3.76
  change24h,     // 3.52   (percent)
  supply,        // 100000
  marketCap,     // 185000
  volume24h      // 150000
}) {
  // Format helpers
  const pctColor = change24h >= 0 ? "text-[#00a300]" : "text-red-500"
  const pctSign = change24h >= 0 ? "+" : ""

  const fmt = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 })

  return (
    <div className="px-6 py-2 ">
      <div className="flex justify-between gap-8">
        {/* ─── Column 1 ─────────────────────────────────────────────────────── */}
        <div className="space-y-2">
          {/* Pair heading */}
          <h2 className="text-2xl font-bold mb-5">
            {tokenId} / {baseSymbol} Spot
          </h2>

          {/* Price line */}
          <div className="flex items-end gap-4">
            <span className={clsx("text-2xl font-bold", pctColor)}>
              {fmt.format(price)} {baseSymbol}
            </span>
            <span className={clsx("text-xl font-bold", pctColor)}>
              |&nbsp;&nbsp;${fmt.format(usdPrice)}
            </span>
            <span className={clsx("text-xl font-bold", pctColor)}>
              {pctSign}
              {fmt.format(change24h)}%
            </span>
          </div>
        </div>

        {/* ─── Column 2 ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-y-1 text-sm">
          <span className="text-neutral-500">Supply</span>
          <span className="text-right font-semibold">{supply?.toLocaleString()}</span>

          <span className="text-neutral-500">Market Cap</span>
          <span className="text-right font-semibold">
            {fmt.format(marketCap)} {baseSymbol}
          </span>

          <span className="text-neutral-500">24h Volume</span>
          <span className="text-right font-semibold">{volume24h?.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

/* small vertical pair */
function Stat({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  )
}