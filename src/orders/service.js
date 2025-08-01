const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
} = require("@aws-sdk/lib-dynamodb");
const { v4: uuid } = require("uuid");
const { success, failure } = require("../utils/response");

// Initialize DynamoDB client and document client
const client = new DynamoDBClient({ region: "us-east-1" }); // replace with your region if different
const dynamo = DynamoDBDocumentClient.from(client);

// Place a new order
module.exports.placeOrder = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const item = {
      id: uuid(),
      productId: body.productId,
      userId: body.userId,
      quantity: body.quantity,
    };

    const command = new PutCommand({
      TableName: process.env.ORDERS_TABLE,
      Item: item,
    });

    await dynamo.send(command);

    return success(item);
  } catch (err) {
    return failure(err.message);
  }
};

// Get an order by ID
module.exports.getOrder = async (event) => {
  try {
    const id = event.pathParameters.id;

    const command = new GetCommand({
      TableName: process.env.ORDERS_TABLE,
      Key: { id },
    });

    const res = await dynamo.send(command);

    return success(res.Item);
  } catch (err) {
    return failure(err.message);
  }
};
