import Vue from 'vue'
import * as enums from './enums'

Object.keys(enums).forEach(key => {
  Vue.filter(key + 'Filter', (val) => {
    const map = {}
    enums[key].forEach(item => {
      map[item.value] = item.label
    })
    return map[val]
  })
})
