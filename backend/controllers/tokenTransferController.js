import xrpl from 'xrpl';
/**
 * Sends tokens (IOUs) from the issuer wallet to a recipient.
 * @param {string} recipient - The recipient's wallet address.
 * @param {string} currencyCode - The token's currency code (e.g., "CRD").
 * @param {string} amount - Amount of tokens to send.
 */
export const sendTokens = async (recipient, currencyHex, amount) => {
  try {
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();

    const issuerWallet = xrpl.Wallet.fromSeed(process.env.ISSUER_SECRET);
    const issuerAddress = issuerWallet.address;

    // Send IOUs from issuer to recipient
    const paymentTx = {
      TransactionType: "Payment",
      Account: issuerAddress,
      Destination: recipient,
      Amount: {
        currency: currencyHex,
        issuer: issuerAddress,
        value: amount,
      },
    };

    const prepared = await client.autofill(paymentTx);
    const signed = issuerWallet.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);

    await client.disconnect();

    if (result.result.meta.TransactionResult !== "tesSUCCESS") {
      throw new Error(`Token transfer failed: ${result.result.meta.TransactionResult}`);
    }

    console.log(`✅ Sent ${amount} ${currencyHex} to ${recipient}`);
    return { success: true, recipient, currencyHex, amount };
  } catch (error) {
    console.error("Error sending tokens:", error);
    return { success: false, error: error.message };
  }
};