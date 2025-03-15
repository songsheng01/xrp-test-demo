import express from "express";
import cors from "cors";
import nftRoutes from "./routes/nftRoutes.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); // Enables JSON request body parsing

// Routes
app.use("/api", nftRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});