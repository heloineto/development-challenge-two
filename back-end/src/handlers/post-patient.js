const dynamodb = require('aws-sdk/clients/dynamodb');
const patientSchema = require('../schemas/patientSchema');
const docClient = new dynamodb.DocumentClient();

const tableName = process.env.TABLE_NAME;

function generateId() {
  var ts = new Date().getTime();
  var randid = Math.floor(Math.random() * 512);
  ts = ts * 64; // bit-shift << 6
  ts = ts;
  return String(ts * 512 + randid);
}

exports.postPatientHandler = async (event) => {
  if (event.httpMethod !== 'POST') {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`
    );
  }

  console.info('received:', event);

  const body = JSON.parse(event.body);

  try {
    await patientSchema.validate(body);
  } catch (error) {
    const response = {
      statusCode: 400,
      body: JSON.stringify(error),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
      },
    };

    return response;
  }

  const id = generateId();
  const Item = { id, ...body };

  var params = {
    TableName: tableName,
    Item,
  };

  const result = await docClient.put(params).promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify(Item),
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
