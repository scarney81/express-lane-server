var fields = ['name', 'description', 'price', 'image', 'in_stock', 'reviews'];
var review_fields = ['text', 'email_address', 'rating'];

var respond = function(res) {
  return function(err, data) {
    if (err !== null) return res.send(err, 500);
    return res.json(data);
  };
};

module.exports = function(products) {
  return {
    
    all: function(req, res, next) { 
      return products.all(respond(res));
    },
    post: function(req, res, next) {
      var product = {};
      for (var i = 0;i < fields.length; i++) {
        var key = fields[i];
        product[key] = req.body[key];
      }
      return products.save(product, respond(res));
    },
    get: function(req, res, next) { 
      return res.json(req.product); 
    },
    put: function(req, res, next) {
      for (var i = 0;i < fields.length; i++) {
        var key = fields[i];
        req.product[key] = req.body[key];
      }
      return req.product.save(respond(res));
    },
    remove: function(req, res, next) {
      return req.product.remove(respond(res));
    },
    addReview: function(req, res, next) {
      var review = {};
      for (var i = 0;i < review_fields.length; i++) {
        var key = review_fields[i];
        review[key] = req.body[key];
      }
      req.product.addReview(review, respond(res));
    }
    
  };
};