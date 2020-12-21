import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-admin-template/user/login',
    url: '/vue-admin-template/zhongshiuser/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    // url: '/vue-admin-template/user/info',
    url: '/vue-admin-template/zhongshiuser/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    // url: '/vue-admin-template/user/logout',
    url: '/vue-admin-template/zhongshiuser/logout',
    method: 'post'
  })
}
