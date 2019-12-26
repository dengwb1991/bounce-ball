'use strict'
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    app: './src/index.ts',
  },
  output: {
    filename: 'bounce-ball.js',
    publicPath: '/',
    path: path.resolve(__dirname, '../dist'),
    library: 'bounce-ball',
    libraryTarget: 'umd'
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all'
    }
  }
}