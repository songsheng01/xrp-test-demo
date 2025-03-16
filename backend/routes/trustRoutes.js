import express from "express";
import { checkOrPromptTrustLine } from "../controllers/trustController.js";

const router = express.Router();

router.get("/check-trust", async (req, res) => {
  const { userAddress, currencyCode } = req.query;

  if (!userAddress || !currencyCode) {
    return res.status(400).json({ error: "Missing parameters." });
  }

  const result = await checkOrPromptTrustLine(userAddress, currencyCode);
  res.json(result);
});

export default router;
