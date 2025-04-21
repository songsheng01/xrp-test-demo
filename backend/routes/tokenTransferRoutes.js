import express from "express";
import { sendTokens } from "../controllers/tokenTransferController.js";
import { createNewNft, addExisitsNft, deleteRandomNft,updatePrice,scanAll,searchByType } from "../models/dbOperation.js";
import xrpl from 'xrpl';
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

function generateCurrencyHex(currencyCode) {
  return xrpl.convertStringToHex(currencyCode).padEnd(40, "0").toUpperCase();
}

router.post("/create", async (req, res) => {
  const { recipient, type, pcs } = req.body;

  if (!recipient || !type || !pcs) {
    return res.status(400).json({ error: "Missing parameters." });
  }

  const terms = await searchByType(type);
  let result;
  if(terms.length == 0){
    const token = generateCurrencyHex("TESTHPS");
    console.log(token);
    await createNewNft(token,type,"https://test.com",pcs,-1);
    result = await sendTokens(recipient, token, "1000");
  } else {
    const token = generateCurrencyHex("TESTHPS");
    console.log(token);
    // await addExisitsNft(terms[0].nft_token,pcs);
    result = await sendTokens(recipient, terms[0].nft_token, "1000");
  }
  res.json(result);
});

router.post("/burn",async (req,res) => {
  const {token} = req.body;
  try {
    const removed_pcs = await deleteRandomNft(token);
    res.status(200).json({removed:removed_pcs});
  }catch(error){
    console.error("Error uploading sold order:", error);
    throw error;
  }
});

export default router;
