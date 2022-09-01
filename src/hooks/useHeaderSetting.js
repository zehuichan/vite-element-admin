import { computed, unref } from 'vue'

import { useAppStore } from '@/store'

import { useMenuSetting } from './useMenuSetting'
import { useRootSetting } from './useRootSetting'

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

  const {
    getMenuMode,
    getSplit,
    getShowHeaderTrigger,
    getIsSidebarType,
    getIsMixSidebar,
    getIsTopMenu
  } = useMenuSetting()
  const {
    getShowBreadCrumb,
    getShowLogo
  } = useRootSetting()

  const getShowMixHeaderRef = computed(
    () => !unref(getIsSidebarType) && unref(getShowHeader)
  )

  const getHeaderTheme = computed(() => appStore.getHeaderSetting.theme)

  const getShowHeader = computed(() => appStore.getHeaderSetting.show)

  const getFixed = computed(() => appStore.getHeaderSetting.fixed)

  const getShowFullScreen = computed(
    () => appStore.getHeaderSetting.showFullScreen
  )

  const getShowNotice = computed(() => appStore.getHeaderSetting.showNotice)

  // Set header configuration
  function setHeaderSetting(headerSetting) {
    appStore.setProjectConfig({ headerSetting })
  }

  return {
    setHeaderSetting,

    getHeaderTheme,
    getShowNotice,
    getShowFullScreen,
    getShowHeader,
    getFixed,
    getShowMixHeaderRef,
    getShowFullHeaderRef,
    getShowInsetHeaderRef,
    getUnFixedAndFull
  }
}
