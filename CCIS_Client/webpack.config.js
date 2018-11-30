const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const cwd = process.cwd()
const CopyWebpackPlugin = require('copy-webpack-plugin')
const mode = 'production'

/**
 * Config
 */
module.exports = {
  context: path.join(cwd, 'app'),
  mode,
  optimization: {
		// We no not want to minimize our code.
		minimize: false
	},
  entry: {
    app: ["babel-polyfill", './js/index.jsx'],
    silentRenew: ["./silent_renew/silent_renew.js"],
    react: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-router',
      'redux',
      'react-redux',
      'react-router-redux',
      'history'
    ],
    config : [
      './js/Config/serviceURLs.cfg',
      './js/secrets.cfg',
      './js/Config/colours.cfg',
      './js/Config/ui_config.cfg'
    ]
  },

  output: {
    path: path.resolve('dist'),
    filename: 'bundle_[name].js'
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    },
    {
      test: /\.json$/,
      use: ['json-loader'],
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    },
    {
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        'less-loader'
      ]
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'scss-loader'
      ]
    },
    {
      test: /\.(png|jpg|jpeg|svg|gif)$/,
      use: [
        'file-loader'
      ]
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        'file-loader'
      ]
    },
    {
      test: /\.(pptx|zip)$/,
      loader: "file-loader",
      options: {
        name: '[name].[ext]'
      }
    }]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.ejs',
      chunks: ["app"],
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      template: "./silent_renew/silent_renew.html",
      chunks: ["silentRenew"],
      filename: "silent_renew.html"
    }),
    new webpack.DefinePlugin({
      CONSTANTS: {
        PRODUCTION: mode === 'production'
      }
    }),
    new webpack.IgnorePlugin(/^(fs|ipc|ignore)$/)
    // new webpack.IgnorePlugin(/^(fs|ipc|cfg|ignore)$/),
    // new CopyWebpackPlugin([
    //   {
    //     from: 'js/Config/*.cfg',
    //     to: '[name].[ext]',
    //     toType: 'template'
    //   }
    // ])
  ]
}