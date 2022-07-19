import { menuList } from '@/api/ums'
import { constantRoutes } from '@/router'
import mapping from '@/router/mapping'

/**
 *
 * @param serverRouter
 * @returns {[]}
 */
function generatorDynamicRouter(serverRouter) {
  const res = []

  serverRouter.forEach(route => {
    const tmp = { ...route }
    if (tmp.component === 'Layout') {
      tmp.component = mapping['Layout']
    } else {
      tmp.component = mapping[tmp.component]
    }

    if (tmp.children) {
      tmp.children = generatorDynamicRouter(tmp.children)
    }

    res.push(tmp)
  })

  return res
}

/**
 * Use meta.roles to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      let permissionRouters
      menuList().then(response => {
        const { data } = response
        permissionRouters = generatorDynamicRouter(data)
        permissionRouters = [...permissionRouters, { path: '*', redirect: '/404', hidden: true }]
        if (roles.includes('admin')) {
          accessedRoutes = permissionRouters || []
        } else {
          accessedRoutes = filterAsyncRoutes(permissionRouters, roles)
        }
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
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
