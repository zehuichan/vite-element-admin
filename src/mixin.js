import Vue from 'vue'
import { judgeAlert, judgeConfirm } from './utils/judge-info'

Vue.mixin({
  methods: {
    $judgeAlert: judgeAlert,
    $judgeConfirm: judgeConfirm,
    $navigateTo(url, json, target = '_self') {
      if (target === '_self') {
        this.$router.push({ path: url, query: json })
      } else {
        const { href } = this.$router.resolve({ path: url, query: json })
        window.open(href, '_blank')
      }
    },
    $redirectTo(url) {
      this.$router.replace(url)
    },
    $navigateBack() {
      this.$router.back()
    }
  }
})