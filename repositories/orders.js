var Repository = require('./repository');
	
var OrderRepository = function(config) {
	Repository.call(this, config, 'orders');
};

require('util').inherits(OrderRepository, Repository);
module.exports = OrderRepository;