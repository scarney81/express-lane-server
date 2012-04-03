var orders = require('../repositories/repository');
var fields = [];

var handleResponse = function(res) {
	return function(err, data) {
    if (err !== null) return res.send(err, 500);
    return res.json(data);
  };
};

module.exports = {
	index: function(req, res, next) { 
		return orders.all('orders', handleResponse(res));
	},
	post: function(req, res, next) {
		var order = {};
    for (var i = 0;i < fields.length; i++) {
      var key = fields[i];
      order[key] = req.body[key];
    }
    return orders.save('orders', order, handleResponse(res));
	},
	get: function(req, res, next) { 
		res.json(req.order); 
	},
	put: function(req, res, next) {
    for (var i = 0;i < fields.length; i++) {
      var key = fields[i];
      req.order[key] = req.body[key];
    }
    return req.order.save(handleResponse(res));
	},
	remove: function(req, res, next) {
		return req.order.remove(handleResponse(res));
	}
};