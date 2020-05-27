const result = [
  {
    'title': '首页',
    'key': '',
    'name': 'index',
    'component': 'BasicLayout',
    'redirect': '/dashboard/workplace',
    'children': [
      {
        'title': '仪表盘',
        'key': 'dashboard',
        'component': 'RouteView',
        'icon': 'dashboard',
        'children': [
          {
            'title': '分析页',
            'key': 'analysis',
            'icon': ''
          },
          {
            'title': '监控页',
            'key': 'monitor',
            'icon': ''
          },
          {
            'title': '工作台',
            'key': 'workplace',
            'icon': ''
          }
        ]
      },
      {
        'title': '系统管理',
        'key': 'system',
        'component': 'PageView',
        'icon': 'setting',
        'children': [
          {
            'title': '用户管理',
            'key': 'userList'
          },
          {
            'title': '角色管理',
            'key': 'roleList'
          },
          {
            'title': '权限管理',
            'key': 'tableList'
          }
        ]
      }
    ]
  }
]