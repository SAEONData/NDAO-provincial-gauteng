const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const cwd = process.cwd()
const mode = 'production'
const CleanWebpackPlugin = require('clean-webpack-plugin');

/**
 * Config
 */
module.exports = {
  context: path.join(cwd, 'app'),
  mode,
  optimization: {
		// We no not want to minimize our code.
    minimize: false,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]App[\\/]JS[\\/]Config[\\/]/,
          name: "config",
          chunks: "all"
        }
      }
    }
  },
  entry: {
    app: ["babel-polyfill", './js/index.jsx'],
    silentRenew: ["./silent_renew/silent_renew.js"],
    // I used to declare React as a separate bundle, but I believe SplitChunks takes care of that for me.
    // react: [
    //   'react',
    //   'react-dom',
    //   'react-router-dom',
    //   'react-router',
    //   'redux',
    //   'react-redux',
    //   'react-router-redux',
    //   'history'
    // ],

    //Here I create my 'config' bundle, but these files still get bundled in the main bundle too, 
    //making this bundle useless
    // config : [
    //   './js/Config/serviceURLs.js',
    //   './js/secrets.cfg',
    //   './js/Config/colours.js',
    //   './js/Config/ui_config.js'
    // ]
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
    new CleanWebpackPlugin(['dist']),
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
        PROD: false,
        TEST: true,
        DEV: false
      }
    }),
    new HtmlWebpackPlugin({
      template: './index.ejs',
      chunks: ["config"],
      filename: "index.html"
    }),
    new webpack.IgnorePlugin(/^(fs|ipc|ignore)$/)
  ]
}