import React from "react";

const TokenCard = ({ token }) => {
  return (
    <div className="token-card">
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
