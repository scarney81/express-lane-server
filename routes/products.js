var white_list = ['name', 'description', 'price', 'image', 'in_stock', 'reviews'];
var review_white_list = ['text', 'email_address', 'rating'];

var respond = function(res) {
  return function(err, data) {
    if (err !== null) { 
      res.send(err, 500);
    } else {
      res.json(data);
    }
  };
};

module.exports = function(products) {
  return {
    
    all: function(req, res, next) { 
      products.all(respond(res));
    },
    post: function(req, res, next) {
      var product = {};
      for (var i = 0; i < white_list.length; i++) {
        var key = white_list[i];
        product[key] = req.body[key];
      }
      products.save(product, respond(res));
    },
    get: function(req, res, next) { 
      res.json(req.product); 
    },
    put: function(req, res, next) {
      for (var i = 0; i < white_list.length; i++) {
        var key = white_list[i];
        req.product[key] = req.body[key];
      }
      req.product.save(respond(res));
    },
    remove: function(req, res, next) {
      req.product.remove(respond(res));
    },
    addReview: function(req, res, next) {
      var review = {};
      for (var i = 0; i < review_white_list.length; i++) {
        var key = review_white_list[i];
        review[key] = req.body[key];
      }
      req.product.reviews.push(review);
      req.product.save(respond(res));
    }
    
  };
};