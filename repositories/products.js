var Repository = require('./repository');
	
var ProductRepository = function(config) {
	Repository.call(this, config, 'products');
};
require('util').inherits(ProductRepository, Repository);

ProductRepository.prototype.addReview = function(id, review, callback) {
	if (review === null) throw 'no review provided';
	if (callback === null) throw 'no callback provided';
	
	this.single(id, function(err, order) {
		if (err !== null) return callback(err);
		if (order === null) return callback(null, null);
		
		if (!order.reviews) order.reviews = [];
		order.reviews.push(review);
		return order.save(callback);
	});
};

module.exports = ProductRepository;