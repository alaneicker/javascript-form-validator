const path = require('path');
const { DIRECTORY_DEST, NODE_ENV } = process.env;

module.exports = {
  devtool: 'source-map',
  mode: NODE_ENV,
};