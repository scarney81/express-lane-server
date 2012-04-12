var Repository = require('./repository');

module.exports = function(config) {
  var self = this;
  self.repo = new Repository(config, 'products');
  
  return {
    all: function(callback) { self.repo.all(callback); },
    save: function(model, callback) { self.repo.save(model, callback); },
    remove: function(id, callback) { self.repo.remove(id, callback); },
    
    single: function(id, callback) {
      self.repo.single(id, function(err, product){
        if (product === null) {
          callback(null, null);
        } else {
          product.addReview = function(review, cb) {
            if (!this.reviews) this.reviews = [];
            this.reviews.push(review);
            product.save(cb);
          };
          callback(null, product);  
        }
      });
    }
  };
};
  