import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Clickoutside from 'element-ui/lib/utils/clickoutside' // global directive
import VComponents from '@/constants/vcomponents' // global components
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import '@/icons' // icon
import '@/permission' // permission control

import * as filters from './filters' // global filters
import './constants'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
const { mockXHR } = require('../mock')
mockXHR()
// }

// 如果想要中文版 element-ui，按如下方式声明
Vue.use(Element, {
  size: Cookies.get('size') || 'small', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// 全局指令
Vue.directive('clickoutside', Clickoutside)

// 常用自定义组件全量引入使用
Vue.use(VComponents)

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.prototype.$navigateTo = function (url, json) {
  router.push({
    path: url,
    query: json
  })
}

Vue.prototype.$navigateBack = function () {
  router.back()
}

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
