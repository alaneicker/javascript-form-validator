const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const { 
  DIRECTORY_DEST,
  DIRECTORY_SRC,
  DIRECTORY_STYLES,
} = process.env;

module.exports = webpackMerge(baseConfig, {
  entry: [
    `./${DIRECTORY_SRC}/index.js`,
    `./${DIRECTORY_STYLES}/app.scss`,
  ],
  output: {
    path: path.join(__dirname, DIRECTORY_DEST),
    filename: '[name].js',
  },
  devServer: {
    contentBase: path.join(__dirname, DIRECTORY_SRC),
    compress: true,
    port: 8081,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        },
      },
      {
        test: /\.scss$/,
        include: /src/,
        use: [
          {
						loader: 'file-loader',
						options: {
							name: 'styles/[name].css',
						}
					},
					{
						loader: 'extract-loader'
					},
					{
						loader: 'css-loader?-url'
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'sass-loader'
					}
        ]
      },
      {
        test: /\.html$/,
        include: /src/,
        use: ['html-loader']
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ 
      hash: false, 
      template: `./${DIRECTORY_SRC}/index.hbs`
    }),
  ],
});
