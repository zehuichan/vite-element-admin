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
    roles: ['ZHONGSHI-ADMIN'],
    permissions: [
      {
        permissionId: 'accept',
        actionList: [
          { action: 'claim', desc: '领单' },
          { action: 'batch-claim', desc: '批量领单' },
        ],
      },
      {
        permissionId: 'review',
        actionList: [
          { action: 'resolve', desc: '审核通过' },
          { action: 'reject', desc: '审核驳回' },
          { action: 'cancel', desc: '取消订单' },
        ]
      },
      {
        permissionId: 'reject',
        actionList: [
          { action: 'reject', desc: '审核通过' },
          { action: 'cancel', desc: '取消订单' },
          { action: 'retry', desc: '重新推送' },
        ]
      },
      {
        permissionId: 'delivery',
        actionList: [
          { action: 'export', desc: '导出订单' },
          { action: 'import', desc: '批量导入' },
          { action: 'retry', desc: '发货' },
        ]
      },
      {
        permissionId: 'roadnetdelivery',
        actionList: [
          { action: 'export', desc: '导出订单' },
          { action: 'import', desc: '批量导入' },
          { action: 'retry', desc: '发货' },
        ]
      },
      {
        permissionId: 'delivered',
        actionList: [
          { action: 'log', desc: '激活日志' },
          { action: 'sign', desc: '签收' },
          { action: 'exception', desc: '物流异常' },
          { action: 'refusal', desc: '拒签' },
        ]
      },
      {
        permissionId: 'apply',
        actionList: [
          { action: 'log', desc: '激活日志' },
          { action: 'sign', desc: '签收' },
        ]
      },
      {
        permissionId: 'entrance',
        actionList: [
          { action: 'change', desc: '更换' },
          { action: 'replace', desc: '补办' },
          { action: 'activation', desc: '二次激活' },
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
    url: '/vue-admin-template/zhongshiuser/login',
    type: 'post',
    response: config => {
      const {username} = config.body
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
    url: '/vue-admin-template/zhongshiuser/info\.*',
    type: 'get',
    response: config => {
      const {token} = config.query
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
    url: '/vue-admin-template/zhongshiuser/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
