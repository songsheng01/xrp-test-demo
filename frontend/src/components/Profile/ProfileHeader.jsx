import React from "react"
import { useNavigate } from "react-router-dom";

export default function ProfileHeader({
  walletAddress,
  avatarUrl = "https://i.pravatar.cc/120",
  stats,
  onRedeem
}) {
  const navigate = useNavigate();
  const handleList = () => navigate("/list")

  const addr = walletAddress ?? "Connect wallet"
  const formatAddress = addr => addr.slice(0, 4) + "..." + addr.slice(-4)

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row sm:items-center gap-6">
      {/* avatar */}
      <img
        src={avatarUrl}
        alt="avatar"
        className="w-24 h-24 rounded-full object-cover ring-4 ring-pink-300"
      />

      {/* wallet + stats */}
      <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="col-span-2">
          <h2 className="font-bold">
            <span className="text-xl text-neutral-700 mr-2">Welcome,</span>
            <span className="break-all text-xl text-[#ff7700] mr-2">{formatAddress(addr)}</span>
            <span className="px-2 py-1 rounded-md text-lg bg-pink-100 text-pink-600">Tier 1</span>
          </h2>
        </div>
        <Stat label="Net Worth" value={`${stats.netWorth.toLocaleString()} XRP`} large/>
        <Stat label="XRP Balance" value={stats.xrpBalance.toLocaleString()} />
        <Stat label="Unique Tokens Holding" value={stats.unique} />
        <Stat label="Redeemable Cards" value={stats.total} />
        <Stat label="Cards Listed" value={stats.listed} />
        <Stat label="Trading Volume" value={`${stats.volume.toLocaleString()} XRP`} />
        <Stat label="Dividend Earnings" value={`${stats.earnings.toLocaleString()} XRP`} />
      </div>

      {/* action buttons */}
      <div className="flex flex-col gap-8">
        <button
          onClick={handleList}
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#ff7700] to-[#ff03ea] hover:brightness-110 transition duration-200 text-white font-semibold"
        >
          List a Card
        </button>
        <button
          onClick={onRedeem}
          className="px-5 py-2 border-2 rounded-lg border-pink-500 text-pink-500 font-semibold hover:bg-pink-100 transition duration-200"
        >
          Redeem a Card
        </button>
      </div>
    </div>
  )
}

/* helper */
function Stat({ label, value, large = false }) {
  return (
    <div className="flex flex-col">
      <span
        className={`${large ? "text-md font-bold text-neutral-700" : "text-neutral-500"
          }`}
      >
        {label}
      </span>
      <span
        className={`font-semibold ${large ? "text-xl text-pink-500" : "text-neutral-700"
          }`}
      >
        {value}
      </span>
    </div>
  )
}