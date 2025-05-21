import express from "express";
import xrpTransferController from "../controllers/xrpTransferController.js";

const tradeRouter = express.Router();

tradeRouter.post('/buy', xrpTransferController.buyController);
tradeRouter.post('/sell', xrpTransferController.sellController);
tradeRouter.post('/offers', xrpTransferController.queryOfferController);
tradeRouter.post('/transaction',xrpTransferController.transController);

export default tradeRouter;

