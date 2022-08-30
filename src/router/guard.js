import { useTitle } from '@vueuse/core'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import 'nprogress/nprogress.css'

import { PageNotFoundRoute } from '@/router'
import { LOGIN_NAME } from '@/router/constant'

import store from '@/store'

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
  router.beforeEach(async (to, from, next) => {
    // set page title
    useTitle(to.meta.title)

    // determine whether the user has logged in
    const hasToken = store.getters.token

    if (hasToken) {
      if (to.path === '/login') {
        next('/')
      } else {
        if (store.getters.getIsDynamicAddedRoute) {
          next()
        } else {
          try {
            // 菜单
            const routes = await store.dispatch('permission/buildRoutesAction')
            // 默认添加根路由
            routes.unshift({ path: '/', redirect: routes[0].children[0].path })
            // 动态添加可访问路由表
            routes.forEach((item) => {
              router.addRoute(item)
            })
            // 404
            router.addRoute(PageNotFoundRoute)
            console.log(routes)

            await store.dispatch('permission/setDynamicAddedRoute', true)

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
  router.afterEach((to) => {
    if (to.name === LOGIN_NAME) {
      store.dispatch('user/resetState')
      store.dispatch('tagsView/resetState')
      store.dispatch('permission/resetState')
    }
  })
}