'use strict'

const config = require('./config')
const baseConfig = require('./webpack.config.base')
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const devWebpackConfig = merge(baseConfig, {
  mode: 'development',
  devtool: config.dev.devtool,
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    contentBase: 'dist',
    compress: true,
    host: process.env.HOST || config.dev.host,
    port: process.env.PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? {
      warnings: false,
      errors: true,
    } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }, {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'stylus-loader'
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),

    new webpack.HotModuleReplacementPlugin(),

    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   // favicon: 'favicon.png',
    //   inject: true
    // }),
  ]
})

// 配置生成的 html 文件，定义路径等
const pages = utils.getEntries(config.entries.html)
Object.keys(pages).forEach((key) => {
  const value = pages[key]
  const template = value[value.length - 1]
  const conf = {
    filename: key + '.html',
    template,
    inject: true,
    // hash: true,
    // favicon: 'src/root/favicon.ico',
    // minify: {
    //   removeComments: true,
    //   collapseWhitespace: true,
    //   removeAttributeQuotes: true
    // },
    // chunks: ['vendors', 'manifest', page], // 每个html引用的js模块
    // chunksSortMode: 'dependency',

    // excludeChunks 允许跳过某些 chunks, 而 chunks 告诉插件要引用 entry 里面的哪几个入口
    // 如何更好的理解这块呢？举个例子：比如本demo中包含两个模块（index和about），最好的当然是各个模块引入自己所需的js，
    // 而不是每个页面都引入所有的js，你可以把下面这个excludeChunks去掉，然后npm run build，然后看编译出来的index.html和about.html就知道了
    // filter：将数据过滤，然后返回符合要求的数据，Object.keys是获取JSON对象中的每个key
    excludeChunks: Object.keys(pages).filter(item => item !== key)
  }

  // 需要生成几个 html 文件，就配置几个 HtmlWebpackPlugin 对象
  devWebpackConfig.plugins.push(new HtmlWebpackPlugin(conf))
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${config.dev.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
