import React, { createContext, useState } from "react";
import { isInstalled, getAddress, signTransaction } from "@gemwallet/api";
import * as xrpl from "xrpl";
import { convertStringToHex } from "xrpl";

export const WalletContext = createContext({
  walletAddress: null,
  xrpBalance: null,
  connectWallet: async () => {},
  signAndSubmit: async () => ({ success: false }),
  ensureTrustLine: async () => ({ success: false }),
});

/**
 * 获取可用的 XRP 余额（扣除保留金）
 */
export async function fetchAvailableXrp(address) {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const totalXrpStr = await client.getXrpBalance(address);
  const totalXrp = parseFloat(totalXrpStr);

  const acctRes = await client.request({
    command: "account_info",
    account: address,
    ledger_index: "validated",
  });
  const ownerCount = acctRes.result.account_data.OwnerCount;

  const infoRes = await client.request({ command: "server_info" });
  const validated = infoRes.result.info.validated_ledger;
  const reserveBaseXrp = parseFloat(validated.reserve_base_xrp);
  const reserveIncXrp = parseFloat(validated.reserve_inc_xrp);

  const reservedXrp = reserveBaseXrp + reserveIncXrp * ownerCount;
  const availableXrp = Math.max(totalXrp - reservedXrp, 0);

  await client.disconnect();
  return availableXrp.toString();
}

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [xrpBalance, setXrpBalance] = useState(null);
  const [tokenLines, setTokenLines] = useState([]); 

  const connectWallet = async () => {
    try {
      const installed = await isInstalled();
      if (installed.result.isInstalled) {
        const addrRes = await getAddress();
        const addr = addrRes.result.address;
        setWalletAddress(addr || null);
        if (addr) {
          const bal = await fetchAvailableXrp(addr);
          setXrpBalance(bal);
          await fetchTokens(addr);
        }
        return addr;
      } else {
        alert("Please install GemWallet extension!");
      }
    } catch (err) {
      console.error("connectWallet error:", err);
      alert("Wallet connection failed.");
    }
  };

  const signAndSubmit = async (txJson) => {
    if (!walletAddress) {
      await connectWallet();
      if (!walletAddress) {
        return { success: false, error: "Wallet not connected" };
      }
    }

    try {
      // 1) 使用 ripple-lib autofill
      const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
      await client.connect();
      const prepared = await client.autofill(txJson);
      await client.disconnect();

      // 2) 用 GemWallet 签名（仅签名，不提交）
      const signResp = await signTransaction({
        transaction: prepared,
        network: { server: "wss://s.altnet.rippletest.net:51233" }
      });
      const signedBlob = signResp.result?.signedTransaction || signResp.result?.signature;
      if (!signedBlob) throw new Error("No signed transaction returned");

      // 3) 使用 ripple-lib 广播并等待
      const client2 = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
      await client2.connect();
      const result = await client2.submitAndWait(signedBlob);
      await client2.disconnect();

      return { success: true, txHash: result.result.hash };
    } catch (error) {
      console.error("Transaction failed:", error);
      return { success: false, error: error.message };
    }
  };

  const ensureTrustLine = async ({ trustTransaction }) => {
    try {
      const tx = { ...trustTransaction };
      if (
        tx.TransactionType === "TrustSet" &&
        tx.LimitAmount &&
        typeof tx.LimitAmount.currency === "string" &&
        tx.LimitAmount.currency.length > 3
      ) {
        let hex = convertStringToHex(tx.LimitAmount.currency);
        if (hex.length < 40) hex = hex.padEnd(40, "0");
        tx.LimitAmount.currency = hex;
      }
      const res = await signAndSubmit(tx);
      return res;
    } catch (err) {
      console.error("ensureTrustLine error:", err);
      return { success: false, error: err.message };
    }
  };

  const fetchTokens = async (address) => {
    try {
      const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
      await client.connect();

      const resp = await client.request({
        command: "account_lines",
        account: address,
        ledger_index: "validated",
        limit: 200, // 如果信任线路很多，可以分页获取
      });
      const lines = resp.result.lines || [];

      // 如果你只关心 currency 和 balance，可以这样提取：
      const formatted = lines.map((line) => ({
        currency: line.currency,
        balance: line.balance,
        issuer: line.account, // 这里的 account 就是该 currency 的发行方
      }));

      setTokenLines(formatted);
      await client.disconnect();
      return formatted;
    } catch (err) {
      console.error("fetchTokens error:", err);
      setTokenLines([]);
      return [];
    }
  };

  return (
    <WalletContext.Provider
      value={{ walletAddress, xrpBalance,tokenLines, connectWallet, signAndSubmit, ensureTrustLine,fetchTokens }}
    >
      {children}
    </WalletContext.Provider>
  );
};
