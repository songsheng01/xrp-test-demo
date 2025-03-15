import React, { createContext, useState } from "react";
// Import the necessary functions from the GemWallet API
import { isInstalled, getAddress } from "@gemwallet/api";

// Create a React context to hold wallet information globally
export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);

  // Function to connect the wallet
  const connectWallet = async () => {
    try {
      // Check if GemWallet extension is installed
      const installedResponse = await isInstalled();
      if (installedResponse.result.isInstalled) {
        // If installed, retrieve the user's wallet address
        const addressResponse = await getAddress();
        // Save the wallet address in state
        setWalletAddress(addressResponse.result?.address);
      } else {
        // Alert the user if GemWallet is not installed
        alert("Please install GemWallet extension!");
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      alert("Failed to connect wallet. Please try again.");
    }
  };

  return (
    <WalletContext.Provider value={{ walletAddress, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};