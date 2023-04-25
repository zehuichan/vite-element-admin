// Register icon sprite
import 'virtual:svg-icons-register'
// unocss
import 'virtual:uno.css'
import '@unocss/reset/normalize.css'

import Vue from 'vue'
import App from './App.vue'

// global css
import './assets/styles/index.scss'

import { setupElement } from '@/install/framework/element'
import { store } from './store'
import { router } from './router'
import { setupGuard } from './router/guard'
import { registerComponents } from './components'

function bootstrap() {

  setupElement(Vue)
  setupGuard(router)
  registerComponents(Vue)

  Vue.config.productionTip = false

  new Vue({
    router,
    pinia: store,
    render: h => h(App)
  }).$mount('#app')
}

bootstrap()
console.table(__APP_INFO__)
