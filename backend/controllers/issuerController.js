import xrpl from "xrpl";
import dotenv from "dotenv";

dotenv.config();

/**
 * Sets up the issuer wallet with required XRPL flags (only needs to run once).
 */
export const setupIssuerWallet = async () => {
  try {
    // Connect to XRPL
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();

    // Load issuer wallet (admin wallet)
    const issuerWallet = xrpl.Wallet.fromSeed(process.env.ISSUER_SECRET);
    const issuerAddress = issuerWallet.address;

    console.log(`🔹 Setting up issuer wallet: ${issuerAddress}`);

    // Configure issuer wallet settings
    const accountSetTx = {
      TransactionType: "AccountSet",
      Account: issuerAddress,
      SetFlag: xrpl.AccountSetAsfFlags.asfDefaultRipple, // Enable rippling for issued tokens
    };

    const prepared = await client.autofill(accountSetTx);
    const signed = issuerWallet.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);

    await client.disconnect();

    if (result.result.meta.TransactionResult !== "tesSUCCESS") {
      throw new Error("Failed to enable rippling.");
    }

    console.log(`✅ Issuer wallet is now configured for issuing tokens.`);
    return { success: true, message: "Issuer wallet setup complete." };
  } catch (error) {
    console.error("Error setting up issuer wallet:", error);
    return { success: false, error: error.message };
  }
};
