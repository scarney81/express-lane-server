var config     = require('../config');
var Repository = require('./repository');
	
var productRepository = {
	single: function(product, callback) {
		if (product === null) return callback(null, null);
		product.addReview = function(review, cb) {
			if (!this.reviews) this.reviews = [];
			this.reviews.push(review);
			return product.save(cb);
		};
		return callback(null, product);
	}
};

module.exports = new Repository(config, 'products', productRepository);