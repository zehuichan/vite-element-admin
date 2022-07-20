import { menu } from '@/api/ums'
import { constantRoutes, asyncRoutes } from '@/router'
import {
  flatMultiLevelRoutes,
  transformObjToRoute,
  transformRouteToMenu
} from '@/router/generator-routers'

const state = {
  menus: [],
  routers: constantRoutes,
  addRouters: [],
  keepAliveComponents: [],
  // Whether the route has been dynamically added
  isDynamicAddedRoute: false
}

const mutations = {
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
  }
}

const actions = {
  buildRoutesAction({ commit }) {
    return new Promise(resolve => {
      menu().then(response => {
        let routes = []
        let routeList = []
        let menus = []
        const { data } = response

        // Dynamically introduce components
        // 动态引入组件
        routeList = transformObjToRoute(data)

        // Background routing to menu structure
        // 后台路由到菜单结构
        menus = transformRouteToMenu(data)

        // Convert multi-level routing to level 2 routing
        // 将多级路由转换为 2 级路由
        routeList = flatMultiLevelRoutes(routeList)
        routes = [...constantRoutes, ...routeList, ...asyncRoutes]
        commit('SET_ROUTES', routes)
        commit('SET_MENUS', menus)
        resolve(routes)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
