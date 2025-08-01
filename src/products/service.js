const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
} = require("@aws-sdk/lib-dynamodb");
const { v4: uuid } = require("uuid");
const { success, failure } = require("../utils/response");

// Create DynamoDB clients
const client = new DynamoDBClient({ region: "us-east-1" }); // Adjust region as needed
const dynamo = DynamoDBDocumentClient.from(client);

// Create a new product
module.exports.createProduct = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const item = {
      id: uuid(),
      name: body.name,
      price: body.price,
    };

    const command = new PutCommand({
      TableName: process.env.PRODUCTS_TABLE,
      Item: item,
    });

    await dynamo.send(command);

    return success(item);
  } catch (err) {
    console.log(err);
    return failure(err.message);
  }
};

// Get product by ID
module.exports.getProduct = async (event) => {
  try {
    const id = event.pathParameters.id;

    const command = new GetCommand({
      TableName: process.env.PRODUCTS_TABLE,
      Key: { id },
    });

    const res = await dynamo.send(command);

    return success(res.Item);
  } catch (err) {
    console.log(err);
    return failure(err.message);
  }
};
