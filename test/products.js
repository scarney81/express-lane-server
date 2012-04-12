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

  it('should add review', function(done) {
    var review = {
      text: 'fakeName is terrible!!',
      rating: 0,
      email_address: 'someotherfake@email.com'				
    };
    products.single(model._id, function(err, product) {
      if (err) return done(err);

      product.addReview(review, function(err, product) {
        product.reviews.length.should.equal(2);
        done();
      });
    });
  });

  it('should remove a product', function(done) {
    products.remove(model._id, function(err, response) {
      if (err) return done(err);
      response.should.equal(1);
      done();
    });
  });
});