var products = require('../repositories/products');

module.exports = function(req, res, next, id) {
  return products.single(id, function(err, product) {
    if (!((err !== null) || (product !== null))) return res.send("product not found", 404);
    if (err !== null) return res.send(err, 500);
    req.product = product;
    return next();
  });
};