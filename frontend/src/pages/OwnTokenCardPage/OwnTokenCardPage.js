import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./OwnTokenCardPage.module.css";

const OwnTokenCardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = location.state?.token;
  const [salePrice, setSalePrice] = useState("");

  if (!token) {
    return <div>No token data available.</div>;
  }

  const handleListForSale = () => {
    alert(`Listing ${token.name} for sale at $${salePrice}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img
          src={token.image}
          alt={token.name}
          className={styles.leftImg}
          style={{ maxWidth: "250px", objectFit: "contain" }}
        />
      </div>
      <div className={styles.right}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          Back
        </button>
        <h1 style={{ textAlign: "center", marginBottom: "40px", color: "#000" }}>
          {token.name}
        </h1>
        <div className={styles.listingSection}>
          <label htmlFor="salePrice" style={{ marginBottom: "10px", fontSize: "18px", color: "#000" }}>
            Set Sale Price:
          </label>
          <input
            id="salePrice"
            type="number"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
            placeholder="Enter sale price"
            className={styles.priceInput}
          />
          <button className={styles.listButton} onClick={handleListForSale}>
            List for Sale
          </button>
        </div>
      </div>
    </div>
  );
}
export default OwnTokenCardPage;