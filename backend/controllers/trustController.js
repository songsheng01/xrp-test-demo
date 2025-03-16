import xrpl from "xrpl";
import dotenv from "dotenv";

dotenv.config();

/**
 * Checks if a wallet has a trust line with the issuer.
 * If not, provides a transaction template for the user to sign.
 * @param {string} userAddress - The user's wallet address.
 * @param {string} currencyCode - The token's currency code (e.g., "CRD").
 */
export const checkOrPromptTrustLine = async (userAddress, currencyCode) => {
  try {
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();

    const issuerAddress = process.env.ISSUER_ADDRESS;
    const currencyHex = xrpl.convertStringToHex(currencyCode).padEnd(40, "0");

    // Fetch user's trust lines
    const response = await client.request({
      command: "account_lines",
      account: userAddress,
    });

    const hasTrustLine = response.result.lines.some(
      (line) => line.currency === currencyHex && line.account === issuerAddress
    );

    if (hasTrustLine) {
      await client.disconnect();
      return { success: true, hasTrustLine: true, message: "Trust line already exists." };
    }

    console.log(`🔹 Trust line not found for ${userAddress}. Prompting user to approve.`);

    // Create a TrustSet transaction template for user to sign
    const trustSetTx = {
      TransactionType: "TrustSet",
      Account: userAddress, // Must be signed by the user
      LimitAmount: {
        currency: currencyHex,
        issuer: issuerAddress,
        value: "1000000000", // Arbitrary large limit
      },
    };

    const prepared = await client.autofill(trustSetTx);
    await client.disconnect();

    return { success: true, hasTrustLine: false, transaction: prepared };
  } catch (error) {
    console.error("Error checking trust line:", error);
    return { success: false, error: error.message };
  }
};
