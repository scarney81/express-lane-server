var express = require('express')
  , config = require('./config')
  , port = config.port
  , routes = require('./routes')
  , middleware = require('./middleware');

var app = express.createServer();
app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

//middleware
app.param('product_id', middleware.product_id);
app.param('order_id', middleware.order_id);

// product routes
app.get('/products', routes.products.all);
app.post('/products', routes.products.post);
app.get('/product/:product_id', routes.products.get);
app.put('/product/:product_id', routes.products.put);
app.del('/product/:product_id', routes.products.remove);
app.post('/product/:product_id/reviews', routes.products.addReview);

// order routes
app.get('/orders', routes.orders.all);
app.post('/orders', routes.orders.post);
app.get('/order/:order_id', routes.orders.get);
app.post('/order/:order_id/complete', routes.orders.complete);

app.listen(port);
console.log("express-lane-server running on port %d", app.address().port);