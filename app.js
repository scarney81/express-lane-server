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

// products
app.get('/products', routes.products.index);
app.post('/products', routes.products.post);
app.get('/product/:product_id', routes.products.get);
app.put('/product/:product_id', routes.products.put);
app.delete('/product/:product_id', routes.products.remove);

// orders
app.get('/orders', routes.orders.index);
app.post('/orders', routes.orders.post);
app.get('/order/:order_id', routes.orders.get);
app.put('/order/:order_id', routes.orders.put);
app.delete('/order/:order_id', routes.orders.remove);

app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);