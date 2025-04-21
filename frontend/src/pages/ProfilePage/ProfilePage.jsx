import React, { useContext, useState } from "react"
import { WalletContext } from "../../context/WalletContext" 
import TopBar from "../../components/TopBar/TopBar"
import SideBar from "../../components/SideBar/SideBar"
import TokenCard from "../../components/TokenCard/TokenCard"
import ProfileHeader from "../../components/Profile/ProfileHeader"
import HoldingsGrid from "../../components/Profile/HoldingsGrid"

/* test content */
import sampleImage from "../../assets/bulbasaur.png";
import sampleImage2 from "../../assets/NBA.png";
import sampleImage3 from "../../assets/ivysaur.png";
import sampleImage4 from "../../assets/venusaur.png";
import sampleImage5 from "../../assets/p1.png";
import sampleImage6 from "../../assets/p2.png";
import sampleImage7 from "../../assets/p3.png";
import sampleImage8 from "../../assets/p4.png";
import sampleImage9 from "../../assets/p5.png";
import sampleImage10 from "../../assets/p6.png";

import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertActions
} from "../../components/tailwind_utils/alert"

export default function ProfilePage() {
  const { walletAddress } = useContext(WalletContext)

  /* demo data – swap with real hooks later */
  const stats = {
    netWorth: 10_000,
    xrpBalance: 3_250,
    unique: 12,
    total: 34,
    listed: 5,
    volume: 126_500,
    earnings: 4200
  }

  const sampleHoldings = [
    { name: "Pokemon 1",         symbol: "PKM1",  amount: 150, value: 42.8,  change:  -3.2, image: sampleImage },
    { name: "Victor Wembanyama", symbol: "VWEMB", amount: 1200, value: 9_870, change:   6.7, image: sampleImage2 },
    { name: "Pokemon 2",         symbol: "PKM2",  amount:  800, value: 11.4,  change:  -8.1, image: sampleImage3 },
    { name: "Token D",           symbol: "TKD",   amount: 2000, value: 73.6,  change:   1.9, image: sampleImage4 },
    { name: "Token E",           symbol: "TKEN",  amount:  950, value: 18.2,  change:   2.3, image: sampleImage5 },
    { name: "Token F",           symbol: "TKF",   amount: 110, value: 25.7,  change:   3.9, image: sampleImage6 },
    { name: "Token G",           symbol: "TKG",   amount: 140, value: 31.5,  change:  -0.8, image: sampleImage7 },
    { name: "Token H",           symbol: "TKH",   amount:  600, value: 92.1,  change:   9.4, image: sampleImage8 },
    { name: "Token I",           symbol: "TKI",   amount: 1750, value: 38.0,  change:   4.0, image: sampleImage9 },
    { name: "Token J",           symbol: "TKJ",   amount: 1300, value: 44.2,  change:   1.3, image: sampleImage10 },
  ];  

  const [openAlert, setOpenAlert] = useState(false)   // modal state

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 text-gray-900 px-4 pb-4 pt-1">
      {/* top nav */}
      <div className="mb-2">
        <TopBar />
      </div>

      <div className="flex flex-1 gap-4 min-h-0">
        <SideBar currentPage="profile" />

        {/* right‑hand content */}
        <div className="flex-1 flex flex-col min-h-0 space-y-6">
          {/* profile header */}
          <ProfileHeader
            walletAddress={walletAddress}
            stats={stats}
          />

          {/* holdings grid */}
          <HoldingsGrid holdings={sampleHoldings} />
        </div>
      </div>

      {/* redeem‑card alert */}
      {openAlert && (
        <Alert
          open={openAlert}
          onClose={() => setOpenAlert(false)}
          className="rounded-2xl ring-4 ring-[#ff7700] shadow-sm !max-w-2xl"
        >
          <AlertTitle className="!text-xl !text-center !text-[#ff7700]">Redeem Guidelines</AlertTitle>
          <AlertDescription className="!text-lg text-neutral-700 pt-2">
          Click on the card you would like to redeem to explore redeem options. <br/>
          A card can be redeemed with 1000 tokens.
          </AlertDescription>
          <AlertActions>
            <button
              onClick={() => setOpenAlert(false)}
              className="px-6 py-2 rounded-md bg-[#ff7700] text-white font-semibold hover:brightness-110"
            >
              OK
            </button>
          </AlertActions>
        </Alert>
      )}
    </div>
  )
}