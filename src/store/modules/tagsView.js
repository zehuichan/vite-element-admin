import { toRaw, unref } from 'vue'
import { defineStore } from 'pinia'
import { store } from '..'

import { getRawRoute } from '@/utils'
import { Cache, MULTIPLE_TABS_KEY } from '@/utils/cache'

import { useGo, useRedo } from '@/hooks/usePage'

import projectSetting from '@/settings/projectSetting'

import { LOGIN_NAME, PAGE_NOT_FOUND_NAME, REDIRECT_NAME } from '@/router/constant'

//保留固定路由
function filterAffixTabs(routes) {
  const tabs = []
  routes &&
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      tabs.push(toRaw(route))
    }
  })
  return tabs
}

const getToTarget = (tabItem) => {
  const { params, path, query } = tabItem
  return {
    params: params || {},
    path,
    query: query || {}
  }
}

const cacheTab = projectSetting.multiTabsSetting.cache

export const useMultipleTabStore = defineStore({
  id: 'multiple-tab',
  state: () => ({
    cacheTabList: new Set(),
    tabList: cacheTab ? Cache.getItem(MULTIPLE_TABS_KEY) || [] : [],
    // Index of the last moved tab
    lastDragEndIndex: 0
  }),
  getters: {
    getTabList() {
      return this.tabList
    },
    getCachedTabList() {
      return Array.from(this.cacheTabList)
    },
    getLastDragEndIndex() {
      return this.lastDragEndIndex
    }
  },
  actions: {
    async updateCacheTab() {
      const cacheMap = new Set()

      for (const tab of this.tabList) {
        const item = getRawRoute(tab)
        // Ignore the cache
        const needCache = !item.meta?.ignoreKeepAlive
        if (!needCache) {
          continue
        }
        const { name } = item
        cacheMap.add(name)
      }
      this.cacheTabList = cacheMap
    },
    clearCacheTabs() {
      this.cacheTabList = new Set()
    },
    resetState() {
      this.tabList = []
      this.clearCacheTabs()
    },
    goToPage(router) {
      const go = useGo(router)
      const len = this.tabList.length
      const { path } = router.currentRoute

      let toPath = '/dashboard'

      if (len > 0) {
        const page = this.tabList[len - 1]
        const p = page.fullPath || page.path
        if (p) {
          toPath = p
        }
      }
      // Jump to the current page and report an error
      path !== toPath && go(toPath, true)
    },
    async refreshPage(router) {
      const { currentRoute } = router
      const { name } = currentRoute

      const findTab = this.getCachedTabList.find((item) => item === name)
      if (findTab) {
        this.cacheTabList.delete(findTab)
      }
      const redo = useRedo(router)
      await redo()
    },
    addTab(route) {
      const { path, name, fullPath, params, query } = getRawRoute(route)

      // 404 The page does not need to add a tab
      if ([LOGIN_NAME, REDIRECT_NAME, PAGE_NOT_FOUND_NAME].includes(name)) {
        return
      }

      let updateIndex = -1
      // Existing pages, do not add tabs repeatedly
      const tabHasExits = this.tabList.some((tab, index) => {
        updateIndex = index
        return (tab.fullPath || tab.path) === (fullPath || path)
      })

      // If the tab already exists, perform the update operation
      if (tabHasExits) {
        const curTab = toRaw(this.tabList)[updateIndex]
        if (!curTab) {
          return
        }
        curTab.params = params || curTab.params
        curTab.query = query || curTab.query
        curTab.fullPath = fullPath || curTab.fullPath
        this.tabList.splice(updateIndex, 1, curTab)
      } else {
        this.tabList.push(getRawRoute(route))
      }

      this.updateCacheTab()
      cacheTab && Cache.setItem(MULTIPLE_TABS_KEY, this.tabList)
    },
    async closeTab(tab, router) {
      const close = (route) => {
        const { fullPath, meta: { affix } = {} } = route
        if (affix) {
          return
        }
        const index = this.tabList.findIndex(
          (item) => item.fullPath === fullPath
        )
        index !== -1 && this.tabList.splice(index, 1)
      }

      const { currentRoute } = router

      const { path } = currentRoute
      if (path !== tab.path) {
        // Closed is not the activation tab
        close(tab)
        return
      }

      // Closed is activated atb
      let toTarget = {}

      const index = this.tabList.findIndex((item) => item.path === path)

      // If the current is the leftmost tab
      if (index === 0) {
        // There is only one tab, then jump to the homepage, otherwise jump to the right tab
        if (this.tabList.length === 1) {
          toTarget = '/dashboard'
        } else {
          //  Jump to the right tab
          const page = this.tabList[index + 1]
          toTarget = getToTarget(page)
        }
      } else {
        // Close the current tab
        const page = this.tabList[index - 1]
        toTarget = getToTarget(page)
      }
      close(currentRoute)
      router.replace(toTarget)
    },
    // Close the tab on the right and jump
    async closeLeftTabs(route, router) {
      const index = this.tabList.findIndex((item) => item.path === route.path)
      if (index > 0) {
        const leftTabs = this.tabList.slice(0, index)
        const pathList = []
        for (const item of leftTabs) {
          const affix = item?.meta?.affix ?? false
          if (!affix) {
            pathList.push(item.fullPath)
          }
        }
        console.log(pathList)
        this.bulkCloseTabs(pathList)
      }
      this.updateCacheTab()
    },
    // Close the tab on the left and jump
    async closeRightTabs(route, router) {
      const { path } = getRawRoute(route)
      const { currentRoute } = router
      const { path: curPath } = currentRoute
      if (path !== curPath) {
        return
      }
      const index = this.tabList.findIndex((item) => item.path === path)
      const rightTabs = this.tabList.slice(index + 1)
      for (const tab of rightTabs) {
        await this.closeTab(tab, router)
      }
      this.updateCacheTab()
    },
    // Close other tabs
    closeOtherTabs(route, router) {
      const closePathList = this.tabList.map((item) => item.fullPath)

      const pathList = []

      for (const path of closePathList) {
        if (path !== route.fullPath) {
          const closeItem = this.tabList.find((item) => item.path === path)
          if (!closeItem) {
            continue
          }
          const affix = closeItem?.meta?.affix ?? false
          if (!affix) {
            pathList.push(closeItem.fullPath)
          }
        }
      }
      this.bulkCloseTabs(pathList)
      this.updateCacheTab()
    },
    async closeAllTab(router) {
      this.tabList = this.tabList.filter((item) => item?.meta?.affix ?? false)
      this.clearCacheTabs()
      this.goToPage(router)
    },

    // Initialize the tabs
    async initTabs(routes) {
      const cacheTabs = filterAffixTabs(routes)
      cacheTabs.forEach((route) => {
        if (route.meta && route.meta.affix) {
          this.addTab(route)
        }
      })
    },
    // Sort the tabs
    async sortTabs() {
      cacheTab && Cache.setItem(MULTIPLE_TABS_KEY, this.tabList)
      this.lastDragEndIndex = this.lastDragEndIndex + 1
    },
    async bulkCloseTabs(pathList) {
      this.tabList = this.tabList.filter(
        (item) => !pathList.includes(item.fullPath)
      )
    },
    async setTabTitle(title, route) {
      const findTab = this.getTabList.find((item) => item === route)
      if (findTab) {
        findTab.meta.title = title
        await this.updateCacheTab()
      }
    },
    async updateTabPath(fullPath, route) {
      const findTab = this.getTabList.find((item) => item === route)
      if (findTab) {
        findTab.fullPath = fullPath
        findTab.path = fullPath
        await this.updateCacheTab()
      }
    }
  }
})

// Need to be used outside the setup
export function useMultipleTabStoreWithOut() {
  return useMultipleTabStore(store)
}
