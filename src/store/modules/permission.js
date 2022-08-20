import { priv } from '@/api/permission'
import { constantRoutes } from '@/router'

import { flatMultiLevelRoutes, routerGenerator, transformObjToRoute } from '@/router/routeHelper'
import { transformRouteToMenu } from '@/router/menuHelper'

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
    state.routes = constantRoutes.concat(routes)
  },
  SET_DYNAMIC_ADDED_ROUTE: (state, added) => {
    state.isDynamicAddedRoute = added
  },
  RESET_STATE: (state) => {
    state.isDynamicAddedRoute = false
  }
}

const actions = {
  setDynamicAddedRoute({ commit }, val) {
    commit('SET_DYNAMIC_ADDED_ROUTE', val)
  },
  resetState({ commit }) {
    commit('RESET_STATE')
  },
  buildRoutesAction({ commit }) {
    return new Promise(resolve => {
      priv().then(res => {
        let routeList = []
        routeList = res.data

        // Dynamically introduce components
        // 动态引入组件
        routeList = routerGenerator(routeList)
        routeList = transformObjToRoute(routeList)

        // Background routing to menu structure
        // 后台路由到菜单结构
        const menus = transformRouteToMenu(routeList)
        commit('SET_MENUS', menus)

        // Convert multi-level routing to level 2 routing
        // 将多级路由转换为 2 级路由
        routeList = flatMultiLevelRoutes(routeList)
        commit('SET_ROUTES', routeList)

        resolve(routeList)
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
