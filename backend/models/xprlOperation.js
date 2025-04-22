import xrpl from "xrpl";
import dotenv from "dotenv";

dotenv.config();

const issuerWallet = xrpl.Wallet.fromSeed(process.env.ISSUER_SECRET);
const issuerAddress = issuerWallet.address;

/**
 * Checks if a wallet has a trust line with the issuer.
 * If not, provides a transaction template for the user to sign.
 * @param {string} userAddress - The user's wallet address.
 * @param {string} currency - The token's currency code (e.g., "ABC").
 */
export const checkOrPromptTrustLine = async (userAddress, currency) => {
  const client = new xrpl.Client(process.env.XRPL_ENDPOINT);
  await client.connect();
  try {
    const response = await client.request({ command: "account_lines", account: userAddress });
    const hasTrustLine = response.result.lines.some(
      (line) => line.currency === currency && line.account === issuerAddress
    );
    if (hasTrustLine) {
      await client.disconnect();
      return { success: true, hasTrustLine: true };
    }
    const trustSetTx = {
      TransactionType: "TrustSet",
      Account: userAddress,
      LimitAmount: { currency, issuer: issuerAddress, value: "10000000" }
    };
    const prepared = await client.autofill(trustSetTx);
    await client.disconnect();
    return { success: true, hasTrustLine: false, trustTransaction: prepared };
  } catch (error) {
    await client.disconnect();
    return { success: false, error: error.message };
  }
};

/**
 * Prepare a buy order (OfferCreate) for the user to sign: they input coin, XRPL amount, and their address.
 * @param {string} userAddress - User's wallet address.
 * @param {string} currency - Code of the coin to buy (e.g., "ABC").
 * @param {number|string} tokenAmount - Amount of currency they will buy.
 * @param {number|string} xrpAmount - Amount of XRPL they will spend.
 */
export const prepareBuyOffer = async (userAddress, currency,tokenAmount, xrpAmount) => {
  const client = new xrpl.Client(process.env.XRPL_ENDPOINT);
  await client.connect();

  try {
    let currencyField;
    if (currency.length === 3) {
      currencyField = currency.toUpperCase();
    } else {
      currencyField = xrpl.convertStringToHex(currency)
                        .padEnd(40, "0")
                        .toUpperCase();
    }
    const { hasTrustLine, trustTransaction } =
      await checkOrPromptTrustLine(userAddress, currencyField);
    if (!hasTrustLine) {
      await client.disconnect();
      return { success: true, needsTrust: true, trustTransaction };
    }
    const tx = {
      TransactionType: "OfferCreate",
      Account: userAddress,
      TakerPays: xrpl.xrpToDrops(xrpAmount.toString()),
      TakerGets: { currency:currencyField, issuer: issuerAddress, value: tokenAmount.toString() }
    };
    const prepared = await client.autofill(tx);
    await client.disconnect();
    return { success: true, needsTrust: false, offerTransaction: prepared };
  } catch (error) {
    await client.disconnect();
    return { success: false, error: error.message };
  }
};

/**
 * Prepare a sell order (OfferCreate) for the user to sign: they input coin, token amount, and desired XRPL.
 * @param {string} userAddress - User's wallet address.
 * @param {string} currency - Code of the coin to sell (e.g., "ABC").
 * @param {number|string} tokenAmount - Amount of token they will sell.
 * @param {number|string} xrpAmount - Amount of XRPL they want to receive.
 */
export const prepareSellOffer = async (userAddress, currency, tokenAmount, xrpAmount) => {
  const client = new xrpl.Client(process.env.XRPL_ENDPOINT);
  await client.connect();
  try {
    let currencyField;
    if (currency.length === 3) {
      currencyField = currency.toUpperCase();
    } else {
      currencyField = xrpl.convertStringToHex(currency)
                        .padEnd(40, "0")
                        .toUpperCase();
    }
    // Ensure user has trust line to hold token
    const { hasTrustLine, trustTransaction } =
      await checkOrPromptTrustLine(userAddress, currencyField);
    if (!hasTrustLine) {
      await client.disconnect();
      return { success: true, needsTrust: true, trustTransaction };
    }
    const tx = {
      TransactionType: "OfferCreate",
      Account: userAddress,
      TakerPays: { currency:currencyField, issuer: issuerAddress, value: tokenAmount.toString() },
      TakerGets: xrpl.xrpToDrops(xrpAmount.toString())
    };
    const prepared = await client.autofill(tx);
    await client.disconnect();
    return { success: true, needsTrust: false, offerTransaction: prepared };
  } catch (error) {
    await client.disconnect();
    return { success: false, error: error.message };
  }
};

