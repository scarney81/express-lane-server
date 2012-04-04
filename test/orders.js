/*global describe, it, process */
var should   = require('should')
  , Orders = require('../repositories/orders');

describe('OrderRepository', function() {
	
	var config = {connectionString: process.env.MONGOLAB_URI};
	var orders = new Orders(config);
	
	var model = {
		email: 'email@email.com',
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
	
	it('should retreive an order', function(done) {
		orders.single(model._id, function(err, order) {
			if (err) return done(err);
			
			should.exist(order);
			order.should.have.property('_id');
			order.email.should.equal(model.email);
			done();
		});
	});
	
	it('should update an order', function(done) {
		model.email = 'another@node.com';
		orders.save(model, function(err, order) {
			if (err) return done(err);
			
			should.exist(order);
			order.should.have.property('_id');
			order.email.should.equal('another@node.com');
			done();
		});
	});
	
	it('should mark order complete', function(done) {
		orders.complete(model._id, function(err, order) {
				if (err) return done(err);
				
				should.exist(order);
				order.status.should.equal('complete');
				done();
		});
	});
	
	it('should not mark order complete', function(done) {
		orders.complete(model._id, function(err, order) {
				should.exist(err);
				done();
		});
	});
		
	it('should remove an order', function(done) {
		orders.remove(model._id, function(err, response) {
			response.should.equal(1);
			done();
		});
	});
});