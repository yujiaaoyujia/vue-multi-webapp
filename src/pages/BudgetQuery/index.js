import Vue from 'vue'
import router from '@/router/BudgetQuery'
import App from './App'

// 引入脚本
import jdy from '@/assets/js/jdy'
import filters from '@/assets/js/filters'
import directive from '@/assets/js/directive'
import { initQingConfig } from '@/assets/js/yunzhijia'

// viewport 适配初始化
const hacks = require('viewport-units-buggyfill/viewport-units-buggyfill.hacks')
require('viewport-units-buggyfill').init({ hacks })

// 引入全局样式
import '@/assets/css/main.styl'
import '@/assets/css/vant.styl'


// 添加全局变量 jdy
window.jdy = jdy
Vue.prototype.$jdy = jdy

// 关闭生产模式下的提示
Vue.config.productionTip = false
// if (!jdy.getParam('debug')) {
//   console.log = console.error = console.debug = console.warn = console.info = window.alert = jdy.noop
// }

// 定义 vue 过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
// 定义 vue 自定义指令
Object.keys(directive).forEach(k => Vue.directive(k, directive[k]))

// 全局守卫
router.beforeEach((to, from, next) => {
  // 根据路由meta设置title
  const title = to.meta.title || document.title
  jdy.setTitle(title)
  next()
})

// 全局后置钩子
// router.afterEach((to, from) => {})

// 云之家jsbridge
initQingConfig()

// 创建vue实例
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
