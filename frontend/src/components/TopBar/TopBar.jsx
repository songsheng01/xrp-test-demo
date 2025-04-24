import React, { useContext } from "react";
import { WalletContext } from "../../context/WalletContext";
import styles from "./TopBar.module.css"

import { IoMdTrendingUp } from "react-icons/io";

export default function TopBar() {
  const { walletAddress, xrpBalance, connectWallet } = useContext(WalletContext);

  // Function to shorten wallet address (e.g., "rXy...abc")
  const shortenAddress = (address) => {
    if (!address) return "Please connect wallet";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="w-full h-20 px-4 flex items-center gap-10 justify-between bg-white backdrop-blur-lg border-b border-white/40 shadow-sm rounded-2xl">
      {/* Left: Wallet Button */}
      <div>
        {walletAddress ? (
          <div className="text-xl font-bold px-16 py-3 rounded-2xl bg-gradient-to-r from-[#ff03ea] to-[#ff7700] text-white">
            Wallet Connected
          </div>
        ) : (
          <button className="text-xl font-bold px-20 py-3 rounded-2xl bg-gradient-to-r from-[#ff03ea] to-[#ff7700] hover:brightness-110 transition duration-200 text-white" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>

      {/* Center: Trending Bar */}
      <div className="flex flex-1 overflow-hidden relative space-x-10 h-6 justify-center items-center whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <IoMdTrendingUp data-slot="icon" className="w-8 h-8 text-orange-500" />
          <span className="text-orange-500 font-semibold">Trending Now:</span>
        </div>
        <span className={`${styles.colorCycleGreen} font-semibold`}>PIKACHU 1.00 +3.5%</span>
        <span className={`${styles.colorCycleRed} font-semibold`}>CURRY 15.30 -10.0%</span>
        <span className={`${styles.colorCycleGreen} font-semibold`}>THOMPSON 1.35 +5.3%</span>
        <span className={`${styles.colorCycleGreen} font-semibold`}>JORDAN 859.97 +24.1%</span>
      </div>

      {/* Right: Logo */}
      <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff5e00] to-[#ff9600] mr-5">
        X-Card
      </div>
    </div>
  )
}
