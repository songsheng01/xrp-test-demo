import express from "express";
import {prepareBuyOffer,prepareSellOffer,getOrderBook,fetchTransaction} from '../models/xprlOperation.js';
import { uploadSellOrder,getHistoryOrder } from "../models/orderOperation.js";
import { searchByToken, updatePrice } from "../models/dbOperation.js";
import xrpl from "xrpl";

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
        const orderHistory = await getHistoryOrder(currency);
        res.status(200).json({ success: true,currentOffer: cur_offers,orderHistory});
    }catch(error){
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
})

testRouter.post('/transaction', async (req ,res) =>{
    try{
        const {TxHash} = req.body;
        const cur_tx = await fetchTransaction(TxHash);
        let nft_token;
        if(cur_tx.success === true){
            for(const f of cur_tx.fills){
                await uploadSellOrder(cur_tx.id,f.currency,f.xrpAmount/f.tokenAmount,f.tokenAmount,cur_tx.time,f.buyer,f.seller);
                nft_token = xrpl.convertStringToHex(f.currency).padEnd(40, "0").toUpperCase();
                await updatePrice(nft_token,f.xrpAmount/f.tokenAmount);
            }
        }
        res.status(200).json({ success: true,currentTransacton: cur_tx,nft_token});
    }catch(error){
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
})

testRouter.post('/search', async (req,res) =>{
    try {
        const { token } = req.body;
        const response = await searchByToken(token);
        res.status(200).json(response);
    } catch(error){
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
})
export default testRouter;

