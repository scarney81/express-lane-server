var products = require('../repositories/repository');
var fields = ['name', 'description', 'price', 'image', 'in_stock'];

var handleResponse = function(res) {
	return function(err, data) {
    if (err !== null) return res.send(err, 500);
    return res.json(data);
  };
};

module.exports = {
	index: function(req, res, next) { 
		return products.all('products', handleResponse(res));
	},
	post: function(req, res, next) {
		var product = {};
    for (var i = 0;i < fields.length; i++) {
      var key = fields[i];
      product[key] = req.body[key];
    }
    return products.save('products', product, handleResponse(res));
	},
	get: function(req, res, next) { 
		return res.json(req.product); 
	},
	put: function(req, res, next) {
   for (var i = 0;i < fields.length; i++) {
      var key = fields[i];
      req.product[key] = req.body[key];
    }
    return req.product.save(handleResponse(res));
	},
	remove: function(req, res, next) {
		return req.product.remove(handleResponse(res));
	}
};