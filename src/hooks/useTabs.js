import { useRouter } from '@/router'

import { useAppStore, useMultipleTabStore } from '@/store'

export const TableActionEnum = {
  REFRESH: 0,
  CLOSE_ALL: 1,
  CLOSE_LEFT: 2,
  CLOSE_RIGHT: 3,
  CLOSE_OTHER: 4,
  CLOSE_CURRENT: 5,
  CLOSE: 6
}

export function useTabs(_router) {
  const appStore = useAppStore()

  function canIUseTabs() {
    const { show } = appStore.getMultiTabsSetting
    if (!show) {
      throw new Error(
        'The multi-tab page is currently not open, please open it in the settings！'
      )
    }
    return !!show
  }

  const tabStore = useMultipleTabStore()
  const router = _router || useRouter()

  const { currentRoute } = router

  function getCurrentTab() {
    const route = currentRoute
    return tabStore.getTabList.find((item) => item.fullPath === route.fullPath)
  }

  async function updateTabTitle(title, tab) {
    const canIUse = canIUseTabs
    if (!canIUse) {
      return
    }
    const targetTab = tab || getCurrentTab()
    await tabStore.setTabTitle(title, targetTab)
  }

  async function updateTabPath(path, tab) {
    const canIUse = canIUseTabs
    if (!canIUse) {
      return
    }
    const targetTab = tab || getCurrentTab()
    await tabStore.updateTabPath(path, targetTab)
  }

  async function handleTabAction(action, tab) {
    const canIUse = canIUseTabs
    if (!canIUse) {
      return
    }
    const currentTab = getCurrentTab()
    switch (action) {
      case TableActionEnum.REFRESH:
        await tabStore.refreshPage(router)
        break

      case TableActionEnum.CLOSE_ALL:
        await tabStore.closeAllTab(router)
        break

      case TableActionEnum.CLOSE_OTHER:
        await tabStore.closeOtherTabs(currentTab, router)
        break

      case TableActionEnum.CLOSE_CURRENT:
      case TableActionEnum.CLOSE:
        await tabStore.closeTab(tab || currentTab, router)
        break
    }
  }

  return {
    refreshPage: () => handleTabAction(TableActionEnum.REFRESH),
    closeAll: () => handleTabAction(TableActionEnum.CLOSE_ALL),
    closeOther: () => handleTabAction(TableActionEnum.CLOSE_OTHER),
    closeCurrent: () => handleTabAction(TableActionEnum.CLOSE_CURRENT),
    close: (tab) => handleTabAction(TableActionEnum.CLOSE, tab),
    setTitle: (title, tab) => updateTabTitle(title, tab),
    updatePath: (fullPath, tab) => updateTabPath(fullPath, tab)
  }
}
