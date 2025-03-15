import React, { useContext, useEffect, useState } from "react";
import { WalletContext } from "../context/WalletContext";
import { fetchUserSystemNFTs } from "../utils/nft";

const CollectionPage = () => {
  const { walletAddress } = useContext(WalletContext);
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [minting, setMinting] = useState(false);

  useEffect(() => {
    if (walletAddress) {
      loadNFTs();
    }
  }, [walletAddress]);

  const loadNFTs = async () => {
    setLoading(true);
    try {
      const userNFTs = await fetchUserSystemNFTs(walletAddress);
      if (userNFTs && userNFTs.length > 0) {
        setNfts(userNFTs);
      } else {
        console.log("No system-minted NFTs found for this user.");
        setNfts([]); // Ensure empty state is handled properly
      }
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    }
    setLoading(false);
  };

  const mintNFT = async () => {
    setMinting(true);
    try {
      const response = await fetch("http://localhost:5001/api/mint-nft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress,
          uri: "QmExampleNFTMetadataHash", // Replace with actual metadata hash
        }),
      });
  
      const data = await response.json();
      if (data.success) {
        alert(`NFT Minted! ID: ${data.NFTokenID}`);
        loadNFTs(); // Reload the collection
      } else {
        alert("Minting failed");
      }
    } catch (error) {
      console.error("Error minting NFT:", error);
      alert("Error minting NFT.");
    }
    setMinting(false);
  };  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Your NFT Collection</h1>

      {!walletAddress ? (
        <p className="mt-4">Please connect your wallet first.</p>
      ) : (
        <>
          <button
            onClick={mintNFT}
            disabled={minting}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            {minting ? "Minting..." : "Mint NFT"}
          </button>

          {loading ? (
            <p className="mt-4">Loading NFTs...</p>
          ) : nfts.length === 0 ? (
            <p className="mt-4">No NFTs found.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {nfts.map((nft) => (
                <div key={nft.NFTokenID} className="border p-4 rounded">
                  <p className="font-semibold">NFT ID: {nft.NFTokenID}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CollectionPage;