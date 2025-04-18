import React, { createContext, useState } from "react";
import { isInstalled, getAddress } from "@gemwallet/api"; //
import * as xrpl from "xrpl";

export const WalletContext = createContext();

export async function fetchAvailableXrp(address) {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
  await client.connect()

  // 1) Get total XRP via built‑in helper (string, e.g. "100.000000")
  const totalXrpStr = await client.getXrpBalance(address)
  const totalXrp = Number(totalXrpStr)

  // 2) Get account_info so we know how many ledger objects you have
  const acctRes = await client.request({
    command: "account_info",
    account: address,
    ledger_index: "validated",
  })
  const ownerCount = acctRes.result.account_data.OwnerCount

  // 3) Get the current reserve requirements
  const infoRes = await client.request({ command: "server_info" })
  const validated = infoRes.result.info.validated_ledger
  const reserveBaseXrp = Number(validated.reserve_base_xrp)
  const reserveIncXrp = Number(validated.reserve_inc_xrp)

  // 4) Compute available = total - (base + inc * ownerCount)
  const reservedXrp = reserveBaseXrp + reserveIncXrp * ownerCount
  const availableXrp = Math.max(totalXrp - reservedXrp, 0)

  await client.disconnect()
  return availableXrp.toString()
}

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [xrpBalance, setXrpBalance] = useState(null);

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
          const balance = await fetchAvailableXrp(address);
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