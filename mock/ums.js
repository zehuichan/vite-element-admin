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
      id: '@id',
      path: '/dashboard',
      component: 'dashboard',
      redirect: '/dashboard',
      hidden: false,
      name: 'Dashboard',
      meta: {
        title: '首页',
        icon: 'el-icon-orange',
        role: ['admin']
      }
    },
    {
      id: '@id',
      path: '/mms',
      component: 'member',
      hidden: false,
      name: 'Member',
      meta: {
        title: '会员管理',
        icon: 'el-icon-user',
        role: ['admin']
      },
    },
    {
      id: '@id',
      path: '/pms',
      component: null,
      hidden: false,
      meta: {
        title: '商品管理',
        icon: 'el-icon-goods',
        role: ['admin']
      },
      children: [
        {
          id: '@id',
          path: 'product',
          component: 'product',
          name: 'Product',
          meta: {
            title: '商品管理',
            role: ['admin']
          },
        },
        {
          id: '@id',
          path: 'cate',
          component: 'cate',
          name: 'Cate',
          meta: {
            title: '商品类型管理',
            role: ['admin']
          },
        },
      ]
    },
    {
      id: '@id',
      path: '/oms',
      component: 'order',
      redirect: '/oms/order',
      hidden: false,
      name: 'Order',
      meta: {
        title: '订单管理',
        icon: 'el-icon-s-order',
        role: ['admin']
      }
    },
    {
      id: '@id',
      path: '/cms',
      component: null,
      hidden: false,
      meta: {
        title: '内容发布',
        icon: 'el-icon-magic-stick',
        role: ['admin']
      },
      children: [
        {
          id: '@id',
          path: 'live',
          component: 'live',
          name: 'Live',
          meta: {
            title: '直播间',
            role: ['admin']
          }
        },
        {
          id: '@id',
          path: 'article',
          component: 'article',
          name: 'Article',
          meta: {
            title: '咨询文章',
            role: ['admin']
          }
        },
        {
          id: '@id',
          path: 'course',
          component: 'course',
          name: 'Course',
          meta: {
            title: '课程',
            role: ['admin']
          }
        },
      ]
    },
    {
      id: '@id',
      path: '/sms',
      component: null,
      hidden: false,
      meta: {
        title: '活动营运',
        icon: 'el-icon-collection-tag',
        role: ['admin']
      },
      children: [
        {
          id: '@id',
          path: 'flash',
          component: 'flash',
          name: 'Flash',
          meta: {
            title: '活动推广',
            role: ['admin']
          }
        },
        {
          id: '@id',
          path: 'subject',
          component: 'subject',
          name: 'Subject',
          meta: {
            title: '专题推荐',
            role: ['admin']
          }
        },
      ]
    },
    {
      id: '@id',
      path: '/bms',
      component: null,
      hidden: false,
      meta: {
        title: '基础配置',
        icon: 'el-icon-bangzhu',
        role: ['admin']
      },
      children: [
        {
          id: '@id',
          path: 'base',
          component: 'base',
          name: 'Base',
          meta: {
            title: '基础设置',
            role: ['admin']
          }
        },
        {
          id: '@id',
          path: 'about',
          component: 'about',
          name: 'About',
          meta: {
            title: '关于我们',
            role: ['admin']
          }
        },
      ]
    },
    {
      id: '@id',
      path: '/ums',
      component: null,
      hidden: false,
      meta: {
        title: '权限管理',
        icon: 'el-icon-cpu',
        role: ['admin']
      },
      children: [
        {
          id: '@id',
          path: 'admin',
          component: 'admin',
          name: 'Admin',
          meta: {
            title: '用户管理',
            role: ['admin']
          }
        },
        {
          id: '@id',
          path: 'role',
          component: 'role',
          name: 'Role',
          meta: {
            title: '角色管理',
            role: ['admin']
          }
        },
        {
          id: '@id',
          path: 'menu',
          component: 'menu',
          name: 'Menu',
          meta: {
            title: '菜单管理',
            role: ['admin']
          }
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
