import { useTitle } from '@vueuse/core'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import cache, { TOKEN_KEY } from '@/utils/cache'
import store from '@/store'

// no redirect whitelist
const whiteList = ['/login', '/auth-redirect']

export function setupGuard(router) {
  createPermissionGuard(router)
  createProgressGuard(router)
}

export function createPermissionGuard(router) {
  router.beforeEach(async (to, from, next) => {
    // set page title
    useTitle(to.meta.title)

    // determine whether the user has logged in
    const hasToken = cache.getItem(TOKEN_KEY)

    if (hasToken) {
      if (to.path === '/login') {
        next('/')
      }
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roleList && store.getters.roleList.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const userInfo = await store.dispatch('user/getInfo')
          console.log('userInfo', userInfo)
          const routes = await store.dispatch('permission/buildRoutesAction')
          console.log('routes', routes)
          // 动态添加可访问路由表
          routes.forEach((item) => {
            router.addRoute(item)
          })

          const redirectPath = from.query.redirect || to.path
          const redirect = decodeURIComponent(redirectPath)
          const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }

          next(nextData)
        } catch (e) {
          console.log(e)
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

export function createProgressGuard(router) {
  const { isLoading } = useNProgress()
  router.beforeEach((to, from, next) => {
    isLoading.value = true
    next()
  })
  router.afterEach(() => {
    isLoading.value = false
  })
}