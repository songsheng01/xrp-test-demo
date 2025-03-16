import express from "express";
import cors from "cors";
import trustRoutes from "./routes/trustRoutes.js";
import tokenTransferRoutes from "./routes/tokenTransferRoutes.js";
import xrpTransferRoutes from "./routes/xrpTransferRoutes.js";
import issuerRoutes from "./routes/issuerRoutes.js";
import { createNewNft, addExisitsNft, deleteRandomNft,updatePrice,scanAll } from "./models/dbOperation.js"
import { uploadSellOrder, buyProduct } from "./models/orderOperation.js"
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); // Enables JSON request body parsing

// Routes
app.use("/api", trustRoutes);
app.use("/api", tokenTransferRoutes);
app.use("/api", xrpTransferRoutes);
app.use("/api", issuerRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});