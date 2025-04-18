import React, { useContext } from "react";
import TopBar from "../../components/TopBar/TopBar";
import SideBar from "../../components/SideBar/SideBar";
import { WalletContext } from "../../context/WalletContext";
import { useNavigate } from "react-router-dom";

// Team data
const teamMembers = [
  {
    name: "Bruce Yan",
    role: "Masters student in Development Engineering @ UC Berkeley, Bachelors in Finance @ NJU",
    avatar: "https://i.pravatar.cc/100?img=6",
  },
  {
    name: "Song Sheng",
    role: "Masters student in Statistics @ UC Berkeley, Bachelors in Computer Science @ Waterloo",
    avatar: "https://i.pravatar.cc/100?img=6",
  },
  {
    name: "Peisong Hao",
    role: "Masters student in Statistics @ UC Berkeley, Full-stack Developer with 2 years of experience, Participated in Social Fi project development, Bachelors in CS and Math @ UC Berkeley",
    avatar: "https://i.pravatar.cc/100?img=6",
  },
  {
    name: "Fangyuan Lin",
    role: "Developer, Incoming PhD student @ Columbia Statistics, Bachelors in CS and Math @ UC Berkeley",
    avatar: "https://i.pravatar.cc/100?img=6",
  },
];

export default function AboutPage() {
  const { walletAddress, connectWallet } = useContext(WalletContext);
  const navigate = useNavigate();
  const handleMyHoldingsClick = () => navigate("/ownTokenCardPage");

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 text-gray-900 p-4">
      <div className="mb-4">
        <TopBar />
      </div>
      {/* Page Content */}
      <div className="flex flex-1 gap-4 min-h-0">
        <SideBar onMyHoldingsClick={handleMyHoldingsClick} currentPage="about" />

        {/* Main Content Area */}
        <main className="flex-1 p-10 overflow-y-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">About X-Card</h1>
          <p className="text-lg text-gray-700 mb-4">
            X-Card is a modern transaction platform for collectible cards, leveraging NFT technology on the XRP Ledger to ensure authenticity, provenance, and security. Whether you’re buying, selling, or trading, our platform provides a seamless experience for managing both digital and physical collections.
          </p>

          {/* Key Features Section (omitted for brevity) */}

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transform transition"
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-gray-500 text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
