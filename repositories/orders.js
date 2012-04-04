var config     = require('../config');
var Repository = require('./repository');

var orderRepository = {
	single: function(order, callback) {
		if (order === null) return callback(null, null);
		order.complete = function(cb) {
			if (order.status === 'complete') return cb('order has already been completed');
			order.status = 'complete';
			order.save(cb);
		};
		return callback(null, order);
	},
	findByEmail: function(email, callback) {
		var _this = this;
		this.collection.find({email: email}).toArray(function(err, response) {
			if (err !== null) return callback(err);
			return _this.updateObjectIds(response, function(array) { return callback(null, array); });
		});
	}
};

module.exports = new Repository(config, 'orders', orderRepository); 