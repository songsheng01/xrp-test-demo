import xrpl from "xrpl";
import dotenv from "dotenv";

dotenv.config();

/**
 * Sets up the issuer wallet with required XRPL flags (only needs to run once).
 */
export const setupIssuerAccount = async () => {
  try {
    // Connect to XRPL
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();

    // Load issuer wallet (admin wallet)
    const issuerWallet = xrpl.Wallet.fromSeed(process.env.ISSUER_SECRET);
    const issuerAddress = issuerWallet.address;

    console.log(`🔹 Setting up issuer account: ${issuerAddress}`);

    // Configure issuer account settings
    const accountSetTx = {
      TransactionType: "AccountSet",
      Account: issuerAddress,
      SetFlag: xrpl.AccountSetAsfFlags.asfDefaultRipple, // Enable rippling for issued tokens
    };

    const preparedAccountSet = await client.autofill(accountSetTx);
    const signedAccountSet = issuerWallet.sign(preparedAccountSet);
    const accountSetResult = await client.submitAndWait(signedAccountSet.tx_blob);

    await client.disconnect();

    if (accountSetResult.result.meta.TransactionResult !== "tesSUCCESS") {
      throw new Error("Failed to set issuer account flags.");
    }

    console.log(`✅ Issuer account setup complete.`);
    return { success: true, message: "Issuer account configured successfully." };
  } catch (error) {
    console.error("Error setting up issuer account:", error);
    return { success: false, error: error.message };
  }
};
