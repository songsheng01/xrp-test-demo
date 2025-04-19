// import React from "react";
import { useNavigate } from "react-router-dom";

const TokenCard = ({ token }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to /token page and pass token data as state
    navigate('/token', { state: { token } });
  };

  return (
    <div className="token-card" onClick={handleClick}>
      <img src={token.image} alt={token.name} className="token-image" />
      <div className="token-info">
        <h3>{token.name}</h3>
        <p className="token-price">${token.price.toFixed(2)}</p>
        <p className={`token-change ${token.change >= 0 ? "positive" : "negative"}`}>
          {token.change >= 0 ? `+${token.change.toFixed(2)}` : token.change.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default TokenCard;
