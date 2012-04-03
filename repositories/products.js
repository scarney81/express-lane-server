var Repository = require('./repository');
	
var ProductRepository = function(config) {
	Repository.call(this, config, 'products');
};

require('util').inherits(ProductRepository, Repository);
module.exports = ProductRepository;