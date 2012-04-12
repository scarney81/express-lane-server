var Repository = require('./repository');

module.exports = function(config) {
  
  var delegates = {
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
  
  return new Repository(config, 'products', delegates);
  
};