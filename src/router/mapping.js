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

  // vcomponents
  VComponents: () => import('@/views/vcomponents/index'),
  VSearch: () => import('@/views/vcomponents/vsearch'),
  VTable: () => import('@/views/vcomponents/vtable'),
  VForm: () => import('@/views/vcomponents/vform'),
  VDialog: () => import('@/views/vcomponents/vdialog'),
  VDrawer: () => import('@/views/vcomponents/vdrawer'),
  VTreeSelect: () => import('@/views/vcomponents/vtreeselect'),
  VImageviewer: () => import('@/views/vcomponents/vimageviewer'),
  VExcel: () => import('@/views/vcomponents/vexcel'),
  VBadge: () => import('@/views/vcomponents/vbadge'),
  VEllipsis: () => import('@/views/vcomponents/vellipsis'),
  VCountdown: () => import('@/views/vcomponents/vcountdown'),
  VDescriptions: () => import('@/views/vcomponents/vdescriptions'),
  VQrcode: () => import('@/views/vcomponents/vqrcode'),
  VAction: () => import('@/views/vcomponents/vaction'),

  // index
  Dashboard: () => import('@/views/dashboard/index'),
  Documentation: () => import('@/views/documentation/index'),
  Permission: () => import('@/views/permission/index'),
  Nested: () => import('@/views/nested/index'),

  // ums
  User: () => import('@/views/ums/user/index'),
  AssignRole: () => import('@/views/ums/user/assign-role'),

  Role: () => import('@/views/ums/role/index'),
  AssignMenu: () => import('@/views/ums/role/assign-menu'),
  AssignBtn: () => import('@/views/ums/role/assign-btn'),

  Dictionary: () => import('@/views/ums/dictionary'),
  Menu: () => import('@/views/ums/menu'),
}


export default mapping