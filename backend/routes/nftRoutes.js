import express from "express";
import { mintNFT, getSystemNFTs } from "../controllers/nftController.js";

const router = express.Router();

router.get("/system-nfts", getSystemNFTs);
router.post("/mint-nft", mintNFT); // New minting route

export default router;