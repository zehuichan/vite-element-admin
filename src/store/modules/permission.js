import { defineStore } from 'pinia'
import { store } from '..'

import { priv } from '@/api'
import { constantRoutes } from '@/router'

import { flatMultiLevelRoutes, routerGenerator, transformObjToRoute } from '@/router/routeHelper'
import { transformRouteToMenu } from '@/router/menuHelper'

export const usePermissionStore = defineStore({
  id: 'permission',
  state: () => ({
    menus: [],
    routers: [],
    // Whether the route has been dynamically added
    // 路由是否动态添加
    isDynamicAddedRoute: false,
    // To trigger a menu update
    // 触发菜单更新
    lastBuildMenuTime: 0
  }),
  getters: {
    getMenus() {
      return this.menus
    },
    getIsDynamicAddedRoute() {
      return this.isDynamicAddedRoute
    }
  },
  actions: {
    // 设置动态菜单
    setMenus(menus) {
      this.menus = menus
      menus?.length > 0 && this.setLastBuildMenuTime()
    },
    // 设置动态路由
    setRouters(routers) {
      this.routers = constantRoutes.concat(routers)
    },
    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime()
    },
    setDynamicAddedRoute(added) {
      this.isDynamicAddedRoute = added
    },
    resetState() {
      this.isDynamicAddedRoute = false
      this.menus = []
      this.lastBuildMenuTime = 0
    },
    async buildRoutesAction() {
      let routeList = []

      try {
        const res = await priv()
        routeList = res.data
      } catch (error) {
        console.log(error)
      }

      // 清洗数据
      routeList = routerGenerator(routeList)

      // Dynamically introduce components
      // 动态引入组件
      routeList = transformObjToRoute(routeList)

      // Background routing to menu structure
      // 后台路由到菜单结构
      const menus = transformRouteToMenu(routeList)
      this.setMenus(menus)

      // Convert multi-level routing to level 2 routing
      // 将多级路由转换为 2 级路由
      routeList = flatMultiLevelRoutes(routeList)
      this.setRouters(routeList)

      return routeList
    }
  }
})

// Need to be used outside the setup
export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
