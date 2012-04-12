var ordersRepo   = require('../repositories').orders
  , productsRepo = require('../repositories').products;

module.exports = {
  orders: require('./orders')(ordersRepo),
  products: require('./products')(productsRepo)
};