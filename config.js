/*globals process */
module.exports = {
  debug: true,
  port: process.env.PORT,
  connectionString: process.env.MONGOLAB_URI
};