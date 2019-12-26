'use strict'
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const devConfig = require('./webpack.dev.config')
const prodConfig = require('./webpack.prod.config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const conf = require('../config')

module.exports = (env, argv) => {
  // process.env.NODE_ENV
  const config = argv.mode === 'development' ? devConfig : prodConfig

  const webpackConfig = merge(baseConfig, config)
  if (argv.mode === 'development') {
    return new Promise((resolve, reject) => {
      portfinder.basePort = process.env.PORT || conf.dev.port
      portfinder.getPort((err, port) => {
        if (err) {
          reject(err)
        } else {
          process.env.PORT = port
          webpackConfig.devServer.port = port
    
          webpackConfig.plugins.push(new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
              messages: [`Your application is running here: http://${webpackConfig.devServer.host}:${port}`],
            }
          }))
          resolve(webpackConfig)
        }
      })
    })
  }
  return webpackConfig
}
