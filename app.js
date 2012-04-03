var express    = require('express')
  , routes     = require('./routes')
  , order_id   = require('./middleware/order_id')
  , product_id = require('./middleware/product_id')
  , port       = require('./config').port;

var app = express.createServer();
app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

//middleware
app.param('product_id', product_id);
app.param('order_id', order_id);

// product routes
app.get('/products', routes.products.all);
app.post('/products', routes.products.post);
app.get('/product/:product_id', routes.products.get);
app.put('/product/:product_id', routes.products.put);
app.del('/product/:product_id', routes.products.remove);

// order routes
app.get('/orders', routes.orders.all);
app.post('/orders', routes.orders.post);
app.get('/order/:order_id', routes.orders.get);
app.put('/order/:order_id', routes.orders.put);
app.del('/order/:order_id', routes.orders.remove);

app.listen(port);
console.log("express-lane-server running on port %d", app.address().port);