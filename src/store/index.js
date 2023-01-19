import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.use(PiniaVuePlugin)

export * from './modules/app'
export * from './modules/permission'
export * from './modules/multipleTab'
export * from './modules/user'

export const store = createPinia()
