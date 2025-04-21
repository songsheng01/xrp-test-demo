import React from "react";
import { useNavigate } from "react-router-dom";

const TokenCard = ({ token }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/trade/${token.name}`, { state: { token } });

  return (
    <div
      onClick={handleClick}
      className="
        w-full
        bg-white rounded-2xl shadow-md border-2 border-white p-4
        flex flex-col items-center
        cursor-pointer hover:border-orange-400 transition duration-100
      "
    >
      {/* adaptive 4:3 rectangle image */}
      <div className="w-full aspect-[4/3] mb-4">
        <img
          src={token.image}
          alt={token.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* token card info */}
      <h3 className="text-lg font-semibold text-neutral-800 truncate">
        {token.name}
      </h3>
      <p
        className={`mt-2 text-lg font-semibold ${
          token.change >= 0 ? "text-[#00a300]" : "text-red-500"
        }`}
      >
        {token.price.toFixed(2)} XRP
      </p>
      <p
        className={`text-ms font-medium ${
          token.change >= 0 ? "text-[#00a300]" : "text-red-500"
        }`}
      >
        {token.change >= 0 ? `+${token.change.toFixed(2)}` : token.change.toFixed(2)}%
      </p>
    </div>
  );
};

export default TokenCard;
