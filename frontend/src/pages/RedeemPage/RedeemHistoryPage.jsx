import React, { useState, useContext } from "react"
import TopBar from "../../components/TopBar/TopBar"
import SideBar from "../../components/SideBar/SideBar"
import RedeemTable from "../../components/Redeem/RedeemTable"
import ListingForm from "../../components/Listing/ListingForm"
import { WalletContext } from "../../context/WalletContext"

import { GoPackageDependents } from "react-icons/go";

export default function ListingPage() {
  const { walletAddress } = useContext(WalletContext)
  const [requests, setReqs] = useState([
    {
      id: "REQ‑102314",
      card: "2023 Pokémon 151 #2 Bulbasaur",
      number_cards: "2",
      number_tokens_burned: "2000",
      status: "Started",
      fee: "3.15",
      symbol: "BULBA23"
    },
    {
      id: "REQ‑102315",
      card: "1994 Upper Deck Michael Jordan #23",
      number_cards: "1",
      number_tokens_burned: "1000",
      status: "Shipped",
      fee: "3.2",
      symbol: "JORDAN9423"
    },
    {
      id: "REQ‑102316",
      card: "2019 Panini Prizm Zion Williamson #248",
      number_cards: "10",
      number_tokens_burned: "10000",
      status: "Delivered",
      fee: "5.98",
      symbol: "ZION19"
    },
    {
      id: "REQ‑102317",
      card: "2015 Stephen Curry #20",
      number_cards: "1",
      number_tokens_burned: "1000",
      status: "Processing Items",
      fee: "2.0",
      symbol: "CURRY1520"
    },
    {
      id: "REQ‑102314",
      card: "2023 Pokémon 151 #2 Bulbasaur",
      number_cards: "2",
      number_tokens_burned: "2000",
      status: "Started",
      fee: "3.15",
      symbol: "BULBA23"
    },
    {
      id: "REQ‑102315",
      card: "1994 Upper Deck Michael Jordan #23",
      number_cards: "1",
      number_tokens_burned: "1000",
      status: "Shipped",
      fee: "3.2",
      symbol: "JORDAN9423"
    },
    {
      id: "REQ‑102316",
      card: "2019 Panini Prizm Zion Williamson #248",
      number_cards: "10",
      number_tokens_burned: "10000",
      status: "Delivered",
      fee: "5.98",
      symbol: "ZION19"
    },
    {
      id: "REQ‑102317",
      card: "2015 Stephen Curry #20",
      number_cards: "1",
      number_tokens_burned: "1000",
      status: "Processing Items",
      fee: "2.0",
      symbol: "CURRY1520"
    },
    {
      id: "REQ‑102314",
      card: "2023 Pokémon 151 #2 Bulbasaur",
      number_cards: "2",
      number_tokens_burned: "2000",
      status: "Started",
      fee: "3.15",
      symbol: "BULBA23"
    },
    {
      id: "REQ‑102315",
      card: "1994 Upper Deck Michael Jordan #23",
      number_cards: "1",
      number_tokens_burned: "1000",
      status: "Shipped",
      fee: "3.2",
      symbol: "JORDAN9423"
    },
    {
      id: "REQ‑102316",
      card: "2019 Panini Prizm Zion Williamson #248",
      number_cards: "10",
      number_tokens_burned: "10000",
      status: "Delivered",
      fee: "5.98",
      symbol: "ZION19"
    },
    {
      id: "REQ‑102317",
      card: "2015 Stephen Curry #20",
      number_cards: "1",
      number_tokens_burned: "1000",
      status: "Processing Items",
      fee: "2.0",
      symbol: "CURRY1520"
    },
    {
      id: "REQ‑102314",
      card: "2023 Pokémon 151 #2 Bulbasaur",
      number_cards: "2",
      number_tokens_burned: "2000",
      status: "Started",
      fee: "3.15",
      symbol: "BULBA23"
    },
    {
      id: "REQ‑102315",
      card: "1994 Upper Deck Michael Jordan #23",
      number_cards: "1",
      number_tokens_burned: "1000",
      status: "Shipped",
      fee: "3.2",
      symbol: "JORDAN9423"
    },
    {
      id: "REQ‑102316",
      card: "2019 Panini Prizm Zion Williamson #248",
      number_cards: "10",
      number_tokens_burned: "10000",
      status: "Delivered",
      fee: "5.98",
      symbol: "ZION19"
    },
    {
      id: "REQ‑102317",
      card: "2015 Stephen Curry #20",
      number_cards: "1",
      number_tokens_burned: "1000",
      status: "Processing Items",
      fee: "2.0",
      symbol: "CURRY1520"
    },
    {
      id: "REQ‑102314",
      card: "2023 Pokémon 151 #2 Bulbasaur",
      number_cards: "2",
      number_tokens_burned: "2000",
      status: "Started",
      fee: "3.15",
      symbol: "BULBA23"
    },
    {
      id: "REQ‑102315",
      card: "1994 Upper Deck Michael Jordan #23",
      number_cards: "1",
      number_tokens_burned: "1000",
      status: "Shipped",
      fee: "3.2",
      symbol: "JORDAN9423"
    },
    {
      id: "REQ‑102316",
      card: "2019 Panini Prizm Zion Williamson #248",
      number_cards: "10",
      number_tokens_burned: "10000",
      status: "Delivered",
      fee: "5.98",
      symbol: "ZION19"
    },
    {
      id: "REQ‑102317",
      card: "2015 Stephen Curry #20",
      number_cards: "1",
      number_tokens_burned: "1000",
      status: "Processing Items",
      fee: "2.0",
      symbol: "CURRY1520"
    }
  ])

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 text-neutral-800">
      <div className="mb-2">
        <TopBar />
      </div>

      <div className="flex flex-1 min-h-0 gap-4">
        <SideBar currentPage="list" />

        {/* actual content */}
        <div className="flex-1 flex flex-col min-h-0 space-y-6">
          {/* page header */}
          <div className="flex items-center px-2 pt-6 pb-2">
            <GoPackageDependents data-slot="icon" className="w-10 h-10 text-orange-500" />
            <h1 className="text-3xl font-bold px-3">My Card Redemptions</h1>
          </div>
          {/* short description */}
          <p className="px-2 text-neutral-800 text-lg">
            To start a new redemption request, go to your profile and click the card you would like to redeem.
          </p>
          {/* bodies */}
          <div className="flex-1 min-h-0 overflow-auto no-scrollbar">
            <RedeemTable listings={requests} />
          </div>
        </div>
      </div>
    </div>
  )
}

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`
      ml-2 px-8 py-2 text-lg font-semibold border-2 rounded-xl
      ${active
        ? "border-orange-500 text-orange-500"
        : "border-neutral-500 text-neutral-500 hover:border-orange-400 hover:text-orange-400 transition duration-50"}
    `}
  >
    {children}
  </button>
)
