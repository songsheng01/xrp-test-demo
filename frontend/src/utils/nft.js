import * as xrpl from "xrpl";

/**
 * Fetches all NFTs for a given wallet address from the XRP Ledger.
 * @param {string} walletAddress - The wallet address of the user.
 * @returns {Promise<Array>} - An array of NFT objects.
 */
export async function fetchUserNFTs(walletAddress) {
    try {
        // Connect to the XRP Ledger Testnet
        const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
        await client.connect();
    
        // Request NFTs associated with the wallet address
        const response = await client.request({
          command: "account_nfts",
          account: walletAddress,
        });
    
        await client.disconnect();
        return response.result.account_nfts || []; // Ensure it returns an array
      } catch (error) {
        console.error("Error fetching NFTs from XRP Ledger:", error);
        return []; // Return empty array to avoid breaking the frontend
      }
}

/**
 * Fetches the list of NFT IDs minted through our system from our backend.
 * @returns {Promise<Array>} - An array of system NFT IDs.
 */
export async function fetchSystemNFTIDs() {
  // Call the backend API endpoint that returns system NFT IDs
  const res = await fetch("http://localhost:5001/api/system-nfts");
  const data = await res.json();
  // Expected format: { systemNFTs: [ "NFTID1", "NFTID2", ... ] }
  return data.systemNFTs;
}

/**
 * Fetches only the NFTs that were minted through our system for the given wallet.
 * @param {string} walletAddress - The wallet address of the user.
 * @returns {Promise<Array>} - An array of NFT objects that are part of our system.
 */
export async function fetchUserSystemNFTs(walletAddress) {
  // Get all NFTs from the user's wallet on the XRP Ledger
  const allNFTs = await fetchUserNFTs(walletAddress);
  // Get the list of system minted NFT IDs from the backend
  const systemNFTIDs = await fetchSystemNFTIDs();

  // Filter out NFTs that are not in our system
  const systemNFTs = allNFTs.filter((nft) =>
    systemNFTIDs.includes(nft.NFTokenID)
  );
  return systemNFTs;
}
