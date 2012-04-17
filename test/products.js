/*global describe, it, process */
var should   = require('should')
  , config   = require('../config')
  , products = new require('../repositories/products')(config);

describe('ProductRepository', function() {

  var model = {
    name: 'fakeName', 
    description: 'fake description',
    price: 10.50,
    image: 'http://someurl/some.jpg',
    in_stock: 10,
    reviews: [
    {
      text: 'fakeName is great!!',
      rating: 5,
      email_address: 'somefake@email.com'
    }
    ]
  };

  it('should create a product', function(done) {
    products.save(model, function(err, product) {
      if (err) return done(err);

      should.exist(product);
      product.should.have.property('_id');
      done();
    });
  });

  it('should retreive a product', function(done) {
    products.single(model._id, function(err, product) {
      if (err) return done(err);
      should.exist(product);
      product.should.have.property('_id');
      product.name.should.equal(model.name);
      done();
    });
  });

  it('should update a product', function(done) {
    model.name = 'foobarBaz';
    model.price = 1.50;
    products.save(model, function(err, product) {
      if (err) return done(err);

      should.exist(product);
      product.should.have.property('_id');
      product.name.should.equal('foobarBaz');
      product.price.should.equal(1.50);
      done();
    });
  });
});