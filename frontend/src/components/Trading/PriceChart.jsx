import React, { useState, useMemo } from "react"
import ReactApexChart from "react-apexcharts"
import dayjs from "dayjs"

/**
 * Props:
 *  - tokenId   : string  (chart title / API key)
 *  - className : optional Tailwind classes for sizing (flex-1, h-full, etc.)
 */
export default function PriceChart({ tokenId, trades = [], className = "" }) {
  /* ── interval selector ─────────────────────────────────────────── */
  const intervals = ["1m", "1h", "1d"]
  const [interval, setInterval] = useState("1d")

  /* ── placeholder OHLC data (replace w/ real query) ─────────────── */
  // const dataByInterval = useMemo(() => ({
  //   "1m": genData(20, 1),   // 60 pts @ 1‑min gap
  //   "1h": genData(20, 60),  // 72 pts @ 1‑hour gap (3 d)
  //   "1d": genData(20, 60 * 24) // 90 pts @ 1‑day gap (3 mo)
  // }), [])
  const dataByInterval = useMemo(() => buildOhlcSeries(trades), [trades])

  /* map interval → milliseconds of one slot */
  const slotSize = { "1m": 60_000, "1h": 3_600_000, "1d": 86_400_000 }

  /* width of 20 consecutive slots, regardless of gaps */
  const rangeMs = slotSize[interval] * 20

  /* ── derive y-axis min / max for those 20 slots ──────────────────────────── */
  const [yMin, yMax] = useMemo(() => {
    const series = dataByInterval[interval]
    if (!series.length) return [undefined, undefined]      // let Apex decide

    const lastX = series[series.length - 1].x.getTime()
    const firstX = lastX - rangeMs

    const visible = series.filter(p => p.x.getTime() >= firstX)
    if (!visible.length) return [undefined, undefined]

    const highs = visible.map(p => p.y[1])
    const lows = visible.map(p => p.y[2])

    const hi = Math.max(...highs)
    const lo = Math.min(...lows)
    const pad = (hi - lo) * 0.02 || 0.02      // 2 % padding, min 0.02
    return [lo - pad, hi + pad]
  }, [dataByInterval, interval, rangeMs])

  /* pick current series */
  const series = [
    {
      name: `${tokenId} / XRP`,
      data: dataByInterval[interval]   // [{x:Date, y:[o,h,l,c]}, …]
    }
  ]

  /* ── chart config ──────────────────────────────────────────────── */
  const options = {
    chart: {
      type: "candlestick",
      height: 350,
      toolbar: { show: false },
      animations: { easing: "easeinout", speed: 350 }
    },
    xaxis: {
      type: "datetime",
      labels: { datetimeUTC: false },
      range: rangeMs
    },
    yaxis: {
      min: yMin,
      max: yMax,
      tooltip: { enabled: true },
      labels: { formatter: val => val.toFixed(2) }
    },
    tooltip: { theme: "light" },
    theme: { mode: "light" }
  }

  return (
    <div className={`p-4 border-2 border-gray-100 rounded-xl ${className}`}>
      {/* interval buttons */}
      <div className="flex gap-2">
        {intervals.map(i => (
          <button
            key={i}
            onClick={() => setInterval(i)}
            className={`px-3 leading-none text-sm font-semibold rounded-lg hover:text-pink-600 transition
              ${interval === i
                ? "text-orange-500"
                : "text-gray-500"}`}
          >
            {i}
          </button>
        ))}
      </div>

      {/* chart */}
      <ReactApexChart
        options={options}
        series={series}
        type="candlestick"
        height="100%"
        width="100%"
      />
    </div>
  )
}

/* ───────────────── helper: generate dummy ohlc ─────────────────── */
function genData(points, minutesGap) {
  const out = []
  let base = dayjs().subtract(points * minutesGap, "minute")
  let lastClose = 50

  for (let i = 0; i < points; i++) {
    const open = rand(lastClose * 0.98, lastClose * 1.02)
    const high = rand(open * 1.01, open * 1.03)
    const low = rand(open * 0.97, open * 0.99)
    const close = rand(low, high)

    out.push({
      x: base.add(i * minutesGap, "minute").toDate(),
      y: [round(open), round(high), round(low), round(close)]
    })
    lastClose = close
  }
  return out
}
const rand = (min, max) => Math.random() * (max - min) + min
const round = num => Math.round(num * 100) / 100

function buildOhlcSeries(trades) {
  if (!trades.length) return { "1m": [], "1h": [], "1d": [] }

  //  oldest-first makes bucketing easier
  const asc = [...trades].reverse()

  const group = (granularity) => {
    const map = new Map() // key = bucket start ISO, value = []
    asc.forEach(t => {
      const ts = dayjs(t.time).startOf(granularity).toISOString()
      if (!map.has(ts)) map.set(ts, [])
      map.get(ts).push(t.price)
    })

    return [...map.entries()].map(([iso, prices]) => ({
      x: new Date(iso),
      y: [
        prices[0],                          // open
        Math.max(...prices),                // high
        Math.min(...prices),                // low
        prices[prices.length - 1]           // close
      ]
    }))
  }

  return {
    "1m": group("minute"),   // use as many buckets as trades supply
    "1h": group("hour"),
    "1d": group("day")
  }
}