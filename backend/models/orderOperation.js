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

async function getHistoryOrder(productId) {
  const params = {
    TableName: "sell_order",
    IndexName: "productId-index",
    KeyConditionExpression: "productId = :pid",
    ExpressionAttributeValues: {
      ":pid": productId,
    },
    ScanIndexForward: true, 
  };

  try {
    const { Items } = await docClient.send(new QueryCommand(params));
    console.log(`Found ${Items.length} orders for productId=${productId}`);
    return Items;
  } catch (err) {
    console.error("Error querying history:", err);
    throw err;
  }
}

export { uploadSellOrder,getHistoryOrder }