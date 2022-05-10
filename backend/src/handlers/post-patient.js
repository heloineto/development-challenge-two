const dynamodb = require('aws-sdk/clients/dynamodb');
const AWS = require('aws-sdk');
const patientSchema = require('../schemas/patientSchema');
const docClient = new dynamodb.DocumentClient();

const tableName = process.env.TABLE_NAME;
const bucketName = process.env.BUCKET_NAME;

const s3 = new AWS.S3();

const generateId = () => {
  var ts = new Date().getTime();
  var randid = Math.floor(Math.random() * 512);
  ts = ts * 64;
  ts = ts;
  return String(ts * 512 + randid);
};

const uploadImage = async (base64, userId) => {
  const base64Data = new Buffer.from(
    base64.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  );

  const type = base64.split(';')[0].split('/')[1];

  if (type !== 'jpeg') {
    throw new Error(`Only "jpeg" image type is allowed. type provided: ${type}`);
  }

  const params = {
    Bucket: bucketName,
    Key: `${userId}.jpeg`,
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: `image/jpeg`,
  };

  const { Location, Key } = await s3.upload(params).promise();
  const location = Location;
  const key = Key;

  console.log(location, key);

  return location;
};

exports.postPatientHandler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      throw new Error(
        `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`
      );
    }

    console.info('received:', event);

    const body = JSON.parse(event.body);

    await patientSchema.validate(body);

    const { picture, fullName, birthdate, email, address } = body;
    const id = body.id ?? generateId();

    let pictureURL;

    if (picture) {
      if (picture.startsWith('https')) {
        pictureURL = picture;
      } else {
        pictureURL = await uploadImage(picture, id);
      }
    }

    const Item = { id, fullName, birthdate, email, address, picture: pictureURL };

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
