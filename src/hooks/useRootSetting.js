import { computed } from 'vue'

import { useAppStore } from '@/store'

export function useRootSetting() {
  const appStore = useAppStore()

  const getOpenKeepAlive = computed(
    () => appStore.getProjectConfig.openKeepAlive
  )

  const getShowLogo = computed(() => appStore.getProjectConfig.showLogo)

  const getUseErrorHandle = computed(
    () => appStore.getProjectConfig.useErrorHandle
  )

  const getShowFooter = computed(() => appStore.getProjectConfig.showFooter)

  const getUseOpenBackTop = computed(
    () => appStore.getProjectConfig.useOpenBackTop
  )

  const getShowBreadCrumb = computed(
    () => appStore.getProjectConfig.showBreadCrumb
  )

  const getFullContent = computed(() => appStore.getProjectConfig.fullContent)

  function setRootSetting(setting) {
    appStore.setProjectConfig(setting)
  }

  return {
    setRootSetting,

    getOpenKeepAlive,
    getShowLogo,
    getUseErrorHandle,
    getShowFooter,
    getUseOpenBackTop,
    getShowBreadCrumb,
    getFullContent
  }
}
