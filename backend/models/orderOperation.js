import { DynamoDBDocumentClient, PutCommand, QueryCommand, UpdateCommand,DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

async function uploadSellOrder(productId, price, quantity, sellerId) {
    const order_id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const order = {
    order_id,
    productId,
    price,
    quantity,
    timestamp: Date.now(),
    sellerId
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

async function buyProduct(productId, desiredQuantity, maxUnitPrice) {
    let remaining = desiredQuantity;
    const purchasedOrders = [];
    let lowestRemainingPrice = null;
  
    const queryParams = {
      TableName: "sell_order",
      IndexName: "productId-price-index",
      KeyConditionExpression: "productId = :pid",
      ExpressionAttributeValues: {
        ":pid": productId
      },
      ScanIndexForward: true
    };
  
    try {
      const queryCommand = new QueryCommand(queryParams);
      const result = await docClient.send(queryCommand);
      const orders = result.Items;
      
      if (!orders || orders.length === 0) {
        console.log("No sell orders found for product:", productId);
        return { purchasedOrders, remaining, lowestRemainingPrice };
      }
  
      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
  
        if (order.price > maxUnitPrice) {
          lowestRemainingPrice = order.price;
          console.log(`Order price ${order.price} exceeds max unit price ${maxUnitPrice}. Stop processing further orders.`);
          break;
        }
  
        if (remaining <= 0) {
          if (!lowestRemainingPrice && i < orders.length) {
            lowestRemainingPrice = order.price;
          }
          break;
        }
  
        // 跳过库存为 0 的订单
        if (order.quantity <= 0) continue;
  
        const available = order.quantity;
        const toBuy = Math.min(available, remaining);
  
        // 如果当前订单库存正好被买完，则删除订单
        if (toBuy === available) {
          const deleteParams = {
            TableName: "sell_order",
            Key: { order_id: order.order_id } // 请确保这里使用的是表中定义的主键字段名
          };
  
          try {
            const deleteCommand = new DeleteCommand(deleteParams);
            await docClient.send(deleteCommand);
            console.log(`Order ${order.order_id} deleted since quantity reached 0, bought ${toBuy} units.`);
            purchasedOrders.push({
              order_id: order.order_id,
              price: order.price,
              quantityBought: toBuy,
              sellerAddr: order.sellerId
            });
            remaining -= toBuy;
          } catch (deleteError) {
            console.error(`Error deleting order ${order.order_id}:`, deleteError);
            continue;
          }
        } else {
          const updateParams = {
            TableName: "sell_order",
            Key: { order_id: order.order_id },
            UpdateExpression: "SET quantity = quantity - :toBuy",
            ConditionExpression: "quantity >= :toBuy",
            ExpressionAttributeValues: {
              ":toBuy": toBuy
            },
            ReturnValues: "UPDATED_NEW"
          };
  
          try {
            const updateCommand = new UpdateCommand(updateParams);
            await docClient.send(updateCommand);
            console.log(`Order ${order.order_id} updated, bought ${toBuy} units.`);
            purchasedOrders.push({
              order_id: order.order_id,
              price: order.price,
              quantityBought: toBuy,
              sellerAddr: order.sellerId
            });
            remaining -= toBuy;
          } catch (updateError) {
            console.error(`Error updating order ${order.order_id}:`, updateError);
            continue;
          }
        }
      }
  
      if (remaining > 0 && !lowestRemainingPrice && orders.length > 0) {
        lowestRemainingPrice = orders[orders.length - 1].price;
      }
  
      if (remaining > 0) {
        console.log("Not enough quantity available to meet desired quantity. Remaining:", remaining);
      }
  
      return { purchasedOrders, remaining, lowestRemainingPrice };
    } catch (error) {
      console.error("Error processing buy order:", error);
      throw error;
    }
  }
  

  export { uploadSellOrder, buyProduct }