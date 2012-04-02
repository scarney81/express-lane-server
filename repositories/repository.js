var Mongolian = require('mongolian')
  , ObjectId = Mongolian.ObjectId;

var updateObjectIds = function(array, callback) {
	return callback(array.map(function(item) {
  	if (item._id) item._id = item._id.toString();
   	return item;
	}));
};

function Repository(config, collection) {
	this.config = config;
	this.collection = collection;
}

Repository.prototype.all = function(callback) {
	var _this = this;
  if (callback === null) throw 'no callback specified';
  return this.entities.find().toArray(function(err, array) {
    if (err !== null) return callback(err);
    return updateObjectIds(array, function(array) {
      return callback(null, array);
    });
  });
};

Repository.prototype.single = function(id, callback) {
	var _this = this;
  if (callback === null) throw 'no callback specified';
  return this.entities.findOne({
    _id: new ObjectId(id)
  }, function(err, item) {
    if (err !== null) return callback(err);
    item._id = item._id.toString();
    return callback(null, item);
  });
};

Repository.prototype.save = function(model, callback) {
	if (callback === null) throw 'no callback specified';
  if (model === null) throw 'no model specified';
  return this.entities.save(this.generateModel(model), function(err, result) {
    if (err !== null) return callback(err);
    result._id = result._id.toString();
    return callback(null, result);
  });
};

Repository.prototype.remove = function(id, callback) {
	if (callback === null) throw 'no callback specified';
  if (id === null) throw 'no model specified';
  return this.entities.remove({_id: new ObjectId(id)}, callback);
};

module.exports = Repository;