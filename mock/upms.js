import { resultSuccess } from './_util'

const menu = []

export default [
  {
    url: '/upms/menus',
    type: 'get',
    response: config => {
      return resultSuccess(menu)
    }
  }
]
