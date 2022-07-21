import Mock from 'mockjs'
import { resultSuccess } from './_util'

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
    }
  ]
})

const menu = Mock.mock([
  {
    path: '/dashboard',
    component: 'LAYOUT',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: '/dashboard/index',
        meta: {
          title: '仪表板',
          icon: 'el-icon-odometer',
          affix: true,
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/documentation',
    component: 'LAYOUT',
    children: [
      {
        path: '/documentation',
        name: 'Documentation',
        component: '/documentation/index',
        meta: {
          title: '文档',
          icon: 'el-icon-document',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/nested',
    component: 'LAYOUT',
    redirect: 'noRedirect',
    meta: {
      title: '嵌套菜单',
      icon: 'el-icon-document',
      roles: ['admin']
    },
    children: [
      {
        path: '/nested/menu/menu1',
        name: 'Menu1',
        meta: { title: 'Menu1', roles: ['admin'] },
        children: [
          {
            path: '/nested/menu/menu1-1',
            name: 'Menu1-1',
            meta: { title: 'Menu1-1', roles: ['admin'] },
            children: [
              {
                path: '/nested/menu/menu1-1-1',
                component: '/nested/index',
                name: 'Menu1-1-1',
                meta: { title: 'Menu1-1-1', roles: ['admin'] }
              }
            ]
          },
          {
            path: '/nested/menu/menu1-2',
            component: '/nested/index',
            name: 'Menu1-2',
            meta: { title: 'Menu1-2', roles: ['admin'] }
          }
        ]
      },
      {
        path: '/nested/menu/menu2',
        component: '/nested/index',
        name: 'Menu2',
        meta: { title: 'Menu2', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/upms',
    component: 'LAYOUT',
    redirect: '/upms/account',
    meta: {
      title: '权限管理',
      icon: 'el-icon-setting',
      roles: ['admin']
    },
    children: [
      {
        path: '/upms/account',
        component: '/upms/account/index',
        name: 'Account',
        meta: { title: '用户管理', roles: ['admin'] }
      },
      {
        path: '/upms/role',
        component: '/upms/role/index',
        name: 'Role',
        meta: { title: '角色管理', roles: ['admin'] }
      },
      {
        path: '/upms/menu',
        component: '/upms/menu/index',
        name: 'Menu',
        meta: { title: '菜单管理', roles: ['admin'] }
      },
      {
        path: '/upms/dictionary',
        component: '/upms/dictionary/index',
        name: 'Dictionary',
        meta: { title: '字典管理', hidden: false, roles: ['admin'] }
      }
    ]
  },
  {
    path: '/link',
    component: 'LAYOUT',
    children: [
      {
        path: 'https://github.com/zehuichan',
        name: 'Github',
        meta: {
          title: 'Github',
          icon: 'el-icon-odometer',
          roles: ['admin']
        }
      }
    ]
  }
])

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
  })

export default [
  {
    url: '/ums/menu/list',
    type: 'get',
    response: config => {
      return resultSuccess(menu)
    }
  }
]
