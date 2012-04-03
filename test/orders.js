/*global describe, it */
var should   = require('should')
  , Orders = require('../repositories/orders');

describe('OrderRepository', function() {
	
	var config = {connectionString: 'mongodb://heroku_app3627039:5ujppsecj90u4432roiodv8opq@ds031567.mongolab.com:31567/heroku_app3627039'};
	var orders = new Orders(config);
	
	var model = {
		email_address: 'email@email.com',
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
			order.email_address.should.equal(model.email_address);
			done();
		});
	});
	
	it('should update an order', function(done) {
		model.email_address = 'another@node.com';
		orders.save(model, function(err, order) {
			if (err) return done(err);
			
			should.exist(order);
			order.should.have.property('_id');
			order.email_address.should.equal('another@node.com');
			done();
		});
	});
		
	it('should remove a order', function(done) {
		orders.remove(model._id, function(err, response) {
			if (err) return done(err);
			response.should.equal(1);
			done();
		});
	});
});