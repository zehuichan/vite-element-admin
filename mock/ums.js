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
    org: '@ctitle',
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
      name: 'Dashboard',
      hidden: false,
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
      }
    },
    {
      path: '/documentation',
      name: 'Documentation',
      hidden: false,
      meta: { title: '文档', icon: 'el-icon-document', affix: true, roles: ['admin'], },
    },
    {
      path: '/permission',
      name: 'Permission',
      hidden: false,
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
      }
    },
    {
      path: '/dynamicform',
      name: 'DynamicForm',
      hidden: false,
      meta: { title: '动态配置表单', icon: 'el-icon-video-camera', roles: ['admin'], }
    },
    {
      path: '/tableDemo',
      hidden: false,
      name: 'TableDemo',
      meta: { title: '综合表格demo', icon: 'el-icon-s-grid', roles: ['admin'], },
    },
    {
      path: '/ums',
      hidden: false,
      redirect: 'noRedirect',
      meta: { title: '权限管理', icon: 'el-icon-setting', roles: ['admin'] },
      children: [
        {
          path: '/ums/user',
          hidden: false,
          name: 'User',
          meta: { title: '用户管理', roles: ['admin'] }
        },
        {
          path: '/ums/user/assign-role/:id',
          hidden: true,
          name: 'AssignRole',
          meta: { title: '分配角色', noCache: true, activeMenu: '/ums/user', roles: ['admin'] }
        },
        {
          path: '/ums/role',
          hidden: false,
          name: 'Role',
          meta: { title: '角色管理', roles: ['admin'] }
        },
        {
          path: '/ums/roles/assign-menu/:id',
          hidden: true,
          name: 'AssignMenu',
          meta: { title: '分配菜单', noCache: true, activeMenu: '/ums/roles', roles: ['admin'] }
        },
        {
          path: '/ums/roles/assign-btn/:id',
          hidden: true,
          name: 'AssignBtn',
          meta: { title: '分配权限', noCache: true, activeMenu: '/ums/roles', roles: ['admin'] }
        },
        {
          path: '/ums/org',
          hidden: false,
          name: 'Org',
          meta: { title: '机构管理', roles: ['admin'] }
        },
        {
          path: '/ums/menu',
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
  }
]
