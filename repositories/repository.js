var config = require('../config')
  , Mongolian = require('mongolian')
  , ObjectId = Mongolian.ObjectId;

var updateObjectIds = function(array, callback) {
	return callback(array.map(function(item) {
  	if (item._id) item._id = item._id.toString();
   	return item;
	}));
};

module.exports = {
	all: function(collection, callback) {
	  if (callback === null) throw 'no callback specified';
		var db = new Mongolian(config.connectionString);
		var entities = db.collection(collection);
	  return entities.find().toArray(function(err, array) {
	    if (err !== null) return callback(err);
	    return updateObjectIds(array, function(array) { return callback(null, array); });
	  });
	},
  single: function(collection, id, callback) {
		var _this = this;
	  if (callback === null) throw 'no callback specified';
	  var db = new Mongolian(config.connectionString);
		var entities = db.collection(collection);
		return entities.findOne({
	    _id: new ObjectId(id)
	  }, function(err, item) {
	    if (err !== null) return callback(err);
			if (item === undefined) return callback(null, null);
	    item._id = item._id.toString();
			item.save = function(cb) { _this.save(item, cb); };
			item.remove = function(cb) { _this.remove(item._id, cb); };
	    return callback(null, item);
	  });
	},
	save: function(collection, model, callback) {
		if (callback === null) throw 'no callback specified';
	  if (model === null) throw 'no model specified';
	  var db = new Mongolian(config.connectionString);
		var entities = db.collection(collection);
		return entities.save(model, function(err, result) {
	    if (err !== null) return callback(err);
			console.log(result);
	    result._id = result._id.toString();
	    return callback(null, result);
	  });
	},
	remove: function(collection, id, callback) {
		if (callback === null) throw 'no callback specified';
	  if (id === null) throw 'no model specified';
	  var db = new Mongolian(config.connectionString);
		var entities = db.collection(collection);
		console.log(id);
		return entities.remove({_id: new ObjectId(id)}, callback);
	}
};