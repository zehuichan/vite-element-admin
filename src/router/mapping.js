// require('login/index').default   // 同步的方式
// () => import('login/index')      // 异步的方式

import Layout from '@/layout'

const mapping = {
  Layout: Layout,

  // index
  Dashboard: () => import('@/views/dashboard/index'),

  // tpl
  Mall: () => import('@/views/tpl/mall'),
  Vant: () => import('@/views/tpl/vant'),

  // ums
  Admin: () => import('@/views/ums/admin'),
  Role: () => import('@/views/ums/role'),
  Menu: () => import('@/views/ums/menu'),
}


export default mapping