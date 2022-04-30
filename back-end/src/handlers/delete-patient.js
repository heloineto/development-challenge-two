const dynamodb = require('aws-sdk/clients/dynamodb');
const { default: patientSchema } = require('../schemas/patientSchema');
const docClient = new dynamodb.DocumentClient();

const tableName = process.env.TABLE_NAME;

exports.deletePatientHandler = async (event) => {
  if (event.httpMethod !== 'DELETE') {
    throw new Error(
      `postMethod only accepts DELETE method, you tried: ${event.httpMethod} method.`
    );
  }

  console.info('received:', event);

  const id = event.pathParameters.id;

  var params = {
    TableName: tableName,
    Key: { id: id },
  };
  const data = await docClient.delete(params).promise();

  const response = {
    statusCode: 200,
    body: 'Deleted successfully',
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
