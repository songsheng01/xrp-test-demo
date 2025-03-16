import express from "express";
import { sendXRP } from "../controllers/xrpTransferController.js";

const router = express.Router();

router.post("/send-xrp", async (req, res) => {
  const { sender, recipient, amount } = req.body;

  if (!sender || !recipient || !amount) {
    return res.status(400).json({ error: "Missing parameters." });
  }

  const result = await sendXRP(sender, recipient, amount);
  res.json(result);
});

export default router;
