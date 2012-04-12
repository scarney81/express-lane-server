var orders   = require('../repositories').orders
  , products = require('../repositories').products;

module.exports = {
  order_id: require('./order_id')(orders),
  product_id: require('./product_id')(products)
};