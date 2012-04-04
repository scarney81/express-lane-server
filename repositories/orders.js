var Repository = require('./repository');
	
var OrderRepository = function(config) {
	Repository.call(this, config, 'orders');
};

require('util').inherits(OrderRepository, Repository);

OrderRepository.prototype.findByEmail = function(email, callback) {
	this.collection.find({email: email}).toArray(function(err, response) {
		if (err !== null) return callback(err);
		callback(null, response);
	});
};

OrderRepository.prototype.complete = function(id, callback) {
	this.single(id, function(err, order) {
		if (order.status === 'complete') return callback('order already completed');
		order.status = 'complete';
		order.save(callback);
	});
};

module.exports = OrderRepository;