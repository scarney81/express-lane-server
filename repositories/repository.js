var Mongolian = require('mongolian')
  , ObjectId = Mongolian.ObjectId;

var updateObjectIds = function(array, callback) {
	return callback(array.map(function(item) {
  	if (item._id) item._id = item._id.toString();
   	return item;
	}));
};

var Repository = function(config, collection) {
	var db = new Mongolian(config.connectionString);
	this.collection = db.collection(collection);
};

Repository.prototype.all = function(callback) {
  if (callback === null) throw 'no callback specified';
	
	return this.collection.find().toArray(function(err, array) {
    if (err !== null) return callback(err);
    return updateObjectIds(array, function(array) { return callback(null, array); });
  });
};

Repository.prototype.single = function(id, callback) {
	if (callback === null) throw 'no callback specified';

	var _this = this;
	return this.collection.findOne({
    _id: new ObjectId(id)
  }, function(err, item) {
    if (err !== null) return callback(err);
		if (item === undefined) return callback(null, null);
    item._id = item._id.toString();
		item.save = function(cb) { _this.save(item, cb); };
		item.remove = function(cb) { _this.remove(item._id, cb); };
    return callback(null, item);
  });
};

Repository.prototype.save = function(model, callback) {
	if (callback === null) throw 'no callback specified';
  if (model === null) throw 'no model specified';

	if (model._id) model._id = new ObjectId(model._id);
	return this.collection.save(model, function(err, result) {
    if (err !== null) return callback(err);
    result._id = result._id.toString();
    return callback(null, result);
  });
};

Repository.prototype.remove = function(id, callback) {
	if (callback === null) throw 'no callback specified';
  if (id === null) throw 'no model specified';

	return this.collection.remove({_id: new ObjectId(id)}, callback);
};

module.exports = Repository;