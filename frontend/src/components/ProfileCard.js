import "./ProfileCard.css";
import React, { useState } from "react";

const ProfileCard = ({ token }) => {
  const [shareCount, setShareCount] = useState(1);

  const handleShareChange = (e) => {
    setShareCount(Number(e.target.value));
  };

  const handleBuyShares = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/tokens/sold", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token.id,       // Use the token's id
          quantity: shareCount,  // The number of shares the user wants to buy
          maxPrice: token.price  // Assume maxPrice is token.price
        }),
      });
      const result = await response.json();
      if (response.ok) {
        console.log("Result", result);
        alert(`Purchase Successful, Your balance is: ${result.remain}`);
      } else {
        console.error("Purchase Unsuccessful", result);
        alert(`Purchase Unsuccessful: ${result.error || "Unknown error"}. Your balance is: ${result.remain || "N/A"}`);
      }
    } catch (error) {
      console.error("Purchase Unsuccessful", error);
      alert(`Purchase Unsuccessful: ${error.message}`);
    }
  };

  return (
    <div className="profile-card">
      <img
        src={token.image}
        alt={token.name}
        className="profile-card-image"
      />
      <div className="profile-card-info">
        <h2 className="profile-card-title">{token.name}</h2>
        <p className="profile-card-description">{token.description}</p>
        <div className="buy-section">
          <label htmlFor="shareCount">Number of Shares: </label>
          <input
            type="number"
            id="shareCount"
            value={shareCount}
            onChange={handleShareChange}
            min="1"
          />
          <button onClick={handleBuyShares}>Make Purchase</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
