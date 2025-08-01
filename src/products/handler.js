// 6. === src/products/handler.js ===
const { createProduct, getProduct } = require('./service');

module.exports.createProductHandler = async (event) => {
  return await createProduct(event);
};

module.exports.getProductHandler = async (event) => {
  return await getProduct(event);
};
