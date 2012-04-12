module.exports = function(orders) {
  return function(req, res, next, id) {
    return orders.single(id, function(err, order) {
      if (!((err !== null) || (order !== null))) return res.send("order not found", 404);
      if (err !== null) return res.send(err, 500);
      req.order = order;
      return next();
    });
  };
};