var config = require('../config')
	, Repository = require('./repository');
	
module.exports = new Repository(config, 'products');