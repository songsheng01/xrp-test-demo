import express from "express";
import {prepareBuyOffer,prepareSellOffer,getOrderBook,fetchTransaction} from '../models/xprlOperation.js';
import { uploadSellOrder } from "../models/orderOperation.js";
const testRouter = express.Router();

testRouter.post('/buy', async (req ,res) =>{
    try{
        const {userAddress, currency, tokenAmount, xrpAmount} = req.body;
        const response = await prepareSellOffer(userAddress, currency, tokenAmount, xrpAmount);
        res.status(200).json({ success: true,response:response});
    }catch(error){
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
})

testRouter.post('/sell', async (req ,res) =>{
    try{
        const {userAddress, currency, tokenAmount, xrpAmount} = req.body;
        const response = await prepareBuyOffer(userAddress, currency, tokenAmount, xrpAmount);
        res.status(200).json({ success: true,response:response});
    }catch(error){
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
})

testRouter.post('/offers', async (req ,res) =>{
    try{
        const {currency} = req.body;
        const cur_offers = await getOrderBook(currency);
        res.status(200).json({ success: true,currentOffer: cur_offers});
    }catch(error){
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
})

testRouter.post('/transaction', async (req ,res) =>{
    try{
        const {TxHash} = req.body;
        const cur_tx = await fetchTransaction(TxHash);
        if(cur_tx.success === true){
            // for(f in cur_tx.fills){
            //     await uploadSellOrder(cur_tx.id,cur_tx.currency,cur_tx.price,cur_tx.amount,cur_tx.time,cur_tx.buyer,cur_tx.seller);
            // }
        }
        res.status(200).json({ success: true,currentTransacton: cur_tx});
    }catch(error){
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
})

export default testRouter;

