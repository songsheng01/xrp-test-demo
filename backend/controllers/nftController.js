import * as xrpl from "xrpl";
import { saveSystemNFT, getAllSystemNFTs } from "../models/nftModel.js";

/**
 * Fetch NFTs minted by our system from the database.
 */
export const getSystemNFTs = async (req, res) => {
  try {
    const systemNFTs = await getAllSystemNFTs();
    res.json({ systemNFTs });
  } catch (error) {
    console.error("Error fetching system NFTs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Mints an NFT using the platform issuer wallet and transfers it to the user's wallet.
 */
export const mintNFT = async (req, res) => {
    const { walletAddress, uri } = req.body;
    if (!walletAddress || !uri) {
      return res.status(400).json({ error: "Missing walletAddress or URI" });
    }
  
    try {
      // Connect to the XRPL testnet
      const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
      await client.connect();
  
      // Load the issuer wallet (centralized platform wallet)
      const issuerWallet = xrpl.Wallet.fromSeed(process.env.ISSUER_SECRET);
  
      // Mint the NFT under the issuer's wallet
      const mintTx = {
        TransactionType: "NFTokenMint",
        Account: issuerWallet.address,
        URI: xrpl.convertStringToHex(uri), // Store NFT metadata URI
        Flags: 8, // Set the NFT as transferable
        NFTokenTaxon: 0, // Arbitrary categorization number
      };
  
      // Submit minting transaction
      const preparedMint = await client.autofill(mintTx);
      const signedMint = issuerWallet.sign(preparedMint);
      const mintResult = await client.submitAndWait(signedMint.tx_blob);
  
      if (mintResult.result.meta.TransactionResult !== "tesSUCCESS") {
        await client.disconnect();
        return res.status(500).json({ error: "NFT minting failed" });
      }
  
      // Fetch the minted NFT Token ID
      const NFTokenID = await getNewestNFT(issuerWallet.address, client);
      if (!NFTokenID) {
        await client.disconnect();
        return res.status(500).json({ error: "Failed to retrieve minted NFT ID" });
      }
  
      // Transfer NFT to the user
      const transferTx = {
        TransactionType: "NFTokenCreateOffer",
        Account: issuerWallet.address,
        NFTokenID: NFTokenID,
        Destination: walletAddress,
        Amount: "0",
        Flags: 1, // Indicates this is a sell offer
      };
  
      const preparedTransfer = await client.autofill(transferTx);
      const signedTransfer = issuerWallet.sign(preparedTransfer);
      const transferResult = await client.submitAndWait(signedTransfer.tx_blob);
  
      await client.disconnect();
  
      if (transferResult.result.meta.TransactionResult !== "tesSUCCESS") {
        return res.status(500).json({ error: "NFT transfer failed" });
      }
  
      // Save NFT as system-minted
      await saveSystemNFT(NFTokenID, walletAddress);
  
      return res.json({ success: true, NFTokenID });
    } catch (error) {
      console.error("Error minting and transferring NFT:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  /**
   * Fetches the most recently minted NFT by the issuer.
   */
  async function getNewestNFT(account, client) {
    try {
      const nftResponse = await client.request({
        command: "account_nfts",
        account: account,
      });
  
      const nfts = nftResponse.result.account_nfts;
      return nfts.length > 0 ? nfts[nfts.length - 1].NFTokenID : null;
    } catch (error) {
      console.error("Error fetching minted NFTs:", error);
      return null;
    }
  }