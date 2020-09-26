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
            title: '仪表板', icon: 'el-icon-odometer', affix: true, role: ['admin'],
            permissions: [
              {action: 'add', desc: '新增'},
              {action: 'delete', desc: '删除'},
              {action: 'edit', desc: '修改'},
              {action: 'query', desc: '查询'},
              {action: 'import', desc: '导入'},
              {action: 'export', desc: '导出'},
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
          meta: {title: '文档', icon: 'el-icon-document', affix: true, role: ['admin'],},
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
            title: '按钮权限测试页', icon: 'el-icon-lock', role: ['admin'],
            permissions: [
              {action: 'add', desc: '新增'},
              {action: 'delete', desc: '删除'},
              {action: 'edit', desc: '修改'},
              {action: 'query', desc: '查询'},
              {action: 'import', desc: '导入'},
              {action: 'export', desc: '导出'},
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
          meta: {title: '动态配置表单', icon: 'el-icon-video-camera', affix: true, role: ['admin'],},
        },
      ]
    },
    {
      path: '/ums',
      component: 'Layout',
      hidden: false,
      redirect: 'noRedirect',
      meta: {title: '权限管理', icon: 'el-icon-setting', role: ['admin']},
      children: [
        {
          path: '/ums/user',
          component: 'User',
          hidden: false,
          name: 'User',
          meta: {title: '用户管理', role: ['admin']}
        },
        {
          path: '/ums/user/assign-role/:id',
          component: 'AssignRole',
          hidden: true,
          name: 'AssignRole',
          meta: {title: '分配角色', noCache: true, activeMenu: '/ums/user', role: ['admin']}
        },

        {
          path: '/ums/role',
          component: 'Role',
          hidden: false,
          name: 'Role',
          meta: {title: '角色管理', role: ['admin']}
        },
        {
          path: '/ums/role/assign-menu/:id',
          component: 'AssignMenu',
          hidden: true,
          name: 'AssignMenu',
          meta: {title: '分配菜单', noCache: true, activeMenu: '/ums/role', role: ['admin']}
        },
        {
          path: '/ums/role/assign-btn/:id',
          component: 'AssignBtn',
          hidden: true,
          name: 'AssignBtn',
          meta: {title: '分配权限', noCache: true, activeMenu: '/ums/role', role: ['admin']}
        },

        {
          path: '/ums/org',
          component: 'Org',
          hidden: false,
          name: 'Org',
          meta: {title: '机构管理', role: ['admin']}
        },

        {
          path: '/ums/menu',
          component: 'Menu',
          hidden: false,
          name: 'Menu',
          meta: {title: '菜单管理', role: ['admin']}
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
      const {p, ps} = config.query
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
      const {p, ps} = config.query
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
