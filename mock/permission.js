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
    path: '/comp',
    name: 'comp',
    component: 'LAYOUT',
    meta: {
      title: '组件',
      icon: 'el-icon-news'
    },
    children: [
      {
        path: 'schemaform',
        name: 'schemaform',
        meta: { title: 'schemaform' },
        children: [
          {
            path: 'refForm',
            component: '/comp/schemaform/refForm',
            name: 'refForm',
            meta: { title: 'refForm' }
          },
          {
            path: 'useForm',
            component: '/comp/schemaform/useForm',
            name: 'useForm',
            meta: { title: 'useForm' }
          },
          {
            path: 'dynamicForm',
            component: '/comp/schemaform/dynamicForm',
            name: 'dynamicForm',
            meta: { title: 'dynamicForm' }
          },
          {
            path: 'appendForm',
            component: '/comp/schemaform/appendForm',
            name: 'appendForm',
            meta: { title: 'appendForm' }
          },
          {
            path: 'searchForm',
            component: '/comp/schemaform/searchForm',
            name: 'searchForm',
            meta: { title: 'searchForm' }
          }
        ]
      }
    ]
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
    meta: {
      title: '权限管理',
      icon: 'el-icon-setting'
    },
    children: [
      {
        path: '/upms/user',
        component: '/upms/user/index',
        name: 'User',
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
    path: '/link',
    component: 'LAYOUT',
    meta: {
      single: true
    },
    children: [
      {
        path: 'https://github.com/zehuichan',
        name: 'Github',
        meta: {
          title: 'Github',
          icon: 'el-icon-link'
        }
      }
    ]
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
