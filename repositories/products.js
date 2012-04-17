var Mongolian = require('mongolian')
  , ObjectId = Mongolian.ObjectId;

module.exports = function(config) {
  var db = new Mongolian(config.connectionString);
  var collection = db.collection('products');
  
  var updateObjectIds = function(array, callback) {
    callback(array.map(function(item) {
      if (item._id !== null) item._id = item._id.toString();
      return item;
    }));
  };
    
  return {

  };
};
  