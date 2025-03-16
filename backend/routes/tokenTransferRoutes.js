import express from "express";
import { sendTokens } from "../controllers/tokenTransferController.js";

const router = express.Router();

router.post("/send-tokens", async (req, res) => {
  const { recipient, currencyHex, amount } = req.body;

  if (!recipient || !currencyHex || !amount) {
    return res.status(400).json({ error: "Missing parameters." });
  }

  const result = await sendTokens(recipient, currencyHex, amount);
  res.json(result);
});

export default router;
