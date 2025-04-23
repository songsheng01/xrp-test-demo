import { DynamoDBDocumentClient, PutCommand, QueryCommand, UpdateCommand,DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

async function uploadSellOrder(txn_id,productId, price, quantity, time,buyer,seller) {
  const order_id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const order = {
    order_id,
    txn_id,
    productId,
    price,
    quantity,
    time,
    buyer,
    seller
  };

  const params = {
    TableName: "sell_order",
    Item: order,
  };

  try {
    const command = new PutCommand(params);
    const response = await docClient.send(command);
    console.log("Sell order uploaded:", response);
    return response;
  } catch (error) {
    console.error("Error uploading sell order:", error);
    throw error;
  }
}

export { uploadSellOrder }