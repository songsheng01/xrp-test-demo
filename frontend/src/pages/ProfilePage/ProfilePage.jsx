import React, { useContext, useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { WalletContext } from "../../context/WalletContext" 
import TopBar from "../../components/TopBar/TopBar"
import SideBar from "../../components/SideBar/SideBar"
import ProfileHeader from "../../components/Profile/ProfileHeader"
import HoldingsGrid from "../../components/Profile/HoldingsGrid"
import axios from 'axios';
import config from "../../config/config";

import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertActions
} from "../../components/tailwind_utils/alert"

const ProfilePage = () => {
  const navigate = useNavigate()
  const { walletAddress,xrpBalance,tokenLines } = useContext(WalletContext);
  const showRedeemHistory = () => navigate("/redeemhistory")
  const stats = {
    netWorth: 10_000, //这个需要改
    xrpBalance: xrpBalance,
    unique: tokenLines.length,
    total: 34, //这个是什么
    listed: tokenLines.length,
    volume: 126_500, //这个是什么
    earnings: 4200 //这个是什么
  }

  const [allCards, setAllCards] = useState([]);
  const [sampleHoldings, setOwnedCards] = useState([]);

   const getAllCard = async () => {
    try {
      const response = await axios.post(`${config.BACKEND_ENDPOINT}/api/all`);
      const rawData = response.data;

      const formattedTokens = rawData.map((item) => ({
        name: item.name,                            // 卡片名称
        price: Number(item.price_rate),             // 价格，确保是 number
        change: Number(item.price_pct),             // 变化百分比，确保是 number
        image: item.picture,                        // 图片 URL
        id: item.nft_token,                         // NFT Token ID
        type: item.type                             // 这里假设 type 正好和 tokenLines 里的 currency 对应
      }));
      
      setAllCards(formattedTokens);
    } catch (err) {
      console.error("Error get the info", err);
    }
  };

  const filterOwnedCards = () => {
    if (!Array.isArray(allCards) || !Array.isArray(tokenLines)) {
      setOwnedCards([]);
      return;
    }

    // 遍历所有卡片，找出那些在 tokenLines 中存在的
    const matchesWithBalance = allCards
      .map((card) => {
        // 找到 tokenLines 中 currency === card.id 的那一条
        const line = tokenLines.find((line) => line.currency === card.id);
        if (!line) return null; // 没找到说明不拥有，返回 null 占位
        return {
          name: card.name,
          symbol: card.type,
          amount: parseFloat(line.balance).toFixed(2),
          value:card.price,
          change: card.change,
          image: card.image,
          id: card.id,
          type:card.type
        };
      })
      .filter((x) => x !== null);

    setOwnedCards(matchesWithBalance);
    console.log(matchesWithBalance);
  };

  useEffect(() => {
    getAllCard();
  }, []);

  useEffect(() => {
    filterOwnedCards();
  }, [allCards, tokenLines]);

  const [openAlert, setOpenAlert] = useState(false)   // modal state

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 text-neutral-800">
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
            handleRedeem={() => setOpenAlert(true)}
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
          className="rounded-2xl shadow-sm !max-w-2xl"
        >
          <AlertTitle className="!text-xl !text-center !text-[#ff7700]">Redemption Guidelines</AlertTitle>
          <AlertDescription className="!text-lg !text-neutral-700 pt-4 pb-5">
          Click on the card you would like to redeem to explore redemption options. <br/>
          A card can be redeemed with 1000 tokens.
          </AlertDescription>
          <AlertActions className="flex justify-center">
            <button
              onClick={showRedeemHistory}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#ff7700] to-[#ff03ea] text-white font-semibold hover:brightness-110 transition duration-200"
            >
              View My Redemption History
            </button>
          </AlertActions>
        </Alert>
      )}
    </div>
  )
}

export default ProfilePage;