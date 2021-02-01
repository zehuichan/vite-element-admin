const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    permissions: [
      {
        permissionId: 'dashboard',
        actionList: [
          { action: 'add', desc: '新增' },
          { action: 'delete', desc: '删除' },
          { action: 'edit', desc: '修改' },
          { action: 'query', desc: '查询' },
          { action: 'import', desc: '导入' },
          { action: 'export', desc: '导出' },
        ],
      },
      {
        permissionId: 'permission',
        actionList: [
          { action: 'query', desc: '查询' },
          { action: 'import', desc: '导入' },
          { action: 'export', desc: '导出' },
        ]
      },
      {
        permissionId: 'user',
        actionList: [
          { action: 'add', desc: '新增' },
          { action: 'delete', desc: '删除' },
          { action: 'edit', desc: '修改' },
          { action: 'export', desc: '导出' },
        ]
      },
      {
        permissionId: 'vcomponents',
        actionList: [
          { action: 'add', desc: '新增' },
          { action: 'delete', desc: '删除' },
          { action: 'edit', desc: '修改' },
          { action: 'query', desc: '查询' },
          { action: 'import', desc: '导入' },
          { action: 'export', desc: '导出' },
        ]
      }
    ],
    introduction: 'I am a super administrator',
    avatar: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLYMVgaumib5h42GP4pAlLTQCpzFAmUZTVUg4MmH9eFyb4shrm6Ux2Ocic1ic0ekTWEYVfxibGcMMC3UQ/132',
    name: 'zehui chan'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLYMVgaumib5h42GP4pAlLTQCpzFAmUZTVUg4MmH9eFyb4shrm6Ux2Ocic1ic0ekTWEYVfxibGcMMC3UQ/132',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
