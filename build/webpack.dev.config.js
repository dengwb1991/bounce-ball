'use strict'
const config = require('../config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: './examples/index.tsx'
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    inline: true,
    open: true,
    historyApiFallback: true,
    host: config.dev.host,
    port: config.dev.port,
    compress: true,
    overlay: {
      errors: true,
      warnings: false
    },
    quiet: true,
    clientLogLevel: 'warning',
    progress: true,
    watchOptions: {
      poll: false
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
}