import Mock from 'mockjs'

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
  'items|5': [{
    id: '@id',
    'name|1': ['商品管理员', '订单管理员', '超级管理员'],
    desc: '@ctitle',
    create_time: '@datetime',
    login_time: '@datetime',
    count: 0,
    status: 1
  }]
})

const menu = Mock.mock(
  [
    {
      path: '/dashboard',
      component: 'Layout',
      hidden: false,
      children: [
        {
          path: '/dashboard',
          component: 'Dashboard',
          hidden: false,
          name: 'Dashboard',
          meta: {title: '仪表板', icon: 'el-icon-orange', affix: true, role: ['admin']},
        },
      ]
    },
    {
      path: '/tpl',
      component: 'Layout',
      hidden: false,
      redirect: '/tpl/mall',
      meta: {title: '模板', icon: 'el-icon-monitor', role: ['admin']},
      children: [
        {
          path: '/tpl/mall',
          component: 'Mall',
          hidden: false,
          name: 'Mall',
          meta: {title: 'vant商城模板', role: ['admin']}
        },
        {
          path: '/tpl/vant',
          component: 'Vant',
          hidden: false,
          name: 'Vant',
          meta: {title: 'vant模板', role: ['admin']}
        },
        {
          path: '/ums/uniapp',
          component: 'Uniapp',
          hidden: false,
          name: 'Uniapp',
          meta: {title: 'uniapp模板', role: ['admin']}
        },
      ]
    },
    {
      path: '/ums',
      component: 'Layout',
      hidden: false,
      redirect: '/ums/admin',
      meta: {title: '权限管理', icon: 'el-icon-cpu', role: ['admin']},
      children: [
        {
          path: '/ums/admin',
          component: 'Admin',
          hidden: false,
          name: 'Admin',
          meta: {title: '用户管理', role: ['admin']}
        },
        {
          path: '/ums/role',
          component: 'Role',
          hidden: false,
          name: 'Role',
          meta: {title: '角色管理', role: ['admin']}
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

export default [
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
