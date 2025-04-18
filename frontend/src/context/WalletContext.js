import React, { createContext, useState } from "react";
import { isInstalled, getAddress } from "@gemwallet/api"; //
import * as xrpl from "xrpl";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [xrpBalance, setXrpBalance] = useState(null);

  const fetchBalance = async (address) => {
    // Connect to Testnet
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
    try {
      await client.connect()
      // Fetch balance (returns a string in XRP)
      const balance = await client.getXrpBalance(address)
      return balance
    } catch (err) {
      console.error("Failed to fetch XRP balance:", err)
      throw err
    } finally {
      await client.disconnect()
    }
  }
  
  // const fetchBalance = async (address) => {
  //   try {
  //     const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  //     await client.connect();
  
  //     const response = await client.request({
  //       command: "account_info",
  //       account: address,
  //       ledger_index: "validated",
  //     });
  
  //     const balance = response.result?.account_data?.Balance;
  //     setXrpBalance(balance ? xrpl.dropsToXrp(balance) : "0");
  
  //     await client.disconnect();
  //   } catch (error) {
  //     console.error("Failed to fetch XRP balance:", error);
  //     setXrpBalance("Error");
  //   }
  // };

  const connectWallet = async () => {
    console.log("Connect Wallet function triggered");
    try {
      const installedResponse = await isInstalled();
      console.log("GemWallet Installed:", installedResponse);
      if (installedResponse.result.isInstalled === true) {
        const addressResponse = await getAddress();
        const address = addressResponse.result?.address
        console.log("Wallet Address:", address);
        setWalletAddress(address);
        if (address) {
          const balance = await fetchBalance(address);
          setXrpBalance(balance);
        }
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