const dynamodb = require('aws-sdk/clients/dynamodb');
const AWS = require('aws-sdk');
const docClient = new dynamodb.DocumentClient();

const tableName = process.env.TABLE_NAME;
const bucketName = process.env.BUCKET_NAME;

const s3 = new AWS.S3();

exports.deletePatientHandler = async (event) => {
  try {
    if (event.httpMethod !== 'DELETE') {
      throw new Error(
        `postMethod only accepts DELETE method, you tried: ${event.httpMethod} method.`
      );
    }

    console.info('received:', event);

    const id = event.pathParameters.id;

    if (!id) {
      throw new Error(`An id was not provided.`);
    }

    await s3
      .deleteObject({
        Bucket: bucketName,
        Key: `${id}.jpeg`,
      })
      .promise();

    var params = {
      TableName: tableName,
      Key: { id },
    };
    const data = await docClient.delete(params).promise();

    const response = {
      statusCode: 200,
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
