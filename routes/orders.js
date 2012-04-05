var orders = require('../repositories/orders');
var fields = ['email', 'products', 'total_price', 'billing', 'shipping'];

var handleResponse = function(res) {
	return function(err, data) {
    if (err !== null) return res.send(err, 500);
    return res.json(data);
  };
};

module.exports = {
	all: function(req, res, next) {
		var email = req.query.email;
		return email ? orders.findByEmail(email, handleResponse(res)) : orders.all(handleResponse(res));
	},
	post: function(req, res, next) {
		var order = {};
    for (var i = 0;i < fields.length; i++) {
      var key = fields[i];
      order[key] = req.body[key];
    }
		order.status = 'pending';
    return orders.save(order, handleResponse(res));
	},
	get: function(req, res, next) { 
		res.json(req.order); 
	},
	complete: function(req, res, next) {
		req.order.complete(handleResponse(res));
	}
};