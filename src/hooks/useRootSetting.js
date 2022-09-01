import { computed } from 'vue'

import { useAppStore } from '@/store'

export function useRootSetting() {
  const appStore = useAppStore()

  const getOpenKeepAlive = computed(
    () => appStore.getProjectConfig.openKeepAlive
  )

  const getShowLogo = computed(() => appStore.getProjectConfig.showLogo)

  const getShowBreadCrumb = computed(
    () => appStore.getProjectConfig.showBreadCrumb
  )

  function setRootSetting(setting) {
    appStore.setProjectConfig(setting)
  }

  return {
    setRootSetting,

    getOpenKeepAlive,
    getShowLogo,
    getShowBreadCrumb
  }
}
