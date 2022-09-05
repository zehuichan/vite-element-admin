import Vue, { effectScope, getCurrentInstance, reactive } from 'vue'
import VueRouter from 'vue-router'

import { Layout, REDIRECT_NAME } from './constant'

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

export const LoginRoute = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue')
}

export const RedirectRoute = {
  path: '/redirect',
  component: Layout,
  children: [
    {
      path: '/redirect/:path(.*)',
      name: REDIRECT_NAME,
      component: () => import('@/views/redirect/index.vue')
    }
  ]
}

export const ErrorPageRoute = {
  path: '/404',
  component: () => import('@/views/error-page/404.vue'),
  hidden: true
}

export const PageNotFoundRoute = { path: '*', redirect: '/404', hidden: true }

export const constantRoutes = [
  LoginRoute,
  RedirectRoute,
  ErrorPageRoute
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

export function useRouter() {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('must be called in setup')
  return vm.proxy.$router
}

let currentRoute

export function useRoute() {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('must be called in setup')

  if (!currentRoute) {
    const scope = effectScope(true)
    scope.run(() => {
      const { $router } = vm.proxy
      currentRoute = reactive(Object.assign({}, $router.currentRoute))
      $router.afterEach(to => {
        Object.assign(currentRoute, to)
      })
    })
  }

  return currentRoute
}
