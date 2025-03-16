import React from "react";
import { useNavigate } from "react-router-dom";

const OwnTokenCard = ({ token }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the detailed OwnTokenCard page and pass token data via state
    navigate("/ownTokenCardPage", { state: { token } });
  };

  return (
    <div className="token-card" onClick={handleClick}>
      <img src={token.image} alt={token.name} className="token-image" />
      <div className="token-info">
        <h3>{token.name}</h3>
      </div>
    </div>
  );
};

export default OwnTokenCard;
