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
 * Prepare a sell order (OfferCreate) for the user to sign: they input coin, XRPL amount, and their address.
 * @param {string} userAddress - User's wallet address.
 * @param {string} currency - Code of the coin to sell (e.g., "ABC").
 * @param {number|string} tokenAmount - Amount of currency they will sell.
 * @param {number|string} xrpAmount - Amount of XRPL they will get.
 */
export const prepareSellOffer = async (userAddress, currency,tokenAmount, xrpAmount) => {
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
      Flags: { tfSell: true },
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
 * Prepare a buy order (OfferCreate) for the user to sign: they input coin, token amount, and XRPL spent.
 * @param {string} userAddress - User's wallet address.
 * @param {string} currency - Code of the coin to buy (e.g., "ABC").
 * @param {number|string} tokenAmount - Amount of token they will buy.
 * @param {number|string} xrpAmount - Amount of XRPL they want to spend.
 */
export const prepareBuyOffer = async (userAddress, currency, tokenAmount, xrpAmount) => {
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
    console.log(tokenAmount.toString())
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
    const { result: tx } = await client.request({
      command:     'tx',
      transaction: txHash,
      binary:      false
    });

    if (tx.meta.TransactionResult !== 'tesSUCCESS') {
      return { success: false, error: tx.meta.TransactionResult };
    }

    const offerNodes = tx.meta.AffectedNodes.filter(node =>
      node.DeletedNode?.LedgerEntryType === 'Offer' ||
      node.ModifiedNode?.LedgerEntryType === 'Offer'
    );
    if (!offerNodes.length) {
      return { success: false, error: 'No offers affected in this transaction' };
    }

    const fills = [];
    const initiator = tx.tx_json.Account;

    for (const node of offerNodes) {
      const entry = node.DeletedNode || node.ModifiedNode;
      const prev  = entry.PreviousFields || {};
      const fin   = entry.FinalFields    || {};

      // 安全地解析出成交前后的 XRP drops 与 token 数量
      let prevXrp = 0, finXrp = 0, prevToken = 0, finToken = 0;

      if (prev.TakerPays !== undefined) {
        if (typeof prev.TakerPays === 'string') {
          prevXrp = parseInt(prev.TakerPays, 10);
        } else if (prev.TakerPays.value !== undefined) {
          prevToken = parseFloat(prev.TakerPays.value);
        }
      }
      if (prev.TakerGets !== undefined) {
        if (typeof prev.TakerGets === 'string') {
          prevXrp = parseInt(prev.TakerGets, 10);
        } else if (prev.TakerGets.value !== undefined) {
          prevToken = parseFloat(prev.TakerGets.value);
        }
      }

      if (fin.TakerPays !== undefined) {
        if (typeof fin.TakerPays === 'string') {
          finXrp = parseInt(fin.TakerPays, 10);
        } else if (fin.TakerPays.value !== undefined) {
          finToken = parseFloat(fin.TakerPays.value);
        }
      }
      if (fin.TakerGets !== undefined) {
        if (typeof fin.TakerGets === 'string') {
          finXrp = parseInt(fin.TakerGets, 10);
        } else if (fin.TakerGets.value !== undefined) {
          finToken = parseFloat(fin.TakerGets.value);
        }
      }

      const xrpDeltaDrops = prevXrp - finXrp;
      const tokenDelta    = prevToken - finToken;
      if (tokenDelta <= 0) continue;

      // 解析代币代码（hex → ASCII）
      const { TakerPays, TakerGets } = tx.tx_json;
      const hex = typeof TakerPays === 'object'
        ? TakerPays.currency
        : TakerGets.currency;
      const currency = hex.length === 3
        ? hex
        : xrpl.convertHexToString(hex).replace(/\0+$/, '');

      const xrpAmount   = xrpDeltaDrops / 1_000_000;
      const tokenAmount = tokenDelta;
      const unitPrice   = xrpAmount / tokenAmount;

      // 确定买卖双方
      const maker = entry.FinalFields?.Account || entry.PreviousFields?.Account;
      let buyer, seller;
      if (typeof tx.tx_json.TakerPays === 'object') {
        // taker 支付了代币 → taker 是卖家
        seller = initiator;
        buyer  = maker;
      } else {
        // taker 支付了 XRP → taker 是买家
        buyer  = initiator;
        seller = maker;
      }

      fills.push({ currency, tokenAmount, xrpAmount, unitPrice, buyer, seller });
    }

    // 汇总每种代币的单价
    const pricePerCurrency = {};
    fills.forEach(f => {
      pricePerCurrency[f.currency] = f.unitPrice;
    });

    return {
      success: true,
      id:      tx.hash,
      time:    tx.close_time_iso,
      fills,
      summary: {
        currenciesTraded: Object.keys(pricePerCurrency).length,
        pricePerCurrency
      }
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