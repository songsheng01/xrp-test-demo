import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import cors from "cors";
import tokenTransferRoutes from "./routes/tokenTransferRoutes.js";
import tradeRouter from "./routes/tradeRoutes.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); // Enables JSON request body parsing

// Routes
app.use("/api", tokenTransferRoutes);
app.use("/api", tradeRouter);

app.use("/health",(req,res) =>{
  res.status(200).send("ok");
})
app.get("/healthcheck", (req, res) => {
  res.status(200).send("OK");
});

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