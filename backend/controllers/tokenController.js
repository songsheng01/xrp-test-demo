import xrpl from "xrpl";
import dotenv from "dotenv";

dotenv.config();

export const issueToken = async (currencyCode, amount, recipient) => {
    try {
      if (currencyCode.length !== 3) {
        throw new Error("Currency code must be exactly 3 characters.");
      }
  
      // Connect to XRPL
      const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
      await client.connect();
  
      // Load issuer wallet
      const issuerWallet = xrpl.Wallet.fromSeed(process.env.ISSUER_SECRET);
      const issuerAddress = issuerWallet.address;
  
      // Convert currency code to XRPL hex format
      const currencyHex = xrpl.convertStringToHex(currencyCode).padEnd(40, "0");
  
      console.log(`Issuing token ${currencyCode} (${currencyHex}) from issuer: ${issuerAddress} to ${recipient}`);
  
      // Step 1: Ensure the recipient has set up a trust line
      const trustSetTx = {
        TransactionType: "TrustSet",
        Account: recipient, // Recipient wallet
        LimitAmount: {
          currency: currencyHex,
          issuer: issuerAddress,
          value: amount, // Max amount recipient can hold
        },
      };
  
      console.log(`🔹 Waiting for recipient (${recipient}) to set trust line for ${currencyCode}`);
  
      // Step 2: Issue and send tokens (issuer → recipient)
      const paymentTx = {
        TransactionType: "Payment",
        Account: issuerAddress, // Issuer (admin wallet)
        Destination: recipient, // The recipient
        Amount: {
          currency: currencyHex,
          issuer: issuerAddress,
          value: amount, // Amount to transfer
        },
      };
  
      const preparedPayment = await client.autofill(paymentTx);
      const signedPayment = issuerWallet.sign(preparedPayment);
      const paymentResult = await client.submitAndWait(signedPayment.tx_blob);
  
      await client.disconnect();
  
      if (paymentResult.result.meta.TransactionResult !== "tesSUCCESS") {
        throw new Error(`Token issuance failed: ${paymentResult.result.meta.TransactionResult}`);
      }
  
      console.log(`✅ Token ${currencyCode} issued and transferred to ${recipient}`);
      return { success: true, currencyCode, amount, recipient };
    } catch (error) {
      console.error("Error issuing token:", error);
      return { success: false, error: error.message };
    }
  };
  