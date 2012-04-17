var white_list = ['name', 'description', 'price', 'image', 'in_stock', 'reviews'];
var review_white_list = ['text', 'email_address', 'rating'];

module.exports = function(app, products) {
  
  app.get('/products', function(req, res, next) { 
    products.all(function(err, data) {
      if (err !== null) res.send(err, 500);
      else res.json(data);
    });
  });

  app.get('/product/:product_id', function(req, res, next) { 
    res.json(req.product); 
  });

  app.post('/product/:product_id/reviews', function(req, res, next) {
    var review = {};
    for (var i = 0; i < review_white_list.length; i++) {
      var key = review_white_list[i];
      review[key] = req.body[key];
    }
    req.product.reviews.push(review);
    req.product.save(function(err, data) {
      if (err !== null) res.send(err, 500);
      else res.json(data);
    });
  });

};