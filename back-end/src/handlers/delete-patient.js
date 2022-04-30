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

  const body = JSON.parse(event.body);

  try {
    await patientSchema.validate(body);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const response = {
        statusCode: 400,
        body: JSON.stringify(error),
      };

      return response;
    }
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
  };

  // All log statements are written to CloudWatch
  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
