var Mongolian = require('mongolian')
  , ObjectId = Mongolian.ObjectId;

var Repository = function(config, collection, delegate) {
	var db = new Mongolian(config.connectionString);
	this.collection = db.collection(collection);
	this.delegate = delegate;
	
	for(var key in delegate) {
		if (this[key]) continue;
		this[key] = delegate[key];
	}
};

Repository.prototype.all = function(callback) {
  if (callback === null) throw 'no callback specified';
	
	var _this = this;
	return this.collection.find().toArray(function(err, array) {
    if (err !== null) return callback(err);
		if (_this.delegate && _this.delegate.all) return _this.delegate.all(array, callback);
    return _this.updateObjectIds(array, function(array) { return callback(null, array); });
  });
};

Repository.prototype.single = function(id, callback) {
	if (callback === null) throw 'no callback specified';

	var _this = this;
	return this.collection.findOne({_id: new ObjectId(id)}, function(err, item) {
    if (err !== null) return callback(err);
		if (item === undefined) return callback(null, null);
    item._id = item._id.toString();
		item.save = function(cb) { _this.save(item, cb); };
		item.remove = function(cb) { _this.remove(item._id, cb); };
		if (_this.delegate && _this.delegate.single) return _this.delegate.single(item, callback);
    return callback(null, item);
  });
};

Repository.prototype.save = function(model, callback) {
	if (callback === null) throw 'no callback specified';
  if (model === null) throw 'no model specified';

	var _this = this;
	if (model._id) model._id = new ObjectId(model._id);
	return this.collection.save(model, function(err, result) {
    if (err !== null) return callback(err);
    result._id = result._id.toString();
		if (_this.delegate && _this.delegate.save) return _this.delegate.save(result, callback);
    return callback(null, result);
  });
};

Repository.prototype.remove = function(id, callback) {
	if (callback === null) throw 'no callback specified';
  if (id === null) throw 'no model specified';

	var _this = this;
	return this.collection.remove({_id: new ObjectId(id)}, function(err, result) {
		if (_this.delegate && _this.delegate.remove) return _this.delegate.remove(result, callback);
		return callback(err, result);
	});
};

Repository.prototype.updateObjectIds = function(array, callback) {
	return callback(array.map(function(item) {
  	if (item._id) item._id = item._id.toString();
   	return item;
	}));
};

module.exports = Repository;