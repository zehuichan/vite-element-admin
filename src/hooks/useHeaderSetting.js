import { computed, unref } from 'vue'

import { useAppStore } from '@/store'

import { useMenuSetting } from '@/hooks/useMenuSetting'

export function useHeaderSetting() {
  const appStore = useAppStore()

  const getShowFullHeaderRef = computed(() => {
    return (
      unref(getShowMixHeaderRef) &&
      unref(getShowHeader) &&
      !unref(getIsTopMenu) &&
      !unref(getIsMixSidebar)
    )
  })

  const getUnFixedAndFull = computed(
    () => !unref(getFixed) && !unref(getShowFullHeaderRef)
  )

  const getShowInsetHeaderRef = computed(() => {
    const need = unref(getShowHeader)
    return (
      (need && !unref(getShowMixHeaderRef)) ||
      (need && unref(getIsTopMenu)) ||
      (need && unref(getIsMixSidebar))
    )
  })

  const { getIsSidebarType, getIsMixSidebar, getIsTopMenu } = useMenuSetting()

  const getShowMixHeaderRef = computed(
    () => !unref(getIsSidebarType) && unref(getShowHeader)
  )

  const getFixed = computed(() => appStore.getHeaderSetting.fixed)

  const getShowHeader = computed(() => appStore.getHeaderSetting.show)

  const getShowSearch = computed(() => appStore.getHeaderSetting.showSearch)

  const getShowFullScreen = computed(
    () => appStore.getHeaderSetting.showFullScreen
  )

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
    getShowSetting,
    getShowMixHeaderRef,
    getShowFullHeaderRef,
    getShowInsetHeaderRef,
    getUnFixedAndFull
  }
}