export async function fetchTransaction(txHash) {
  const client = new xrpl.Client(process.env.XRPL_ENDPOINT);
  await client.connect();

  try {
    // 1. 获取交易详情
    const { result: tx } = await client.request({
      command:     'tx',
      transaction: txHash,
      binary:      false
    });

    // 2. 检查交易是否成功
    if (tx.meta.TransactionResult !== 'tesSUCCESS') {
      return { success: false, error: tx.meta.TransactionResult };
    }

    // 3. 收集所有被删除或修改的挂单节点
    const offerNodes = tx.meta.AffectedNodes.filter(node =>
      node.DeletedNode?.LedgerEntryType === 'Offer' ||
      node.ModifiedNode?.LedgerEntryType === 'Offer'
    );
    if (offerNodes.length === 0) {
      return { success: false, error: 'No offers affected in this transaction' };
    }

    const fills = [];
    const initiator = tx.tx_json.Account;
    const { TakerPays, TakerGets } = tx.tx_json;

    // Helper: parse drops (XRP) or token values
    const parsePays = (f) => f ? (typeof f === 'object' ? parseInt(f.value, 10) : parseInt(f, 10)) : 0;
    const parseGets = (f) => f ? (typeof f === 'object' ? parseFloat(f.value) : parseFloat(f)) : 0;

    // 4. 遍历节点，计算成交信息
    for (const node of offerNodes) {
      const isDeleted = !!node.DeletedNode;
      const entry     = isDeleted ? node.DeletedNode : node.ModifiedNode;
      const prev      = entry.PreviousFields || {};
      const fin       = entry.FinalFields    || {};

      // 4.1 计算差值
      const prevPaysVal = parsePays(prev.TakerPays ?? prev.TakerGets);
      const finPaysVal  = parsePays(fin.TakerPays  ?? fin.TakerGets);
      const prevGetsVal = parseGets(prev.TakerGets  ?? prev.TakerPays);
      const finGetsVal  = parseGets(fin.TakerGets   ?? fin.TakerPays);

      const xrpDelta   = prevPaysVal - finPaysVal;     // drops
      const tokenDelta = prevGetsVal - finGetsVal;     // token units

      // 跳过无成交
      if (tokenDelta <= 0) continue;

      // 4.2 解析代币种类
      let currency;
      if (typeof TakerPays === 'object') {
        const hex = TakerPays.currency;
        currency = hex.length === 3
          ? hex
          : xrpl.convertHexToString(hex).replace(/\0+$/, '');
      } else {
        const hex = TakerGets.currency;
        currency = hex.length === 3
          ? hex
          : xrpl.convertHexToString(hex).replace(/\0+$/, '');
      }

      // 4.3 计算数值
      const xrpAmount = xrpDelta / 1_000_000;           // 买方支付的 XRP 数量
      const tokenAmount = tokenDelta;                   // 卖方支付的代币数量
      const tokenValueInXRP = xrpAmount / tokenAmount;  // 每个代币价值多少 XRP

      // 4.4 确定买卖双方：买家支付 XRP，卖家支付代币
      const owner = entry.FinalFields.Account;
      let buyer, seller;
      if (typeof TakerPays === 'object') {
        // 发起方卖代币，owner 是买家
        seller = initiator;
        buyer  = owner;
      } else {
        // 发起方买代币，owner 是卖家
        buyer  = initiator;
        seller = owner;
      }

      fills.push({
        currency,         // 代币种类
        tokenAmount,      // 卖方付出的代币数量
        xrpAmount,        // 买方付出的 XRP 数量
        tokenValueInXRP,  // 每个代币价值多少 XRP
        buyer,
        seller
      });
    }

    return {
      success: true,
      id:      tx.hash,
      time:    tx.close_time_iso,
      fills
    };
  } catch (error) {
    return { success: false, error: error.message };
  } finally {
    await client.disconnect();
  }
}



/**
 * @param {string} currencyCode  货币代码，如 "XRP"、"USD" 或 "TEST"
 * @param {number} limit         拉取深度
 */
export const getOrderBook = async (currencyCode, limit = 50) => {
  const client = new xrpl.Client(process.env.XRPL_ENDPOINT);
  await client.connect();

  let currencyField;
  if (currencyCode.length === 3) {
    currencyField = currencyCode.toUpperCase();
  } else {
    currencyField = xrpl.convertStringToHex(currencyCode)
                       .padEnd(40, "0")
                       .toUpperCase();
  }

  try {
    const sellRes = await client.request({
      command:   "book_offers",
      taker_gets: { currency: currencyField, issuer: issuerAddress },
      taker_pays: { currency: "XRP" },
      limit
    });

    const buyRes  = await client.request({
      command:   "book_offers",
      taker_gets: { currency: "XRP" },
      taker_pays: { currency: currencyField, issuer: issuerAddress },
      limit
    });

    await client.disconnect();
    return {
      success:    true,
      sellOffers: sellRes.result.offers,
      buyOffers:  buyRes.result.offers
    };
  } catch (error) {
    await client.disconnect();
    return {
      success: false,
      error:   error.message
    };
  }
};