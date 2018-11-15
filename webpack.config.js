require('env-merger')();

module.exports = require(`./config/webpack.${process.env.NODE_ENV}.js`);