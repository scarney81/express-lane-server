var config = require('../config'),
    Products = require('../repositories/products'),
    Orders = require('../repositories/orders'),
    products = require('./products'),
    orders = require('./orders');
    
module.exports = {  
  orders: function(app) { return orders(app, new Orders(config)); },
  products: function(app) { return products(app, new Products(config)); }
};