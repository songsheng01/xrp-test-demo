import xrpl from "xrpl";
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
