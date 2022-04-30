const tableName = process.env.TABLE_NAME;

const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

exports.getAllPatientsHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(
      `getAllPatients only accept GET method, you tried: ${event.httpMethod}`
    );
  }

  console.info('received:', event);

  let params = { TableName: tableName };

  const data = await docClient.scan(params).promise();
  const patients = data.Items;

  const response = {
    statusCode: 200,
    body: JSON.stringify(patients),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
    },
  };

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
