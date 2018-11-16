const path = require('path');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const { DIRECTORY_LIBS, DIRECTORY_DEST } = process.env;

module.exports = webpackMerge(baseConfig, {
  entry: [
    `./${DIRECTORY_LIBS}/index.js`,
  ],
  output: {
    path: path.join(__dirname, '..' , DIRECTORY_DEST),
    filename: 'index.js',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    ],
  },
});
