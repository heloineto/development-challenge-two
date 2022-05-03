const tableName = process.env.TABLE_NAME;

const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

exports.getPaginatedPatientsHandler = async (event) => {
  try {
    if (event.httpMethod !== 'GET') {
      throw new Error(
        `getAllPatients only accept GET method, you tried: ${event.httpMethod}`
      );
    }

    console.info('received:', event);

    const { id, limit } = event.pathParameters;

    if (!limit) {
      throw new Error(`Parameter "limit" was not provided.`);
    }

    let params = {
      TableName: tableName,
      Limit: Number(limit),
      ExclusiveStartKey: id != '0' ? id : undefined,
    };

    const data = await docClient.scan(params).promise();

    const response = {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
      },
    };

    console.info(
      `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
    );
    return response;
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
      },
    };
  }
};
