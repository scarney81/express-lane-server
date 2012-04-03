var config = require('../config')
  , Orders = require('../repositories/orders')
  , orders = new Orders(config);

module.exports = function(req, res, next, id) {
	return orders.single('orders', id, function(err, order) {
    if (!((err !== null) || (order !== null))) return res.send("order not found", 404);
    if (err !== null) return res.send(err, 500);
    req.order = order;
    return next();
  });
};