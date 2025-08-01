module.exports.success = (data) => ({
  statusCode: 200,
  body: JSON.stringify(data),
});

module.exports.failure = (message) => ({
  statusCode: 500,
  body: JSON.stringify({ error: message }),
});

