const token = {
  token: 'E5FB5353-CDce-9Ef5-8C93-073BCE5FDfED',
  uid: '310000197907162505'
}

const user = {
  avatar:
    'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLYMVgaumib5h42GP4pAlLTQCpzFAmUZTVUg4MmH9eFyb4shrm6Ux2Ocic1ic0ekTWEYVfxibGcMMC3UQ/132',
  cellphone: '15800066380',
  username: 'chan_',
  realname: '陈泽辉',
  github: 'https://github.com/zehuichan'
}

export default [
  // user login
  {
    url: '/user/login',
    method: 'post',
    response: (config) => {
      return {
        code: 200,
        data: token,
        msg: '成功'
      }
    }
  },

  // get user info
  {
    url: '/user/info',
    method: 'get',
    response: (config) => {
      return {
        code: 200,
        data: user,
        msg: '成功'
      }
    }
  }
]
