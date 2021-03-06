var Mongolian = require('mongolian')
  , ObjectId = Mongolian.ObjectId;

var Repository = function(config, collection) {
  var db = new Mongolian(config.connectionString);
  this.collection = db.collection(collection);
};

Repository.prototype.all = function(callback) {
  if (callback === null) throw 'no callback specified';

  var self = this;
  this.collection.find().toArray(function(err, array) {
    if (err !== null) { 
      callback(err);
    } else {
      self.updateObjectIds(array, function(array) { return callback(null, array); });
    }
  });
};

Repository.prototype.single = function(id, callback) {
  if (callback === null) throw 'no callback specified';

  var self = this;
  this.collection.findOne({_id: new ObjectId(id)}, function(err, item) {
    if (err !== null) return callback(err);
    if (item === undefined) return callback(null, null);
    item._id = item._id.toString();
    item.save = function(cb) { self.save(item, cb); };
    item.remove = function(cb) { self.remove(item._id, cb); };
    callback(null, item);
  });
};

Repository.prototype.save = function(model, callback) {
  if (callback === null) throw 'no callback specified';

  if (model._id) model._id = new ObjectId(model._id);
  this.collection.save(model, function(err, result) {
    if (err !== null) {
      callback(err);
    } else {
      result._id = result._id.toString();
      callback(null, result);
    }
  });
};

Repository.prototype.remove = function(id, callback) {
  if (callback === null) throw 'no callback specified';

  this.collection.remove({_id: new ObjectId(id)}, function(err, result) {
    callback(err, result);
  });
};

Repository.prototype.updateObjectIds = function(array, callback) {
  callback(array.map(function(item) {
    if (item._id !== null) {
      item._id = item._id.toString();
    }
    return item;
  }));
};

module.exports = Repository;