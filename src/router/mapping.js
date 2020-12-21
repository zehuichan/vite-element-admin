// require('login/index').default   // 同步的方式
// () => import('login/index')      // 异步的方式，懒加载

import Layout from '@/layout'
// RouteView
const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

const mapping = {
  Layout: Layout,
  RouteView: RouteView,
  Test: () => import('@/views/test/index'),

  // index
  Dashboard: () => import('@/views/dashboard/index'),
  Documentation: () => import('@/views/documentation/index'),
  Permission: () => import('@/views/permission/index'),
  DynamicForm: () => import('@/views/dynamic-form/index'),
  Demo: () => import('@/views/demo'),
  TableDemo: () => import('@/views/table-demo/index'),
  Nested: () => import('@/views/nested/index'),

  // ums
  User: () => import('@/views/ums/user/index'),
  AssignRole: () => import('@/views/ums/user/assign-role'),

  Role: () => import('@/views/ums/role/index'),
  AssignMenu: () => import('@/views/ums/role/assign-menu'),
  AssignBtn: () => import('@/views/ums/role/assign-btn'),

  Org: () => import('@/views/ums/org/index'),
  Menu: () => import('@/views/ums/menu/index'),
}


export default mapping