// Register icon sprite
import 'virtual:svg-icons-register'

import Vue from 'vue'
import App from './App.vue'

// A modern alternative to CSS resets
import 'normalize.css/normalize.css'
// global css
import './styles/index.scss'

import { setupElement } from '@/plugins/element'
import store from './store'
import router from './router'
import { setupGuard } from './router/guard'
import { setupGlobalFilters } from './filters'
import { registerComponents } from './components'

setupElement(Vue)
setupGuard(router)
setupGlobalFilters(Vue)
registerComponents(Vue)

Vue.config.productionTip = false
console.log(__APP_INFO__)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
