var white_list = ['email', 'products', 'total_price', 'billing', 'shipping'];

var respond = function(res) {
  return function(err, data) {
    if (err !== null) {
      res.send(err, 500);
    } else {
      res.json(data);
    }
  };
};

module.exports = function(orders) {
  return {

    all: function(req, res, next) {
      var email = req.query.email;
      if (email) {
        orders.findByEmail(email, respond(res));
      } else {
        orders.all(respond(res));
      }
    },
    post: function(req, res, next) {
      var order = {};
      for (var i = 0;i < white_list.length; i++) {
        var key = white_list[i];
        order[key] = req.body[key];
      }
      order.status = 'pending';
      orders.save(order, respond(res));
    },
    get: function(req, res, next) { 
      res.json(req.order); 
    },
    complete: function(req, res, next) {
      req.order.status = 'complete';
      req.order.save(respond(res));
    }
  
  };
};