import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VAction from './directive/action'

import './styles/scss/index.scss' // global css

import App from './App.vue'
import store from './store'
import router from './router'

import './permission' // permission control
import './error-log'

import * as filters from './filters' // global filters
import './constants'

// 如果想要中文版 element-ui，按如下方式声明
Vue.use(Element, {
  size: 'small', // set element-ui default size
})

// 常用自定义组件全量引入使用
Vue.use(VAction)

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
console.info('[INFO] ' + 'Vue', Vue.version)
console.info('[INFO] ' + 'Element', Element.version)
console.info('[INFO] ' + 'AppInfo', __APP_INFO__)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
