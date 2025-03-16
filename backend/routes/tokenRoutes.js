import express from "express";
import { issueToken } from "../controllers/tokenController.js";

const router = express.Router();

router.post("/issue-token", async (req, res) => {
  const { currencyCode, amount, recipient } = req.body;

  if (!currencyCode || !amount || !recipient) {
    return res.status(400).json({ error: "Missing required parameters." });
  }

  const result = await issueToken(currencyCode, amount, recipient);
  res.json(result);
});

export default router;
