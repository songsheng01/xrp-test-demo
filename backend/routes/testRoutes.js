import express from "express";
import { prepareBuyOffer, prepareSellOffer, getOrderBook, fetchTransaction } from '../models/xprlOperation.js';
import { uploadSellOrder, getHistoryOrder } from "../models/orderOperation.js";
import { searchByToken, updatePrice } from "../models/dbOperation.js";
import { broadcast } from "../server.js";
import * as xrpl from "xrpl";

const testRouter = express.Router();

testRouter.post('/buy', async (req, res) => {
    try {
        const { userAddress, currency, tokenAmount, xrpAmount } = req.body;
        const response = await prepareBuyOffer(userAddress, currency, tokenAmount, xrpAmount);
        res.status(200).json({ success: true, response: response });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
})

testRouter.post('/sell', async (req, res) => {
    try {
        const { userAddress, currency, tokenAmount, xrpAmount } = req.body;
        const response = await prepareSellOffer(userAddress, currency, tokenAmount, xrpAmount);
        res.status(200).json({ success: true, response: response });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
})

testRouter.post('/offers', async (req, res) => {
    try {
        const { currency } = req.body;
        const cur_offers = await getOrderBook(currency);
        const orderHistory = await getHistoryOrder(currency);
        res.status(200).json({ success: true, currentOffer: cur_offers, orderHistory });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
})

testRouter.post('/transaction', async (req, res) => {
    try {
        const { TxHash } = req.body;
        const cur_tx = await fetchTransaction(TxHash);

        const currency = "TESTHPS"; // update later

        /* always pull a fresh order-book snapshot so the client sees its resting limit right away */
        const cur_offers = await getOrderBook(currency);

        broadcast("DEPTH_UPDATE", {               // new/changed depth
            currency,
            sellOffers: cur_offers.sellOffers,
            buyOffers: cur_offers.buyOffers
        });

        /* if this tx actually executed against another offer,
           fills[] will be non-empty → push trade event        */
        if (cur_tx.success && cur_tx.fills.length) {
            cur_tx.fills.forEach(fill => {
                broadcast("ORDER_FILLED", {            // trade
                    time: cur_tx.time,
                    fill
                });
            });
        }

        res.status(200).json({ success: true, currentTransacton: cur_tx });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
})

testRouter.post('/search', async (req, res) => {
    try {
        const { token } = req.body;
        const response = await searchByToken(token);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
})
export default testRouter;

