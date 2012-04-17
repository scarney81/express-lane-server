var white_list = ['username', 'products', 'total_price', 'billing', 'shipping'];

module.exports = function(app, orders) {

  app.get('/orders/:username', function(req, res, next) {
    var username = req.params.username;
    orders.findByUsername(username, function(err, data) {
      if (err !== null) res.send(err, 500);
      else res.json(data);
    });
  });

  app.get('/orders', function(req, res, next) {
    orders.all(function(err, data) {
      if (err !== null) res.send(err, 500);
      else res.json(data);
    });
  });

  app.get('/order/:order_id', function(req, res, next) {
    res.json(req.order);
  });

  app.post('/orders', function(req, res, next) {
    var order = {};
    for (var i = 0;i < white_list.length; i++) {
      var key = white_list[i];
      order[key] = req.body[key];
    }
    order.status = 'pending';
    order.date = new Date();
    orders.save(order,function(err, data) {
      if (err !== null) res.send(err, 500);
      else res.json(data);
    });
  });

  app.post('/order/:order_id/complete', function(req, res, next) {
    req.order.status = 'complete';
    req.order.save(function(err, data) {
      if (err !== null) res.send(err, 500);
      else res.json(data);
    });
  });

};
