import React, { useState, useContext } from "react"
import TopBar from "../../components/TopBar/TopBar"
import SideBar from "../../components/SideBar/SideBar"
import ListingTable from "../../components/Listing/ListingTable"
import ListingForm from "../../components/Listing/ListingForm"
import { WalletContext } from "../../context/WalletContext"

import { IoIosPricetags } from "react-icons/io";

export default function ListingPage() {
  const { walletAddress } = useContext(WalletContext)
  const [tab, setTab] = useState("history")      // "history" | "form"
  const [requests, setReqs] = useState([
    {
      id: "REQ‑102314",
      card: "2023 Pokémon 151 #2 Bulbasaur",
      type: "Game",
      number_cards: "2",
      number_tokens: "2000",
      status: "Approved",
      symbol: "BULBA23"
    },
    {
      id: "REQ‑102315",
      card: "1994 Upper Deck Michael Jordan #23",
      type: "Sports",
      number_cards: "1",
      number_tokens: "1000",
      status: "Pending",
      symbol: "-"
    },
    {
      id: "REQ‑102316",
      card: "2019 Panini Prizm Zion Williamson #248",
      type: "Sports",
      number_cards: "10",
      number_tokens: "10000",
      status: "Rejected",
      symbol: "-"
    },
    {
      id: "REQ‑102317",
      card: "2015 Stephen Curry #20",
      type: "Sports",
      number_cards: "1",
      number_tokens: "1000",
      status: "Listed",
      symbol: "CURRY1520"
    }
  ])

  const handleSubmit = data => {
    const id = `REQ-${Math.floor(Math.random() * 1e6)}`
    setReqs(prev => [
      ...prev,
      {
        id,
        card: data.cardName,
        type: data.category,
        number: data.cardId,
        status: "Pending",
        symbol: data.isDuplicate ? data.duplicateSymbol : "-",
      }
    ])
    alert(`Submitted! Your request ID is ${id}`)
    setTab("history")
  }

  const handleClaim = id => alert(`Claiming request ${id}`)

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 text-neutral-800 px-4 pb-2 pt-1">
      <div className="mb-2">
        <TopBar />
      </div>

      <div className="flex flex-1 min-h-0 gap-4">
        <SideBar currentPage="list" />

        {/* actual content */}
        <div className="flex-1 flex flex-col min-h-0 space-y-6">
          {/* page header */}
          <div className="flex items-center px-2 pt-6 pb-2">
            <IoIosPricetags data-slot="icon" className="w-8 h-8 text-orange-500" />
            <h1 className="text-3xl font-bold px-3">Card Listing</h1>
          </div>
          {/* tab buttons */}
          <div className="flex gap-4">
            <TabButton active={tab === "history"} onClick={() => setTab("history")}>
              My Listings
            </TabButton>
            <TabButton active={tab === "form"} onClick={() => setTab("form")}>
              New Listing
            </TabButton>
          </div>

          {/* bodies */}
          <div className="flex-1 min-h-0 overflow-auto no-scrollbar">
            {tab === "form" ? (
              <ListingForm onSubmit={handleSubmit} wallet={walletAddress} />
            ) : (
              <ListingTable listings={requests} onClaim={handleClaim} />
            )}
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
