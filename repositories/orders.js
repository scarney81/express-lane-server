var Repository = require('./repository');
	
var OrderRepository = function(config) {
	Repository.call(this, config, 'orders');
};

require('util').inherits(OrderRepository, Repository);

OrderRepository.prototype.complete = function(id, callback) {
	this.single(id, function(err, order) {
		if (order.status === 'complete') return callback('order already completed');
		order.status = 'complete';
		order.save(callback);
	});
};

module.exports = OrderRepository;