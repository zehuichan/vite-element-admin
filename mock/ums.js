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

const roles = Mock.mock({
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
      path: '/',
      component: 'Layout',
      redirect: '/dashboard',
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
      path: '/dynamicform',
      component: 'Layout',
      hidden: false,
      children: [
        {
          path: '',
          component: 'DynamicForm',
          hidden: false,
          name: 'DynamicForm',
          meta: { title: '动态配置表单', icon: 'el-icon-video-camera', roles: ['admin'], },
        },
      ]
    },
    {
      path: '/tableDemo',
      component: 'Layout',
      hidden: false,
      children: [
        {
          path: '',
          component: 'TableDemo',
          hidden: false,
          name: 'TableDemo',
          meta: { title: '综合表格demo', icon: 'el-icon-s-grid', roles: ['admin'], },
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
          component: 'Test',
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
              component: 'Test',
              hidden: false,
              name: 'Menu1-2-1',
              meta: { title: 'Menu 1-2-1', roles: ['admin'], },
            },
            {
              path: '/nested/menu/menu1-2-2',
              component: 'Test',
              hidden: false,
              name: 'Menu1-2-2',
              meta: { title: 'Menu 1-2-2', roles: ['admin'], },
            }
          ]
        },
        {
          path: '/nested/menu/menu1-3',
          component: 'Test',
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
          path: '/ums/roles',
          component: 'Role',
          hidden: false,
          name: 'Role',
          meta: { title: '角色管理', roles: ['admin'] }
        },
        {
          path: '/ums/roles/assign-menu/:id',
          component: 'AssignMenu',
          hidden: true,
          name: 'AssignMenu',
          meta: { title: '分配菜单', noCache: true, activeMenu: '/ums/roles', roles: ['admin'] }
        },
        {
          path: '/ums/roles/assign-btn/:id',
          component: 'AssignBtn',
          hidden: true,
          name: 'AssignBtn',
          meta: { title: '分配权限', noCache: true, activeMenu: '/ums/roles', roles: ['admin'] }
        },
        {
          path: '/ums/org',
          component: 'Org',
          hidden: false,
          name: 'Org',
          meta: { title: '机构管理', roles: ['admin'] }
        },
        {
          path: '/ums/menu',
          component: 'Menu',
          hidden: false,
          name: 'Menu',
          meta: { title: '菜单管理', roles: ['admin'] }
        },
      ]
    },
  ]
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
    url: '/vue-admin-template/ums/roles/list',
    type: 'get',
    response: config => {
      const { p, ps } = config.query
      const total = roles.items.length
      const begin = +(p - 1) * ps
      const end = +p * ps
      const items = roles.items.slice(begin, end)
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
  }
]
