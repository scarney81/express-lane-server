var Repository = require('./repository');

module.exports = function(config) {
  var repo = new Repository(config, 'orders');

  return {
    all: function(callback) { repo.all(callback); },
    save: function(model, callback) { repo.save(model, callback); },
    remove: function(id, callback) { repo.remove(id, callback); },
    single: function(id, callback) { repo.single(id, callback); },

    findByUsername: function(username, callback) {
      repo.collection.find({username: username}).toArray(function(err, response) {
        if (err !== null) {
          callback(err);
        } else {
          repo.updateObjectIds(response, function(array){
            return callback(null, array);
          });
        }
      });
    }
  };
};
