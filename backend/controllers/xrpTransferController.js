import {buySellToken,getAlltransaction,getTransactoinDetail} from "../service/xrplServices.js";

export const buyController = async (req, res)=>{
  try {
    const { userAddress, currency, tokenAmount, xrpAmount } = req.body;
    const response = await buySellToken(userAddress, currency, tokenAmount, xrpAmount,"buy");
    res.status(200).json({ success: true, response: response });
  }catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const sellController = async (req, res)=>{
  try {
    const { userAddress, currency, tokenAmount, xrpAmount } = req.body;
    const response = await buySellToken(userAddress, currency, tokenAmount, xrpAmount,"sell");
    res.status(200).json({ success: true, response: response });
  }catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const queryOfferController = async (req, res) =>{
  try{
    const { currency } = req.body;
    const {cur_offers,orderHistory} = await getAlltransaction(currency);
    res.status(200).json({ success: true, currentOffer: cur_offers, orderHistory });
  }catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const transController = async (req,res) =>{
  try{
    // const { TxHash,currency } = req.body; 后续应该用这个
    const { TxHash } = req.body;
    const currency = "TESTHPS"; //后续删除
    const {cur_tx} = getTransactoinDetail(TxHash,currency);
    res.status(200).json({ success: true, currentTransacton: cur_tx });
  }catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
} 
export default {sellController,buyController,queryOfferController,transController};