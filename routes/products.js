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
    get: function(req, res, next) { 
      res.json(req.product); 
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