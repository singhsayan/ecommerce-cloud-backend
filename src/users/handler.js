const { registerUser, getUser } = require('./service');

module.exports.registerUserHandler = async (event) => {
  return await registerUser(event);
};

module.exports.getUserHandler = async (event) => {
  return await getUser(event);
};