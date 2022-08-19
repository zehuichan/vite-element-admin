import Mock from 'mockjs'
import { resultSuccess } from './_util'

const Random = Mock.Random

const token = Random.string('upper', 32, 32)
const avatar = Random.image()

const user = {
  userId: '1',
  username: 'admin',
  realName: 'Admin',
  avatar: avatar,
  desc: 'manager',
  password: Random.string('upper', 4, 16),
  token,
  roles: [
    {
      roleName: 'Super Admin',
      value: 'super'
    }
  ]
}

export default [
  // user login
  {
    url: '/user/login',
    method: 'post',
    response: (config) => {
      return resultSuccess(user)
    }
  },

  // get user info
  {
    url: '/user/info',
    method: 'get',
    response: (config) => {
      return resultSuccess(user)
    }
  }
]
