import React from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar/TopBar";
import SideBar from "../../components/SideBar/SideBar";
import TokenCard from "../../components/TokenCard/TokenCard";

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

export default function Marketplace() {
  const navigate = useNavigate();

  const tokens = [
    { name: "Pokemon 1",         price: 154.0,    change: -3.21, image: sampleImage },
    { name: "Victor Wembanyama", price: 146431.0, change: 10.6,  image: sampleImage2 },
    { name: "Pokemon 2",         price: 14.5,     change: -8.73, image: sampleImage3 },
    { name: "Token D",           price: 15.5,     change: 1.16,  image: sampleImage4 },
    { name: "Token E",           price: 16.5,     change: 2.92,  image: sampleImage5 },
    { name: "Token F",           price: 17.5,     change: 3.64,  image: sampleImage6 },
    { name: "Token G",           price: 18.5,     change: 0.67,  image: sampleImage7 },
    { name: "Token H",           price: 19.5,     change: 9.45,  image: sampleImage8 },
    { name: "Token I",           price: 20.5,     change: 4.12,  image: sampleImage9 },
    { name: "Token J",           price: 21.5,     change: 1.35,  image: sampleImage10 },
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 text-gray-900 px-4 pb-4 pt-1">
      <div className="mb-2">
        <TopBar />
      </div>

      <div className="flex flex-1 gap-4 min-h-0 h-full">
        <SideBar currentPage="marketplace" />

        <div className="flex-1 p-6 flex flex-col min-h-0">
          {/* Sticky Search & Filter */}
          <div className="sticky top-0 bg-gray-100 p-4 z-10 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <input
                type="text"
                placeholder="Search tokens..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <select className="w-full sm:w-48 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300">
                <option>Sort by Price</option>
                <option>Sort by Trending</option>
                <option>Sort by Volume</option>
              </select>
            </div>
          </div>

          {/* Token Grid：5 列，20% 宽度，自适应滚动 */}
          <div className="flex-1 overflow-auto mt-4">
            <div className="grid grid-cols-5 gap-4">
              {tokens.map((token) => (
                <TokenCard key={token.name} token={token} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
