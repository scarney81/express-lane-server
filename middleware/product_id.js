var products = require('../repositories/repository');

module.exports = function(req, res, next, id) {
	return products.single('products', id, function(err, product) {
    if (!((err !== null) || (product !== null))) return res.send("product not found", 404);
    if (err !== null) return res.send(err, 500);
    req.product = product;
    return next();
  });
};