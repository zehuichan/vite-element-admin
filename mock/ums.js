const Mock = require('mockjs')

const admin = Mock.mock({
  'items|5': [{
    id: '@id',
    account: '@word',
    name: '@cname',
    email: '@email',
    create_time: '@datetime',
    login_time: '@datetime',
    mobile: /^1[385][1-9]\d{8}/,
    status: 1
  }]
})

const role = Mock.mock({
  items: [
    {
      id: '@id',
      name: '管理员',
      code: 'admin',
      create_time: '@datetime',
      login_time: '@datetime',
      status: 1
    },
    {
      id: '@id',
      name: 'SVIP',
      code: 'svip',
      create_time: '@datetime',
      login_time: '@datetime',
      status: 1
    },
    {
      id: '@id',
      name: '普通会员',
      code: 'user',
      create_time: '@datetime',
      login_time: '@datetime',
      status: 1
    },
  ]
})

const menu = Mock.mock(
  [
    {
      path: '/dashboard',
      component: 'Layout',
      hidden: false,
      children: [
        {
          path: '',
          component: 'Dashboard',
          hidden: false,
          name: 'Dashboard',
          meta: {
            title: '仪表板', icon: 'el-icon-odometer', affix: true, roles: ['admin'],
            permissions: [
              { action: 'add', desc: '新增' },
              { action: 'delete', desc: '删除' },
              { action: 'edit', desc: '修改' },
              { action: 'query', desc: '查询' },
              { action: 'import', desc: '导入' },
              { action: 'export', desc: '导出' },
            ]
          },
        },
      ]
    },
    {
      path: '/documentation',
      component: 'Layout',
      hidden: false,
      children: [
        {
          path: '',
          component: 'Documentation',
          hidden: false,
          name: 'Documentation',
          meta: { title: '文档', icon: 'el-icon-document', affix: true, roles: ['admin'], },
        },
      ]
    },
    {
      path: '/permission',
      component: 'Layout',
      hidden: false,
      children: [
        {
          path: '',
          component: 'Permission',
          hidden: false,
          name: 'Permission',
          meta: {
            title: '按钮权限测试页', icon: 'el-icon-lock', roles: ['admin'],
            permissions: [
              { action: 'add', desc: '新增' },
              { action: 'delete', desc: '删除' },
              { action: 'edit', desc: '修改' },
              { action: 'query', desc: '查询' },
              { action: 'import', desc: '导入' },
              { action: 'export', desc: '导出' },
            ]
          },
        },
      ]
    },
    {
      path: '/nested',
      component: 'Layout',
      redirect: '/nested/menu/menu1-1',
      hidden: false,
      meta: { title: '嵌套菜单', icon: 'el-icon-document', roles: ['admin'], },
      children: [
        {
          path: '/nested/menu/menu1-1',
          component: 'Nested',
          hidden: false,
          name: 'Menu1-1',
          meta: { title: 'Menu 1-1', roles: ['admin'], },
        },
        {
          path: '/nested/menu/menu1-2',
          component: 'RouteView',
          hidden: false,
          name: 'Menu1-2',
          meta: { title: 'Menu 1-2', roles: ['admin'], },
          children: [
            {
              path: '/nested/menu/menu1-2-1',
              component: 'Nested',
              hidden: false,
              name: 'Menu1-2-1',
              meta: { title: 'Menu 1-2-1', roles: ['admin'], },
            },
            {
              path: '/nested/menu/menu1-2-2',
              component: 'Nested',
              hidden: false,
              name: 'Menu1-2-2',
              meta: { title: 'Menu 1-2-2', roles: ['admin'], },
            }
          ]
        },
        {
          path: '/nested/menu/menu1-3',
          component: 'Nested',
          hidden: false,
          name: 'Menu1-3',
          meta: { title: 'Menu 1-3', roles: ['admin'], },
        },
      ]
    },
    {
      path: '/ums',
      component: 'Layout',
      hidden: false,
      redirect: 'noRedirect',
      meta: { title: '权限管理', icon: 'el-icon-setting', roles: ['admin'] },
      children: [
        {
          path: '/ums/user',
          component: 'User',
          hidden: false,
          name: 'User',
          meta: { title: '用户管理', roles: ['admin'] }
        },
        {
          path: '/ums/user/assign-roles/:id',
          component: 'AssignRole',
          hidden: true,
          name: 'AssignRole',
          meta: { title: '分配角色', noCache: true, activeMenu: '/ums/user', roles: ['admin'] }
        },
        {
          path: '/ums/role',
          component: 'Role',
          hidden: false,
          name: 'Role',
          meta: { title: '角色管理', roles: ['admin'] }
        },
        {
          path: '/ums/role/assign-menu/:id',
          component: 'AssignMenu',
          hidden: true,
          name: 'AssignMenu',
          meta: { title: '分配菜单', noCache: true, activeMenu: '/ums/role', roles: ['admin'] }
        },
        {
          path: '/ums/role/assign-btn/:id',
          component: 'AssignBtn',
          hidden: true,
          name: 'AssignBtn',
          meta: { title: '分配权限', noCache: true, activeMenu: '/ums/role', roles: ['admin'] }
        },
        {
          path: '/ums/menu',
          component: 'Menu',
          hidden: false,
          name: 'Menu',
          meta: { title: '菜单管理', roles: ['admin'] }
        },
        {
          path: '/ums/dictionary',
          component: 'Dictionary',
          hidden: false,
          name: 'Dictionary',
          meta: { title: '字典管理', roles: ['admin'] }
        },
      ]
    },
    {
      path: '/vcomponents',
      component: 'VComponents',
      hidden: true,
      name: 'VComponents',
      meta: {
        title: 'vcomponents', icon: 'el-icon-office-building', role: ['admin'],
        permissions: [
          { action: 'add', desc: '新增' },
          { action: 'delete', desc: '删除' },
          { action: 'edit', desc: '修改' },
          { action: 'query', desc: '查询' },
          { action: 'import', desc: '导入' },
          { action: 'export', desc: '导出' },
        ]
      }
    },
    {
      path: '/vcomponents/vsearch', component: 'VSearch', name: 'vsearch',
      hidden: true,
      meta: {
        title: 'vsearch', role: ['admin'],
      },
      target: '_blank'
    },
    {
      path: '/vcomponents/vtable', component: 'VTable', name: 'vtable',
      hidden: true,
      meta: {
        title: 'vtable', role: ['admin'],
      },
      target: '_blank'
    },
    {
      path: '/vcomponents/vform', component: 'VForm', name: 'vform',
      hidden: true,
      meta: {
        title: 'vform', role: ['admin'],
      },
      target: '_blank'
    },
    {
      path: '/vcomponents/vdialog', component: 'VDialog', name: 'vdialog',
      hidden: true,
      meta: {
        title: 'vdialog', role: ['admin'],
      },
      target: '_blank'
    },
    {
      path: '/vcomponents/vdrawer', component: 'VDrawer', name: 'vdrawer',
      hidden: true,
      meta: {
        title: 'vdrawer', role: ['admin'],
      },
      target: '_blank'
    },
    {
      path: '/vcomponents/vtreeselect', component: 'VTreeSelect', name: 'vtreeselect',
      hidden: true,
      meta: {
        title: 'vtreeselect', role: ['admin'],
      },
      target: '_blank'
    },
    {
      path: '/vcomponents/vimageviewer', component: 'VImageviewer', name: 'vimageviewer',
      hidden: true,
      meta: {
        title: 'vimageviewer', role: ['admin'],
      },
      target: '_blank'
    },
    {
      path: '/vcomponents/vexcel', component: 'VExcel', name: 'vexcel',
      hidden: true,
      meta: {
        title: 'vexcel', role: ['admin'],
      },
      target: '_blank'
    },
    {
      path: '/vcomponents/vbadge', component: 'VBadge', name: 'vbadge',
      hidden: true,
      meta: {
        title: 'vbadge', role: ['admin'],
      },
      target: '_blank'
    },
    {
      path: '/vcomponents/vellipsis', component: 'VEllipsis', name: 'vellipsis',
      hidden: true,
      meta: {
        title: 'vellipsis', role: ['admin'],
      },
      target: '_blank'
    },
    {
      path: '/vcomponents/vcountdown', component: 'VCountdown', name: 'vcountdown',
      hidden: true,
      meta: {
        title: 'vcountdown', role: ['admin'],
      },
      target: '_blank'
    },
    {
      path: '/vcomponents/vdescriptions', component: 'VDescriptions', name: 'vdescriptions',
      hidden: true,
      meta: {
        title: 'vdescriptions', role: ['admin'],
      },
      target: '_blank'
    },
    {
      path: '/vcomponents/vqrcode', component: 'VQrcode', name: 'vqrcode',
      hidden: true,
      meta: {
        title: 'vqrcode', role: ['admin'],
      },
      target: '_blank'
    },
    {
      path: '/vcomponents/vaction', component: 'VAction', name: 'vaction',
      hidden: true,
      meta: {
        title: 'vaction', role: ['admin'],
      },
      target: '_blank'
    },
  ]
)

