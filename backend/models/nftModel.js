import { pool } from "../database/db.js";

/**
 * Saves a newly minted NFT to the system-minted NFT database.
 * @param {string} NFTokenID - The NFT token ID.
 * @param {string} owner - The wallet address of the owner.
 */
export const saveSystemNFT = async (NFTokenID, owner) => {
  const query = `
    INSERT INTO system_nfts (NFTokenID, owner)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [NFTokenID, owner];
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error saving system NFT:", error);
    throw error;
  }
};

/**
 * Retrieves all NFTs minted through our system from the database.
 * @returns {Promise<Array>} - An array of system NFT objects.
 */
export const getAllSystemNFTs = async () => {
    const query = `SELECT NFTokenID FROM system_nfts;`;
    try {
      const result = await pool.query(query);
  
      // Ensure only valid NFT IDs are returned
      return result.rows
        .map((row) => row.nftokenid) // Ensure correct casing
        .filter((id) => id !== null && id !== undefined && id !== ""); // Remove any null/undefined values
    } catch (error) {
      console.error("Error retrieving system NFTs:", error);
      throw error;
    }
  };  
