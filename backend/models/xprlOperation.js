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
    const { result } = await client.request({
      command:     'tx',
      transaction: txHash,
      binary:      false
    });
    const tx = result;

    if (tx.meta.TransactionResult !== 'tesSUCCESS') {
      return { success: false, error: tx.meta.TransactionResult };
    }

    const matched = tx.meta.AffectedNodes.some(node =>
      node.DeletedNode?.LedgerEntryType === 'Offer'
    );
    if (!matched) {
      return { success: false, error: 'No matching offer was consumed' };
    }

    const time = tx.close_time_iso;
    const id = tx.hash;

    const { TakerPays, TakerGets } = tx.tx_json;
    let currency, amount, price;

    if (typeof TakerPays === 'object') {
      const codeHex = TakerPays.currency;
      currency = codeHex.length === 3
        ? codeHex
        : xrpl.convertHexToString(codeHex).replace(/\0+$/, '');
      amount = parseFloat(TakerPays.value);
      const xrpGot = parseInt(TakerGets, 10) / 1_000_000;
      price  = xrpGot / amount;
    } else {
      const codeHex = TakerGets.currency;
      currency = codeHex.length === 3
        ? codeHex
        : xrpl.convertHexToString(codeHex).replace(/\0+$/, '');
      amount = parseFloat(TakerGets.value);
      const xrpPaid = parseInt(TakerPays, 10) / 1_000_000;
      price  = xrpPaid / amount;
    }

    const initiator = tx.tx_json.Account;
    let buyer, seller;
    // Find the counterparty from a deleted offer node
    const deletedOfferNode = tx.meta.AffectedNodes.find(node => node.DeletedNode?.LedgerEntryType === 'Offer');
    const counterAcct = deletedOfferNode.DeletedNode.PreviousFields.Account;
    if (typeof TakerPays === 'object') {
      // Initiator sold tokens -> initiator is seller, counterparty is buyer
      seller = initiator;
      buyer  = counterAcct;
    } else {
      // Initiator bought tokens -> initiator is buyer, counterparty is seller
      buyer  = initiator;
      seller = counterAcct;
    }

    return { success: true, id, time, currency, amount, price,buyer, seller  };
  } catch (err) {
    return { success: false, error: err.message };
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