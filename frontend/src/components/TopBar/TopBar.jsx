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
    <div className="w-full h-20 px-4 flex items-center gap-20 justify-between bg-white backdrop-blur-lg border-b border-white/40 shadow-md rounded-2xl">
      {/* Left: Wallet Button */}
      <div>
        {walletAddress ? (
          <div className="text-xl font-bold px-16 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white">
            Wallet Connected
          </div>
        ) : (
          <button className="text-xl font-bold px-20 py-3 rounded-2xl border-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:brightness-110 transition duration-200 text-white" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>

      {/* Center: Trending Bar */}
      <div className="flex-1 overflow-hidden relative h-6">
        <div className={styles.marquee}>
          <div className={styles.marqueeContent}>
            <span className="mr-6 text-green-600 font-medium">PIKACHU 1.00 +3.5%</span>
            <span className="mr-6 text-red-600 font-medium">CURRY 15.30 -10.0%</span>
            <span className="mr-6 text-green-600 font-medium">THOMPSON 1.35 +5.3%</span>
            <span className="mr-6 text-green-600 font-medium">JORDAN 859.97 +24.1%</span>
            <span className="mr-6 text-green-600 font-medium">CHAMELEON 1.00 +3.5%</span>
            <span className="mr-6 text-red-600 font-medium">IVYSAUR 15.30 -10.0%</span>
            <span className="mr-6 text-green-600 font-medium">WENBAM 1.35 +5.3%</span>
            <span className="mr-6 text-green-600 font-medium">BRADY 859.97 +24.1%</span>
          </div>
          <div className={styles.marqueeContent} aria-hidden="true">
            <span className="mr-6 text-green-600 font-medium">PIKACHU 1.00 +3.5%</span>
            <span className="mr-6 text-red-600 font-medium">CURRY 15.30 -10.0%</span>
            <span className="mr-6 text-green-600 font-medium">THOMPSON 1.35 +5.3%</span>
            <span className="mr-6 text-green-600 font-medium">JORDAN 859.97 +24.1%</span>
            <span className="mr-6 text-green-600 font-medium">CHAMELEON 1.00 +3.5%</span>
            <span className="mr-6 text-red-600 font-medium">IVYSAUR 15.30 -10.0%</span>
            <span className="mr-6 text-green-600 font-medium">WENBAM 1.35 +5.3%</span>
            <span className="mr-6 text-green-600 font-medium">BRADY 859.97 +24.1%</span>
          </div>
        </div>
      </div>

      {/* Right: Logo */}
      <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 mr-5">
        X-Card
      </div>
    </div>
  )
}
