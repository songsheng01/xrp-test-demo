import express from "express";
import { checkOrPromptTrustLine } from "../controllers/trustController.js";

const router = express.Router();

router.post("/check-trust", async (req, res) => {
  const { userAddress, currencyHex } = req.body;

  if (!userAddress || !currencyHex) {
    return res.status(400).json({ error: "Missing parameters." });
  }

  const result = await checkOrPromptTrustLine(userAddress, currencyHex);
  res.json(result);
});

export default router;