const dict = Mock.mock(
  {
    order_status: [
      {
        'id': 9,
        'label': '保存',
        'value': 'SAVE',
        'sort': '1',
        'dictId': 7,
        'createTime': 1610175440000
      },
      {
        'id': 10,
        'label': '审核',
        'value': 'PASS',
        'sort': '2',
        'dictId': 7,
        'createTime': 1610175451000
      },
      {
        'id': 11,
        'label': '反审',
        'value': 'REJECT',
        'sort': '3',
        'dictId': 7,
        'createTime': 1610257350000
      },
      {
        'id': 29,
        'label': '关闭',
        'value': 'CLOSED',
        'sort': '4',
        'dictId': 7,
        'createTime': 1611020539000
      },
      {
        'id': 85,
        'label': '作废',
        'value': 'INVALID',
        'sort': '5',
        'dictId': 7,
        'createTime': 1614930131000
      },
      {
        'id': 86,
        'label': '中止',
        'value': 'STOP',
        'sort': '6',
        'dictId': 7,
        'createTime': 1614930142000
      },
      {
        'id': 87,
        'label': '恢复',
        'value': 'RECOVER',
        'sort': '7',
        'dictId': 7,
        'createTime': 1614930156000
      }
    ]
  }
)

module.exports = [
  {
    url: '/vue-admin-template/ums/admin/list',
    type: 'get',
    response: config => {
      const { p, ps } = config.query
      const total = admin.items.length
      const begin = +(p - 1) * ps
      const end = +p * ps
      const items = admin.items.slice(begin, end)
      return {
        code: 20000,
        data: {
          total: total,
          items: items
        }
      }
    }
  },
  {
    url: '/vue-admin-template/ums/role/list',
    type: 'get',
    response: config => {
      const { p, ps } = config.query
      const total = role.items.length
      const begin = +(p - 1) * ps
      const end = +p * ps
      const items = role.items.slice(begin, end)
      return {
        code: 20000,
        data: {
          total: total,
          items: items
        }
      }
    }
  },
  {
    url: '/vue-admin-template/ums/menu/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: menu
      }
    }
  },
  {
    url: '/vue-admin-template/ums/dict/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: dict
      }
    }
  }
]
