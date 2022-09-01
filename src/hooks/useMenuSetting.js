import { computed, unref } from 'vue'

import { useAppStore } from '@/store'

export function useMenuSetting() {
  const appStore = useAppStore()

  const getMenuFixed = computed(() => appStore.getMenuSetting.fixed)
  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed)
  const getAccordion = computed(() => appStore.getMenuSetting.accordion)
  const getAnimation = computed(() => appStore.getMenuSetting.animation)
  const getMenuBackgroundColor = computed(
    () => appStore.getMenuSetting.backgroundColor
  )
  const getMenuTextColor = computed(() => appStore.getMenuSetting.textColor)
  const getMenuActiveTextColor = computed(
    () => appStore.getMenuSetting.activeTextColor
  )
  const getMenuWidth = computed(() => appStore.getMenuSetting.width)
  const getCollapsedWidth = computed(
    () => appStore.getMenuSetting.collapsedWidth
  )
  const getCalcContentWidth = computed(() => {
    const width = unref(getCollapsed)
      ? unref(getCollapsedWidth)
      : unref(getMenuWidth)
    return `calc(100% - ${unref(width)})`
  })

  function setMenuSetting(menuSetting) {
    appStore.setProjectConfig({ menuSetting })
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed)
    })
  }

  return {
    setMenuSetting,
    toggleCollapsed,

    getMenuFixed,
    getCollapsed,
    getAccordion,
    getAnimation,
    getMenuBackgroundColor,
    getMenuTextColor,
    getMenuActiveTextColor,
    getMenuWidth,
    getCollapsedWidth,
    getCalcContentWidth
  }
}
