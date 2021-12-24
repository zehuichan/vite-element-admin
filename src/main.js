// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import './styles/scss/element-variables.scss'

import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'

import VComponents from 'element-components' // global components

import VAction from './directive/action'
import VDict from './plugins/dict'

import './styles/scss/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import './icons' // icon
import './permission' // permission control
import './mixin'
import './error-log'

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

// 常用自定义组件全量引入使用
Vue.use(hljs.vuePlugin)
Vue.use(VComponents, {
  size: Cookies.get('size') || 'small', // set element-ui default size
})
Vue.use(VAction)
Vue.use(VDict)

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
console.info('[INFO] ' + 'Vue', Vue.version)
console.info('[INFO] ' + 'Element', Element.version)
console.info('[INFO] ' + 'VComponents', VComponents.version)
console.info('[INFO] ' + 'AppInfo', __APP_INFO__)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
