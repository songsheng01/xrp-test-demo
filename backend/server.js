import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import cors from "cors";
import trustRoutes from "./routes/trustRoutes.js";
import tokenTransferRoutes from "./routes/tokenTransferRoutes.js";
import xrpTransferRoutes from "./routes/xrpTransferRoutes.js";
import issuerRoutes from "./routes/issuerRoutes.js";
import testRouter from "./routes/testRoutes.js";
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
app.use("/api", testRouter);

const server = http.createServer(app);
export const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");
  ws.on("close", () => console.log("WebSocket client disconnected"));
});

export const broadcast = (type, payload) => {
  const msg = JSON.stringify({ type, payload });
  console.log("[WS-SEND]", type, "→", wss.clients.size, "clients");
  wss.clients.forEach(c => { if (c.readyState === 1) c.send(msg); });
};

server.listen(PORT, () => console.log(`HTTP & WS listening on ${PORT}`));