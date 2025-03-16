import express from "express";
import { setupIssuerAccount } from "../controllers/accountController.js";

const router = express.Router();

router.post("/setup-issuer", async (req, res) => {
  const result = await setupIssuerAccount();
  res.json(result);
});

export default router;