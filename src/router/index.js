import Vue, { getCurrentInstance, shallowRef } from 'vue'
import VueRouter from 'vue-router'
import { Layout } from './constant'

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

export const RootRoute = {
  path: '/',
  name: 'Root',
  redirect: '/dashboard'
}

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
      name: 'Redirect',
      component: () => import('@/views/redirect/index.vue')
    }
  ]
}

export const constantRoutes = [
  RootRoute,
  LoginRoute,
  RedirectRoute,
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue')
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue')
  },
  {
    path: '/500',
    component: () => import('@/views/error-page/500.vue')
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export function createRouter(routes = constantRoutes) {
  return new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: routes
  })
}

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}


export function useRouter() {
  const vm = getCurrentInstance()

  if (vm) {
    return router
  }

  console.warn('请在 setup 中调用。')

  return undefined
}

export function useRoute() {
  const currentRoute = shallowRef()
  if (!currentRoute.value) {
    const vm = getCurrentInstance()

    if (!vm) {
      console.warn('请在 setup 中调用。')
      return
    }

    currentRoute.value = vm.proxy.$route

    // 每次路由切换时，更新 route 参数
    const router = useRouter()
    router.afterEach((to) => (currentRoute.value = to))
  }

  return currentRoute
}

export default router
