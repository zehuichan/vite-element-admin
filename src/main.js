// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import '@/styles/scss/element-variables.scss'

import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'

import VComponents from '@/vcomponents' // global components

import VAction from '@/directive/action'

import '@/styles/scss/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import '@/icons' // icon
import '@/permission' // permission control

import * as filters from './filters' // global filters
import './constants'

import {judgeAlert, judgeConfirm} from '@/utils/judge-info'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
const {mockXHR} = require('../mock')
mockXHR()
// }

// 如果想要中文版 element-ui，按如下方式声明
Vue.use(Element, {
  size: Cookies.get('size') || 'small', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// 常用自定义组件全量引入使用
Vue.use(hljs.vuePlugin)
Vue.use(VComponents)
Vue.use(VAction)

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 统一消息提示
Vue.prototype.$judgeAlert = judgeAlert
Vue.prototype.$judgeConfirm = judgeConfirm

// 跳转
Vue.prototype.$navigateTo = function (url, json, target = '_self') {
  if (target === '_self') {
    router.push({path: url, query: json})
  } else {
    const {href} = router.resolve({path: url, query: json})
    window.open(href, '_blank')
  }
}

// 返回
Vue.prototype.$navigateBack = function () {
  router.back()
}

Vue.config.productionTip = false
console.log('Vue', Vue.version)
console.log('Element', Element.version)

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
