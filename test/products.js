/*global describe, it */
var should   = require('should')
  , Products = require('../repositories/products');

describe('ProductRepository', function() {
	
	var config = {connectionString: 'mongodb://heroku_app3627039:5ujppsecj90u4432roiodv8opq@ds031567.mongolab.com:31567/heroku_app3627039'};
	var products = new Products(config);
	
	var model = {
		name: 'fakeName', 
		description: 'fake description',
		price: 10.50,
		image: 'http://someurl/some.jpg',
		in_stock: 10
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
		
	it('should remove a product', function(done) {
		products.remove(model._id, function(err, response) {
			if (err) return done(err);
			response.should.equal(1);
			done();
		});
	});
});