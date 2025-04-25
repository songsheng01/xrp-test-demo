import { DynamoDBDocumentClient, QueryCommand,ScanCommand,GetCommand,DeleteCommand,UpdateCommand} from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

async function createNewNft(token,type,pic_adr,pcs,price,name) {
    
    let newNFT  = {
        nft_token : {S: String(token)},
        name: {S:String(name)},
        type : {S: String(type).toLowerCase()},
        pcs_list : { L : [ { S: String(pcs) } ] },
        picture : {S : String(pic_adr)},
        price_rate: { N: String(price / 1000) } 
    }
    const params = {
        TableName:"xprl_nft_table",
        Item: newNFT
    }
    try {
        const command = new PutItemCommand(params);
        const response = await client.send(command);
        return response;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

async function addExisitsNft(nft_token,pcs){
    const params = {
        TableName: "xprl_nft_table",
        Key: {
            nft_token:  String(nft_token)
        },
        UpdateExpression: "SET pcs_list = list_append(if_not_exists(pcs_list, :emptyList), :newPCS_list)",
        ExpressionAttributeValues: {
            ":newPCS_list": [ pcs ],
            ":emptyList": []
        },
        ReturnValues: "ALL_NEW"
    };
    try{
        const command = new UpdateCommand(params);
        const response = await docClient.send(command);
        return response;
    } catch (error){
        console.error("Error updating item:", error);
        throw error;
    }
}

async function deleteRandomNft(nft_token) {
    try {
      const getParams = {
        TableName: "xprl_nft_table",
        Key: { nft_token: nft_token }
      };
      const getCommand = new GetCommand(getParams);
      const data = await docClient.send(getCommand);
      
      if (!data.Item) {
        throw new Error("NFT record not found");
      }
  
      let nft_list = data.Item.pcs_list || [];
      if (nft_list.length === 0) {
        console.log("nft_list is empty, cannot delete any element");
        return { message: "nft_list is empty, no deletion performed" };
      }

      const indexToRemove = Math.floor(Math.random() * nft_list.length);
      const ret = nft_list[indexToRemove];
      nft_list.splice(indexToRemove, 1);

      const updateParams = {
        TableName: "xprl_nft_table",
        Key: { nft_token: nft_token },
        UpdateExpression: "SET pcs_list = :pcs_list",
        ExpressionAttributeValues: {
          ":pcs_list": nft_list
        },
        ReturnValues: "UPDATED_NEW"
      };
      const updateCommand = new UpdateCommand(updateParams);
      const response = await docClient.send(updateCommand);
      return ret;
    } catch (error) {
      console.error("Error deleting an element from nft_list:", error);
      throw error;
    }
}

async function updatePrice(nft_token, newPrice) {
  const getParams = {
    TableName: 'xprl_nft_table',
    Key: { nft_token: String(nft_token) },
    ProjectionExpression: 'price_rate'
  };

  const { Item } = await docClient.send(new GetCommand(getParams));
  if (!Item) throw new Error('NFT token not found');

  const currentPrice = Number(Item.price_rate);
  const priceDiff    = newPrice - currentPrice;
  const pricePct     = currentPrice === 0 ? 0 : priceDiff / currentPrice;

  const updateParams = {
    TableName: 'xprl_nft_table',
    Key: { nft_token: String(nft_token) },
    UpdateExpression: `
      SET price_rate = :newPrice,
          price_pct  = :pricePct
    `,
    ExpressionAttributeValues: {
      ':newPrice': newPrice,
      ':pricePct':  pricePct
    },
    ReturnValues: 'ALL_NEW'
  };

  try {
    const { Attributes: updatedItem } =
      await docClient.send(new UpdateCommand(updateParams));
    return { updatedItem, priceDiff, pricePct };
  } catch (err) {
    console.error('Error updating price:', err);
    throw err;
  }
}

async function scanAll() {
    const params = {
        TableName: "xprl_nft_table"
    };

    try {
        const command = new ScanCommand(params);
        const response = await docClient.send(command);
        return response.Items;
    } catch (error) {
        console.error("Error scanning table:", error);
        throw error;
    }
}

async function searchByType(type) {
  const params = {
    TableName: "xprl_nft_table",
    IndexName: "type-index",
    KeyConditionExpression: "#t = :p",
    ExpressionAttributeNames: {
      "#t": "type"
    },
    ExpressionAttributeValues: {
      ":p": String(type.toLowerCase())
    }
  };

  try {
    const command = new QueryCommand(params);
    const response = await docClient.send(command);
    return response.Items;
  } catch (error) {
    console.error("Error getting card Info:", error);
    throw error;
  }
}

async function searchByToken(nft_token) {
  const params = {
    TableName: "xprl_nft_table",
    Key: { nft_token: String(nft_token) }
  };

  try {
    const command = new GetCommand(params);
    const { Item } = await docClient.send(command);
    return Item ?? null;          // 未找到时返回 null
  } catch (error) {
    console.error("Error fetching NFT by token:", error);
    throw error;
  }
}

export { createNewNft, addExisitsNft, deleteRandomNft,updatePrice,scanAll,searchByType,searchByToken }