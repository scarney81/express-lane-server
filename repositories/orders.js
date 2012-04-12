var Repository = require('./repository');

module.exports = function(config) {
  var self = this;
  self.repo = new Repository(config, 'orders');
  
  return {
    all: function(callback) { self.repo.all(callback); },
    save: function(model, callback) { self.repo.save(model, callback); },
    remove: function(id, callback) { self.repo.remove(id, callback); },
    
    single: function(id, callback) {
      self.repo.single(id, function(err, order) {
        if (order === null) {
          callback(null, null);
        } else {
          order.complete = function(cb) {
            if (order.status === 'complete'){
              cb('order has already been completed');
            } else {
              order.status = 'complete';
              order.save(cb);          
            }
          };
          callback(null, order);
        }
      });
    },
        
    findByEmail: function(email, callback) {
      self.repo.collection.find({email: email}).toArray(function(err, response) {
        if (err !== null) {
          callback(err);
        } else {
          self.repo.updateObjectIds(response, function(array) { return callback(null, array); });
        }
      });    
    }
  };
};