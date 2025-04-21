import React from "react";
import { useNavigate } from "react-router-dom";

const HoldingCard = ({ token }) => {
  const navigate = useNavigate();
  const handleTrade   = () => navigate(`/trade/${token.symbol}`, { state: { token } })
  const handleRedeem  = () => console.log("Redeem", token.symbol)

  const canRedeem = token.amount >= 1000
  const pct = Math.min(token.amount / 1000, 1) * 100

  return (
    <div
      onClick={handleTrade}
      className="
        group
        relative w-full
        bg-white rounded-2xl shadow-md border-4 border-x-white border-b-white border-t-gray-100 px-4 pt-5 pb-3
        flex flex-col items-center
        cursor-pointer hover:border-4 hover:border-orange-400 transition duration-100
      "å
    >
      {/* horizontal stripe */}
      <div className="absolute top-0 left-0 w-full h-[5px] rounded-full bg-neutral-300 group-hover:opacity-0 transition duration-100"
      >
        <div
          className={`h-full rounded-full ${pct < 100 ? "bg-gradient-to-r from-pink-300 to-pink-400" : "bg-gradient-to-r from-[#ff5e00] to-[#ff9600]"}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* adaptive 4:3 rectangle image */}
      <div className="w-full aspect-[4/3] mb-4">
        <img
          src={token.image}
          alt={token.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* token card info */}
      <h3 className="text-lg font-semibold text-neutral-800">
        {token.name}
      </h3>
      <p className={"mt-2 text-md font-semibold text-neutral-700"}
      >
        {token.amount} {token.symbol}
      </p>
      <p
        className={`mt-1 text-md font-semibold ${token.change >= 0 ? "text-[#00a300]" : "text-red-500"
          }`}
      >
        {token.value.toFixed(2)} XRP {token.change}%
      </p>

      <div
        className="
          absolute inset-0 rounded-xl bg-black/30
          hidden group-hover:flex flex-col items-center justify-center gap-3
          transition duration-100
        "
      >
        <button
          onClick={handleTrade}
          className="px-10 py-2 rounded-md bg-gradient-to-r from-[#ff7700] to-[#ff03b8]
                     text-white font-semibold hover:brightness-110"
        >
          Trade
        </button>

        {canRedeem ? (
          <button
            onClick={handleRedeem}
            className="px-7 py-2 rounded-md border-2 border-pink-500
                       bg-white backdrop-blur text-pink-500 font-semibold
                       hover:bg-pink-100"
          >
            Redeem
          </button>
        ) : (
          <span className="p-2 text-md text-neutral-700 font-semibold rounded-md bg-white/90">
            Need 1000 tokens to redeem
          </span>
        )}
      </div>
    </div>
  );
};

export default HoldingCard;