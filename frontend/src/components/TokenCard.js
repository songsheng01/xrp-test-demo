import React from "react";
import { useNavigate } from "react-router-dom";

const TokenCard = ({ token }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // 使用 token.id 生成详情页路径，并通过 state 传递 token 数据
    navigate(`/token/${token.id}`, { state: { token } });
  };

  return (
    <div className="token-card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <img src={token.image} alt={token.name} className="token-image" />
      <div className="token-info">
        <p className="token-price">${token.price.toFixed(2)}</p>
        <p className={`token-change ${token.change >= 0 ? "positive" : "negative"}`}>
          {token.change >= 0 ? `+${token.change.toFixed(2)}` : token.change.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default TokenCard;
