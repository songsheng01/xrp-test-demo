// src/pages/LandingPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import background from "../../assets/landing.png";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className="relative h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* 深色遮罩 */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* 内容 */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* 标题 */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4">
          X‑Card
        </h1>

        {/* 副标题 */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-4xl mb-8">
          Discover, collect, and trade digital cards in a seamless Web3 experience.
        </p>

        {/* CTA */}
        <button
          onClick={() => navigate("/marketplace")}
          className="px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold rounded-full
                     shadow-lg hover:from-pink-500 hover:to-orange-400 transition-colors duration-300"
        >
          Explore Marketplace
        </button>
      </motion.div>
    </div>
  );
}
