var products = require('../repositories/products');
var fields = ['name', 'description', 'price', 'image', 'in_stock', 'reviews'];
var review_fields = ['text', 'email_address', 'rating'];

var handleResponse = function(res) {
  return function(err, data) {
    if (err !== null) return res.send(err, 500);
    return res.json(data);
  };
};

module.exports = {
  all: function(req, res, next) { 
    return products.all(handleResponse(res));
  },
  post: function(req, res, next) {
    console.log(req.body);
    var product = {};
    for (var i = 0;i < fields.length; i++) {
      var key = fields[i];
      product[key] = req.body[key];
    }
    return products.save(product, handleResponse(res));
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
  },
  addReview: function(req, res, next) {
    var review = {};
    for (var i = 0;i < review_fields.length; i++) {
      var key = review_fields[i];
      review[key] = req.body[key];
    }
    req.product.addReview(review, handleResponse(res));
  }
};