import { useTitle } from '@vueuse/core'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import { LOGIN_ROUTE, PAGE_NOT_FOUND_ROUTE, PageNotFoundRoute } from '@/router'
import { LOGIN_NAME, PAGE_NOT_FOUND_NAME } from '@/router/constant'

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
  router.beforeEach((to, from, next) => {
    nprogress.start()
    next()
  })

  router.afterEach(() => {
    nprogress.done()
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

    // Whitelist can be directly entered
    if (whiteList.includes(to.path)) {
      next()
      return
    }


    // token does not exist
    if (!token) {
      // You can access without permissions. You need to set the routing meta.ignoreAuth to true
      if (to.meta.ignoreAuth) {
        next()
        return
      }
      // redirect login page
      const redirectData = {
        path: LOGIN_ROUTE.path,
        replace: true
      }
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path
        }
      }
      next(redirectData)
      return
    }

    if (
      from.name === LOGIN_NAME &&
      to.name === PAGE_NOT_FOUND_NAME
    ) {
      next('/')
      return
    }

    // get userinfo while last fetch time is empty
    if (userStore.getLastUpdateTime === 0) {
      try {
        await userStore.getUserInfoAction()
      } catch (err) {
        next()
        return
      }
    }

    if (permissionStore.getIsDynamicAddedRoute) {
      next()
      return
    }

    const routes = await permissionStore.buildRoutesAction()

    // 默认添加根路由
    routes.unshift({ path: '/', redirect: routes[0].children[0].path })

    // 动态添加可访问路由表
    routes.forEach((route) => {
      router.addRoute(route)
    })

    router.addRoute(PageNotFoundRoute)

    permissionStore.setDynamicAddedRoute(true)

    // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
    if (to.name === PAGE_NOT_FOUND_NAME) {
      next({ path: to.fullPath, replace: true, query: to.query })
    } else {
      const redirectPath = from.query.redirect || to.path
      const redirect = decodeURIComponent(redirectPath)
      const nextData =
        to.path === redirect ? { ...to, replace: true } : { path: redirect }
      next(nextData)
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