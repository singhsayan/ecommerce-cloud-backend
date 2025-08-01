const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
} = require("@aws-sdk/lib-dynamodb");
const { v4: uuid } = require("uuid");
const { success, failure } = require("../utils/response");

// Initialize DynamoDB client
const client = new DynamoDBClient({ region: "us-east-1" }); // Change to your AWS region
const dynamo = DynamoDBDocumentClient.from(client);

// Register a new user
module.exports.registerUser = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const user = {
      id: uuid(),
      name: body.name,
      email: body.email,
    };

    const command = new PutCommand({
      TableName: process.env.USERS_TABLE,
      Item: user,
    });

    await dynamo.send(command);

    return success(user);
  } catch (err) {
    return failure(err.message);
  }
};

// Get user by ID
module.exports.getUser = async (event) => {
  try {
    const id = event.pathParameters.id;

    const command = new GetCommand({
      TableName: process.env.USERS_TABLE,
      Key: { id },
    });

    const res = await dynamo.send(command);

    return success(res.Item);
  } catch (err) {
    return failure(err.message);
  }
};
