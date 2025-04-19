import React from "react";
import { useNavigate } from "react-router-dom";

const TokenCard = ({ token }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/token", { state: { token } });

  return (
    <div
      onClick={handleClick}
      className="
        w-full
        bg-white rounded-2xl shadow-md p-4
        flex flex-col items-center
        cursor-pointer hover:shadow-xl transition-shadow duration-200
      "
    >
      {/* 4:3 长方形图片，自适应填充 */}
      <div className="w-full aspect-[4/3] mb-4">
        <img
          src={token.image}
          alt={token.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* 文本信息 */}
      <h3 className="text-lg font-semibold text-gray-800 truncate">
        {token.name}
      </h3>
      <p className="mt-1 text-gray-700 font-medium">
        ${token.price.toFixed(2)}
      </p>
      <p
        className={`mt-1 text-sm font-medium ${
          token.change >= 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {token.change >= 0 ? `+${token.change.toFixed(2)}` : token.change.toFixed(2)}%
      </p>
    </div>
  );
};

export default TokenCard;
