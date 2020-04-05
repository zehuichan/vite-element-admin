import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: {title: '仪表板', icon: 'dashboard'}
      }
    ]
  },
  {
    path: '/mms',
    component: Layout,
    meta: {title: '会员管理', icon: 'dashboard'},
    children: [
      {
        path: 'member',
        name: 'Member',
        component: () => import('@/views/dashboard/index'),
        meta: {title: '会员管理'}
      },
      {
        path: 'address',
        name: 'Address',
        component: () => import('@/views/dashboard/index'),
        meta: {title: '地址管理'}
      }
    ]
  },
  {
    path: '/pms',
    component: Layout,
    meta: {title: '商品管理', icon: 'dashboard'},
    children: [
      {
        path: 'product',
        name: 'Product',
        component: () => import('@/views/dashboard/index'),
        meta: {title: '商品管理'}
      },
      {
        path: 'cate',
        name: 'Cate',
        component: () => import('@/views/dashboard/index'),
        meta: {title: '商品类型管理'}
      }
    ]
  },
  {
    path: '/oms',
    component: Layout,
    children: [
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/dashboard/index'),
        meta: {title: '订单管理', icon: 'dashboard'}
      }
    ]
  },
  {
    path: '/cms',
    component: Layout,
    meta: {title: '内容发布', icon: 'dashboard'},
    children: [
      {
        path: 'live',
        name: 'Live',
        component: () => import('@/views/dashboard/index'),
        meta: {title: '直播间'}
      },
      {
        path: 'healthy',
        name: 'Healthy',
        component: () => import('@/views/dashboard/index'),
        meta: {title: '小健康'}
      }
    ]
  },
  {
    path: '/sms',
    component: Layout,
    meta: {title: '活动营运', icon: 'dashboard'},
    children: [
      {
        path: 'flash',
        name: 'Flash',
        component: () => import('@/views/dashboard/index'),
        meta: {title: '活动推广'}
      },
      {
        path: 'subject',
        name: 'Subject',
        component: () => import('@/views/dashboard/index'),
        meta: {title: '专题推荐'}
      }
    ]
  },
  {
    path: '/ums',
    component: Layout,
    meta: {title: '权限管理', icon: 'dashboard'},
    children: [
      {
        path: 'admin',
        name: 'Admin',
        component: () => import('@/views/dashboard/index'),
        meta: {title: '用户管理'}
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/dashboard/index'),
        meta: {title: '角色管理'}
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/dashboard/index'),
        meta: {title: '菜单管理'}
      }
    ]
  },

  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
