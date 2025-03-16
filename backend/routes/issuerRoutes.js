import express from "express";
import { setupIssuerWallet } from "../controllers/issuerController.js";
import { searchByType,createNewNft } from "../models/dbOperation.js";

const router = express.Router();

router.post("/setup-issuer", async (req, res) => {
  const result = await setupIssuerWallet();
  res.json(result);
});

export default router;
