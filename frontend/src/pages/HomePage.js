import React, { useContext } from "react";
import { WalletContext } from "../context/WalletContext";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { walletAddress, connectWallet } = useContext(WalletContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">XRP NFT System</h1>

      {!walletAddress ? (
        <button
          onClick={connectWallet}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <p className="mt-4 text-lg">Connected: {walletAddress}</p>
          <Link to="/collection">
            <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
              View Collection
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default HomePage;