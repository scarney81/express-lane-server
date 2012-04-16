var config = require('../config'),
    Products = require('../repositories/products'),
    Orders = require('../repositories/orders'),
    products = require('./products')(new Products(config)),
    orders = require('./orders')(new Orders(config));
    
module.exports = {
  orders: orders,
  products: products
};