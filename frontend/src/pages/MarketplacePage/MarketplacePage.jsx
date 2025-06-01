import React, { useState ,useEffect} from "react"
import axios from 'axios';
import config from "../../config/config";
import TopBar from "../../components/TopBar/TopBar";
import SideBar from "../../components/SideBar/SideBar";
import TokensGrid from "../../components/Marketplace/TokensGrid"

export default function Marketplace() {

  const [tokens,setTokens] = useState([]);
  const getAllCard = async ()=>{
    try{
      const response = await axios.post(`${config.BACKEND_ENDPOINT}/api/all`);
      const rawData = response.data;
      const formattedTokens = rawData.map((item) => {
        return {
          name: item.name,                       // 或者 item.name，取决于后端字段
          price: Number(item.price_rate),                // 确保是数值类型
          change: Number(item.price_pct),          // 确保是数值类型
          image: item.picture,
          id: item.nft_token,
          type: item.type
        };
      });
      setTokens(formattedTokens);
    }catch(err){
      console.error('Error get the info', err);
    }
  }

  useEffect(()=>{
    getAllCard();
  },[]);
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 text-neutral-800">
      <div className="mb-2">
        <TopBar />
      </div>

      <div className="flex flex-1 gap-4 min-h-0 h-full">
        <SideBar currentPage="marketplace" />

        <TokensGrid holdings={tokens} />
      </div>
    </div>
  );
}
