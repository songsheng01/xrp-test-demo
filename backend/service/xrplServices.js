import xrpl from "xrpl";
import { prepareBuyOffer, prepareSellOffer, getOrderBook, fetchTransaction } from '../models/xprlOperation.js';
import { getHistoryOrder,uploadSellOrder } from "../models/orderOperation.js";
import { updatePrice } from "../models/dbOperation.js";
import { broadcast } from "../server.js";

/**
 * Asks a user to authorize and send XRP to another wallet.
 * @param {string} sender - The sender's wallet address.
 * @param {string} recipient - The recipient's wallet address.
 * @param {string} amount - Amount of XRP to send.
 */
export const sendXRP = async (sender, recipient, amount) => {
  try {
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();

    const paymentTx = {
      TransactionType: "Payment",
      Account: sender,
      Destination: recipient,
      Amount: xrpl.xrpToDrops(amount),
    };

    const prepared = await client.autofill(paymentTx);
    await client.disconnect();

    return { success: true, transaction: prepared };
  } catch (error) {
    console.error("Error preparing XRP transaction:", error);
    return { success: false, error: error.message };
  }
};

export const buySellToken = async (userAddress, currency, tokenAmount, xrpAmount,type)=>{
  let response;
  try{
    if(type === 'buy'){
      response = await prepareBuyOffer(userAddress, currency, tokenAmount, xrpAmount);
    }else{
      response = await prepareSellOffer(userAddress, currency, tokenAmount, xrpAmount);
    }
  } catch(error){
    console.log(error);
    return error;
  }
  return response;
}

export const getAlltransaction = async (currency) =>{
  const cur_offers = await getOrderBook(currency);
  const orderHistory = await getHistoryOrder(currency);
  return {
      cur_offers,
      orderHistory
  };
}

export const getTransactoinDetail = async (TxHash,currency) => {
  const cur_tx = await fetchTransaction(TxHash);
  const cur_offers = await getOrderBook(currency);
  broadcast("DEPTH_UPDATE", {               // new/changed depth
    currency,
    sellOffers: cur_offers.sellOffers,
    buyOffers: cur_offers.buyOffers
  });
  if (cur_tx.success && cur_tx.fills.length) {
    cur_tx.fills.forEach(fill => {
      broadcast("ORDER_FILLED", {            // trade
        time: cur_tx.time,
        fill
      });
    });
  };
  if(cur_tx.success === true){
    for(const f of cur_tx.fills){
      await uploadSellOrder(cur_tx.id,f.currency,f.xrpAmount/f.tokenAmount,f.tokenAmount,cur_tx.time,f.buyer,f.seller);
      nft_token = xrpl.convertStringToHex(f.currency).padEnd(40, "0").toUpperCase();
      await updatePrice(nft_token,f.xrpAmount/f.tokenAmount);
    }
  }
  return cur_tx;
}