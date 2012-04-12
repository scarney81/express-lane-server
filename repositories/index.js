var config = require('../config');

module.exports = {
    products: new require('./products')(config),
    orders: new require('./orders')(config)
};