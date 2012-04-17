var express = require('express'),
    config = require('./config'),
    port = config.port,
    repos = {
      orders: new require('./repositories/orders')(config),
      products: new require('./repositories/products')(config)
    },
    order_id = require('./middleware/order_id')(repos.orders),
    routes = {
      products: require('./routes/products'),
      orders: require('./routes/orders')
    };

var app = express.createServer();
app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

//middleware
app.param('order_id', order_id);

// product routes
routes.products(app, repos.products);
routes.orders(app, repos.orders);

app.listen(port);
console.log("express-lane-server running on port %d", app.address().port);