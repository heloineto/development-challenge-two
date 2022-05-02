exports.optionsPatientHandler = async (event) => {
  try {
    if (event.httpMethod !== 'OPTIONS') {
      throw new Error(
        `postMethod only accepts OPTIONS method, you tried: ${event.httpMethod} method.`
      );
    }

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
