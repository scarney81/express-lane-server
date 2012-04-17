/*global describe, it, process */
var should   = require('should')
  , config   = require('../config')
  , orders   = new require('../repositories/orders')(config);

describe('OrderRepository', function() {

  var model = {
    username: 'twitterHandle',
    status: 'pending',
    products: [
    {
      _id: 12345,
      quantity: 1,
      price: 1.50,
      name: 'product 1',
      image: 'http://someimage/'
    },
    {
      _id: 67890,
      quantity: 2,
      price: 10.50,
      name: 'product 2',
      image: 'http://someotherimage/'
    }	
    ],
    total_price: 22.50,
    billing: {
      cc_no: '1234567898765432',
      exp_date: '01/2012',
      cvs: 123,
      name: 'some cardholder',
      zip: '12345'
    },
    shipping: {
      address: '1234 apple lane',
      city: 'arlington',
      state: 'va',
      zip: '12345'
    }
  };

  it('should create an order', function(done) {
    orders.save(model, function(err, order) {
      if (err) return done(err);

      should.exist(order);
      order.should.have.property('_id');
      done();
    });
  });

  it('should retrieve all orders', function(done) {
    orders.all(function(err, orders) {
      should.not.exist(err);
      should.exist(orders);
      orders.length.should.not.equal(0);
      done();
    });
  });

  it('should retreive an order', function(done) {
    orders.single(model._id, function(err, order) {
      if (err) return done(err);

      should.exist(order);
      order.should.have.property('_id');
      order.username.should.equal(model.username);
      done();
    });
  });

  it('should retrieve a list of orders by username', function(done) {
    orders.findByUsername('twitterHandle', function(err, orders) {
      should.not.exist(err);
      should.exist(orders);
      orders.length.should.not.equal(0);
      done();
    });
  });

  it('should update an order', function(done) {
    model.email = 'handleTwitter';
    orders.save(model, function(err, order) {
      if (err) return done(err);

      should.exist(order);
      order.should.have.property('_id');
      order.email.should.equal('handleTwitter');
      done();
    });
  });
});