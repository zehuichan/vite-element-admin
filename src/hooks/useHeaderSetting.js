import { computed } from 'vue'

import { useAppStore } from '@/store'

export function useHeaderSetting() {
  const appStore = useAppStore()

  const getFixed = computed(() => appStore.getHeaderSetting.fixed)
  const getShowHeader = computed(() => appStore.getHeaderSetting.show)
  const getShowSearch = computed(() => appStore.getHeaderSetting.showSearch)
  const getShowFullScreen = computed(() => appStore.getHeaderSetting.showFullScreen)
  const getShowNotice = computed(() => appStore.getHeaderSetting.showNotice)
  const getShowSetting = computed(() => appStore.getHeaderSetting.showSetting)

  // Set header configuration
  function setHeaderSetting(headerSetting) {
    appStore.setProjectConfig({ headerSetting })
  }

  return {
    setHeaderSetting,

    getFixed,
    getShowHeader,
    getShowSearch,
    getShowFullScreen,
    getShowNotice,
    getShowSetting
  }
}
