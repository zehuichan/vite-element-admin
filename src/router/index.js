import Vue from 'vue'
import VueRouter from 'vue-router'

import { ERROR_PAGE, LAYOUT, LOGIN_NAME, PAGE_NOT_FOUND_NAME, REDIRECT_NAME } from './constant'

const modulesRoutes = import.meta.glob('./modules/**/*.js', { eager: true })

const modules = Object.keys(modulesRoutes).reduce((modules, modulePath) => {
  const value = modulesRoutes[modulePath].default
  modules.push(...value)
  return modules
}, [])

console.log(modules)

Vue.use(VueRouter)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const ROOT_ROUTE = {
  path: '/',
  name: 'Root',
  redirect: '/dashboard'
}

export const LOGIN_ROUTE = {
  path: '/login',
  name: LOGIN_NAME,
  component: () => import('@/views/login/index.vue')
}

export const REDIRECT_ROUTE = {
  path: '/redirect',
  component: LAYOUT,
  children: [
    {
      path: '/redirect/*',
      name: REDIRECT_NAME,
      component: () => import('@/views/redirect/index.vue'),
      meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true,
        hideMenu: true
      }
    }
  ]
}

export const PAGE_NOT_FOUND_ROUTE = {
  path: '/404',
  component: LAYOUT,
  children: [
    {
      path: '',
      name: PAGE_NOT_FOUND_NAME,
      component: ERROR_PAGE,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hideMenu: false
      }
    }
  ]
}

export const PageNotFoundRoute = { path: '*', redirect: '/404', hidden: true }

export const constantRoutes = [
  ROOT_ROUTE,
  LOGIN_ROUTE,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
  ...modules
]

export function createRouter(routes = constantRoutes) {
  return new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: routes
  })
}

export const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
