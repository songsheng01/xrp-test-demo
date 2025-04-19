import React, { useContext } from "react";
import styles from "./TopBar.module.css";
import { WalletContext } from "../../context/WalletContext";

export default function TopBar() {
  const { walletAddress, xrpBalance, connectWallet } = useContext(WalletContext);

  // Function to shorten wallet address (e.g., "rXy...abc")
  const shortenAddress = (address) => {
    if (!address) return "Please connect wallet";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="w-full h-20 px-4 flex items-center gap-20 justify-between bg-white backdrop-blur-lg border-b border-white/40 shadow-sm rounded-2xl">
      {/* Left: Wallet Button */}
      <div>
        {walletAddress ? (
          <div className="text-xl font-bold px-16 py-3 rounded-2xl bg-gradient-to-r from-[#ff03ea] to-[#ff7700] text-white">
            Wallet Connected
          </div>
        ) : (
          <button className="text-xl font-bold px-20 py-3 rounded-2xl border-2 bg-gradient-to-r from-[#ff03ea] to-[#ff7700] hover:brightness-110 transition duration-200 text-white" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>

      {/* Center: Trending Bar */}
      <div className="flex-1 overflow-hidden relative h-6">
        <div className={styles.marquee}>
          <div className={styles.marqueeContent}>
            <span className="mr-6 text-[#00a300] font-semibold">PIKACHU 1.00 +3.5%</span>
            <span className="mr-6 text-red-500 font-semibold">CURRY 15.30 -10.0%</span>
            <span className="mr-6 text-[#00a300] font-semibold">THOMPSON 1.35 +5.3%</span>
            <span className="mr-6 text-[#00a300] font-semibold">JORDAN 859.97 +24.1%</span>
          </div>
          <div className={styles.marqueeContent} aria-hidden="true">
            <span className="mr-6 text-[#00a300] font-semibold">PIKACHU 1.00 +3.5%</span>
            <span className="mr-6 text-red-500 font-semibold">CURRY 15.30 -10.0%</span>
            <span className="mr-6 text-[#00a300] font-semibold">THOMPSON 1.35 +5.3%</span>
            <span className="mr-6 text-[#00a300] font-semibold">JORDAN 859.97 +24.1%</span>
          </div>
        </div>
      </div>

      {/* Right: Logo */}
      <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff5e00] to-[#ff9600] mr-5">
        X-Card
      </div>
    </div>
  )
}
