var config = require('../config'),
    Products = require('../repositories/products'),
    Orders = require('../repositories/orders'),
    order_id = require('./order_id')(new Orders(config)),
    product_id = require('./product_id')(new Products(config));

module.exports = {
  order_id: order_id,
  product_id: product_id
};