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

const menu = Mock.mock({
  items: [
    {
      id: '@id',
      path: '/dashboard',
      hidden: true,
      name: 'Dashboard',
      meta: {
        title: '首页',
        icon: 'el-icon-orange'
      },
    },
    {
      id: '@id',
      title: '会员管理',
      path: '/mms',
      icon: 'el-icon-user',
      children: [
        {
          id: '@id',
          title: '会员管理',
          key: '/mms/member',
        },
      ]
    },
    {
      id: '@id',
      title: '商品管理',
      key: '/pms',
      icon: 'el-icon-goods',
      children: [
        {
          id: '@id',
          title: '商品管理',
          key: '/pms/product'
        },
        {
          id: '@id',
          title: '商品类型管理',
          key: '/pms/cate'
        },
      ]
    },
    {
      id: '@id',
      title: '订单管理',
      key: '/oms',
      icon: 'el-icon-s-order',
      children: [
        {
          id: '@id',
          title: '订单管理',
          key: '/oms/order'
        },
      ]
    },
    {
      id: '@id',
      title: '内容发布',
      key: '/cms',
      icon: 'el-icon-magic-stick',
      children: [
        {
          id: '@id',
          title: '直播间',
          key: '/cms/live'
        },
        {
          id: '@id',
          title: '小健康',
          key: '/cms/healthy'
        },
      ]
    },
    {
      id: '@id',
      title: '活动营运',
      key: '/sms',
      icon: 'el-icon-collection-tag',
      children: [
        {
          id: '@id',
          title: '活动推广',
          key: '/sms/flash'
        },
        {
          id: '@id',
          title: '专题推荐',
          key: '/sms/subject'
        },
      ]
    },
    {
      id: '@id',
      title: '基础配置',
      key: '/bms',
      icon: 'el-icon-bangzhu',
      children: [
        {
          id: '@id',
          title: '基础设置',
          key: '/bms/base'
        },
        {
          id: '@id',
          title: '关于我们',
          key: '/bms/about'
        },
      ]
    },
    {
      id: '@id',
      title: '权限管理',
      key: '/ums',
      icon: 'el-icon-cpu',
      children: [
        {
          id: '@id',
          title: '用户管理',
          key: '/ums/admin'
        },
        {
          id: '@id',
          title: '角色管理',
          key: '/ums/role'
        },
        {
          id: '@id',
          title: '菜单管理',
          key: '/ums/menu'
        },
      ]
    },
  ]
})

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
