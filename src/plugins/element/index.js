import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export function setupElement() {
  Vue.use(Element, { size: 'small' })
}
