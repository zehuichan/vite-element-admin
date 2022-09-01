import { useTitle } from '@vueuse/core'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import 'nprogress/nprogress.css'

import { PageNotFoundRoute } from '@/router'
import { LOGIN_NAME } from '@/router/constant'

import { useUserStoreWithOut } from '@/store/modules/user'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { useMultipleTabStoreWithOut } from '@/store'

// no redirect whitelist
const whiteList = ['/login', '/auth-redirect']

export function setupGuard(router) {
  createProgressGuard(router)
  createPermissionGuard(router)
  createStateGuard(router)
}

export function createProgressGuard(router) {
  const { isLoading } = useNProgress(null, { showSpinner: false })

  router.beforeEach((to, from, next) => {
    isLoading.value = true
    next()
  })

  router.afterEach(() => {
    isLoading.value = false
  })
}

export function createPermissionGuard(router) {
  const userStore = useUserStoreWithOut()
  const permissionStore = usePermissionStoreWithOut()

  router.beforeEach(async (to, from, next) => {
    // set page title
    useTitle(to.meta.title)

    // determine whether the user has logged in
    const token = userStore.getToken

    if (token) {
      if (to.path === '/login') {
        next('/')
      } else {
        if (permissionStore.getIsDynamicAddedRoute) {
          next()
        } else {
          try {
            // 用户信息
            await userStore.getUserInfoAction()
            // 菜单
            const routes = await permissionStore.buildRoutesAction()
            // 默认添加根路由
            routes.unshift({ path: '/', redirect: routes[0].children[0].path })
            // 动态添加可访问路由表
            routes.forEach((item) => {
              router.addRoute(item)
            })
            // 404
            router.addRoute(PageNotFoundRoute)
            console.log(routes)

            permissionStore.setDynamicAddedRoute(true)

            const redirectPath = from.query.redirect || to.path
            const redirect = decodeURIComponent(redirectPath)
            const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
            next(nextData)
          } catch (e) {
            console.log(e)
          }
        }
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        // in the free login whitelist, go directly
        next()
      } else {
        // other pages that do not have permission to access are redirected to the login page.
        next(`/login?redirect=${to.path}`)
      }
    }
  })
}

export function createStateGuard(router) {
  const tabStore = useMultipleTabStoreWithOut()
  const userStore = useUserStoreWithOut()
  const permissionStore = usePermissionStoreWithOut()
  router.afterEach((to) => {
    if (to.name === LOGIN_NAME) {
      permissionStore.resetState()
      tabStore.resetState()
      userStore.resetState()
    }
  })
}