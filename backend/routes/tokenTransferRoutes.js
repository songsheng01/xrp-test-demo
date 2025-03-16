import express from "express";
import { sendTokens } from "../controllers/tokenTransferController.js";
import { uploadSellOrder } from "../models/orderOperation.js";

const router = express.Router();

router.post("/send-tokens", async (req, res) => {
  const { recipient, currencyHex, amount } = req.body;

  if (!recipient || !currencyHex || !amount) {
    return res.status(400).json({ error: "Missing parameters." });
  }

  const result = await sendTokens(recipient, currencyHex, amount);
  res.json(result);
});

router.post("/test", async (req, res) => {
  try {
    await uploadSellOrder("S0123", 8,10, "123");
    res.status(200);
  } catch (error){
    console.log(error);
    res.status(500).json(error);
  }
})

export default router;
