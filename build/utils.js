'use strict'

const path = require('path')
const glob = require('glob')
const packageConfig = require('../package.json')
const config = require('./config')

module.exports = {
  resolve(dir) {
    return path.join(__dirname, '..', dir)
  },

  assetsPath(_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory

    return path.posix.join(assetsSubDirectory, _path)
  },

  createNotifierCallback() {
    const notifier = require('node-notifier')

    return (severity, errors) => {
      if (severity !== 'error') return

      const error = errors[0]
      const filename = error.file && error.file.split('!').pop()

      notifier.notify({
        title: packageConfig.name,
        message: severity + ': ' + error.name,
        subtitle: filename || '',
        icon: path.join(__dirname, 'logo.png')
      })
    }
  },

  getEntries({ path, plugin }) {
    const entries = {}

    // 读取 src 目录，并进行路径裁剪
    glob.sync(path).forEach((entry) => {
      /**
       * path.basename 提取出用‘/' 隔开的path的最后一部分，除第一个参数外其余是需要过滤的字符串
       * path.extname 获取文件后缀
       */
      const tmp = entry.split('/').splice(-3)
      const moduleName = tmp.slice(1, 2)
      entries[moduleName] = [...plugin, entry]
    })

    // 获取的主入口如下： { main: './src/module/index/main.js', test: './src/module/test/test.js' }
    return entries
  },
}
