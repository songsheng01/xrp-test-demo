import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./SideBar.module.css";
import { WalletContext } from "../../context/WalletContext";
import clsx from "clsx"
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarItem,
  SidebarSection,
  SidebarSpacer,
  SidebarDivider,
  SidebarLabel
} from "../tailwind_utils/sidebar"
import { FaHome, FaStore, FaWallet, FaInfoCircle, FaSearch } from "react-icons/fa"

export default function SideBar({ currentPage }) {
  const { walletAddress, xrpBalance, connectWallet } = useContext(WalletContext);
  const navigate = useNavigate()

  const formatAddress = addr => addr.slice(0, 4) + "..." + addr.slice(-4)

  return (
    <Sidebar className="w-80 flex-shrink-0 self-stretch flex flex-col h-full min-h-0 bg-white backdrop-blur-lg border-white/40 shadow-lg rounded-2xl">
      {/* aurora gradient stripe */}
      <span
        className="absolute inset-y-0 left-0 w-3 rounded-l-2xl
             bg-gradient-to-b from-violet-400 via-purple-500
             via-pink-400 to-orange-400"
      />
      <SidebarBody className="flex-1 min-h-0 overflow-y-auto pl-10 pr-8 pt-6 space-y-6">
        {/* Upper nav section */}
        <div className="space-y-6">
          <div className="relative">
            <FaSearch className="absolute top-3.5 left-4 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-12 pr-4 py-3 text-base rounded-xl ring-2 ring-pink-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <SidebarSection className="space-y-5">
            <SidebarItem
              href="/home"
              current={currentPage === "home"}
              className={clsx(
                "flex items-center gap-4 text-xl font-semibold px-6 py-4 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white/80 hover:shadow-xl transform hover:-translate-y-0.5 transition",
                currentPage === "home" && "bg-gradient-to-r from-orange-50 to-pink-50"
              )}
            >
              <FaHome data-slot="icon" className={clsx("w-7 h-7 ", currentPage === "home" ? "text-orange-500" : "text-pink-500")} />
              <SidebarLabel className={clsx("text-xl font-bold", currentPage === "home" ? "text-orange-500" : "text-pink-500")}>Home</SidebarLabel>
            </SidebarItem>

            <SidebarItem
              href="/marketplace"
              current={currentPage === "marketplace"}
              className={clsx(
                "flex items-center gap-4 text-xl font-semibold px-6 py-4 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white/80 hover:shadow-xl transform hover:-translate-y-0.5 transition",
                currentPage === "marketplace" && "bg-gradient-to-r from-orange-50 to-pink-50"
              )}
            >
              <FaStore data-slot="icon" className={clsx("w-7 h-7", currentPage === "marketplace" ? "text-orange-500" : "text-pink-500")} />
              <SidebarLabel className={clsx("text-xl font-bold", currentPage === "marketplace" ? "text-orange-500" : "text-pink-500")}>Marketplace</SidebarLabel>
            </SidebarItem>

            <SidebarItem
              onClick={() => { if (walletAddress) { navigate("/profile") } else { connectWallet() } }}
              current={currentPage === "holdings"}
              className={clsx(
                "flex items-center gap-4 text-xl font-semibold px-6 py-4 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white/80 hover:shadow-xl transform hover:-translate-y-0.5 transition",
                currentPage === "holdings" && "bg-gradient-to-r from-orange-50 to-pink-50"
              )}
            >
              <FaWallet data-slot="icon" className={clsx("w-7 h-7", currentPage === "holdings" ? "text-orange-500" : "text-pink-500")} />
              <SidebarLabel className={clsx("text-xl font-bold", currentPage === "holdings" ? "text-orange-500" : "text-pink-500")}>My Holdings</SidebarLabel>
            </SidebarItem>

            <SidebarItem
              href="/about"
              current={currentPage === "about"}
              className={clsx(
                "flex items-center gap-4 text-xl font-semibold px-6 py-4 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white/80 hover:shadow-xl transform hover:-translate-y-0.5 transition",
                currentPage === "about" && "bg-gradient-to-r from-orange-50 to-pink-50"
              )}
            >
              <FaInfoCircle data-slot="icon" className={clsx("w-7 h-7", currentPage === "about" ? "text-orange-500" : "text-pink-500")} />
              <SidebarLabel className={clsx("text-xl font-bold", currentPage === "about" ? "text-orange-500" : "text-pink-500")}>About</SidebarLabel>
            </SidebarItem>
          </SidebarSection>
        </div>
      </SidebarBody>
      {/* Bottom wallet/account info section */}
      <SidebarFooter className="mt-auto border-t border-gray-200 pl-8 py-10 rounded-b-2xl bg-transparent">
        <div className="flex items-center gap-4 mb-6">
          <img
            src="https://i.pravatar.cc/100"
            alt="avatar"
            className="w-20 h-20 rounded-full border border-gray-300 object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = "/default-avatar.png" }}
          />
          <div className="text-sm">
            {walletAddress ? (
              <div className="text-xl font-bold text-orange-500">
                Hi, {formatAddress(walletAddress)}
              </div>
            ) : (
              <div className="text-lg text-gray-700 font-semibold">Connect your wallet to get started</div>
            )}
          </div>
        </div>

        {walletAddress && (
          <>
            <div className="text-lg font-bold mb-1">
              <span className="text-gray-700">Account Value:</span>{" "}
              <span className="text-pink-500">{Number(xrpBalance).toFixed(2)} XRP</span>
            </div>
            <div className="text-lg font-bold">
              <span className="text-gray-700">XRP Balance:</span>{" "}
              <span className="text-pink-500">{Number(xrpBalance).toFixed(2)} XRP</span>
            </div>
          </>
        )}

        <div className="mt-16 flex justify-center">
          <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff5e00] to-[#ff9600]">
            X-Card
          </span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
