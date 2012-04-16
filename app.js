var express = require('express'),
    port = require('./config').port,
    middleware = require('./middleware'),
    routes = require('./routes');

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
routes.products(app);
routes.orders(app);

app.listen(port);
console.log("express-lane-server running on port %d", app.address().port);