import React, { createContext, useState } from "react";
import { isInstalled, getAddress } from "@gemwallet/api"; // ✅ Removed getBalance
import xrpl from "xrpl"; // ✅ Import xrpl.js for fetching XRP balance

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [xrpBalance, setXrpBalance] = useState(null);

  // const fetchBalance = async (address) => {
  //   try {
  //     const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233"); // ✅ Corrected
  //     await client.connect();
  
  //     const response = await client.request({
  //       command: "account_info",
  //       account: address,
  //       ledger_index: "validated",
  //     });
  
  //     const balance = response.result?.account_data?.Balance;
  //     setXrpBalance(balance ? xrpl.dropsToXrp(balance) : "0"); // ✅ Convert drops to XRP
  
  //     await client.disconnect();
  //   } catch (error) {
  //     console.error("Failed to fetch XRP balance:", error);
  //     setXrpBalance("Error");
  //   }
  // };  

  // const connectWallet = async () => {
  //   try {
  //     const installedResponse = await isInstalled();
  //     if (installedResponse.result.isInstalled) {
  //       const addressResponse = await getAddress();
  //       const address = addressResponse.result?.address;
  //       setWalletAddress(address);

  //       // ✅ Fetch XRP balance after connecting
  //       if (address) {
  //         await fetchBalance(address);
  //       }
  //     } else {
  //       alert("Please install the GemWallet extension!");
  //     }
  //   } catch (error) {
  //     console.error("Failed to connect wallet:", error);
  //     alert("Failed to connect wallet. Please try again.");
  //   }
  // };

  const connectWallet = async () => {
    console.log("Connect Wallet function triggered");
    try {
      const installedResponse = await isInstalled();
      console.log("GemWallet Installed:", installedResponse);
      if (installedResponse.result.isInstalled === true) {
        const addressResponse = await getAddress();
        console.log("Wallet Address:", addressResponse.result?.address);
  
        setWalletAddress(addressResponse.result?.address);
      } else {
        alert("Please install GemWallet extension!");
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      alert("Wallet connection failed.");
    }
  };

  return (
    <WalletContext.Provider value={{ walletAddress, xrpBalance, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};