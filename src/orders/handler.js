const { placeOrder, getOrder } = require('./service');

module.exports.placeOrderHandler = async (event) => {
  return await placeOrder(event);
};

module.exports.getOrderHandler = async (event) => {
  return await getOrder(event);
};