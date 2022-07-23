import { resultSuccess } from './_util'

const menu = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: '/dashboard/index',
    meta: {
      title: '仪表板',
      icon: 'el-icon-odometer',
      affix: true
    }
  },
  {
    path: '/documentation',
    name: 'Documentation',
    component: '/documentation/index',
    meta: {
      title: '文档',
      icon: 'el-icon-document'
    }
  },
  {
    path: '/nested',
    component: 'LAYOUT',
    meta: {
      title: '嵌套菜单',
      icon: 'el-icon-document'
    },
    children: [
      {
        path: '/nested/menu/menu1',
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: '/nested/menu/menu1-1',
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' },
            children: [
              {
                path: '/nested/menu/menu1-1-1',
                component: '/nested/index',
                name: 'Menu1-1-1',
                meta: { title: 'Menu1-1-1' }
              }
            ]
          },
          {
            path: '/nested/menu/menu1-2',
            component: '/nested/index',
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' }
          }
        ]
      },
      {
        path: '/nested/menu/menu2',
        component: '/nested/index',
        name: 'Menu2',
        meta: { title: 'Menu2' }
      }
    ]
  },
  {
    path: '/upms',
    component: 'LAYOUT',
    redirect: '/upms/account',
    meta: {
      title: '权限管理',
      icon: 'el-icon-setting'
    },
    children: [
      {
        path: '/upms/account',
        component: '/upms/account/index',
        name: 'Account',
        meta: { title: '用户管理' }
      },
      {
        path: '/upms/role',
        component: '/upms/role/index',
        name: 'Role',
        meta: { title: '角色管理' }
      },
      {
        path: '/upms/menu',
        component: '/upms/menu/index',
        name: 'Menu',
        meta: { title: '菜单管理' }
      },
      {
        path: '/upms/dictionary',
        component: '/upms/dictionary/index',
        name: 'Dictionary',
        meta: { title: '字典管理' }
      }
    ]
  },
  {
    path: 'https://github.com/zehuichan',
    name: 'Github',
    meta: {
      title: 'Github',
      icon: 'el-icon-odometer'
    }
  }
]

export default [
  {
    url: '/permission/priv',
    type: 'get',
    response: config => {
      return resultSuccess(menu)
    }
  }
]
