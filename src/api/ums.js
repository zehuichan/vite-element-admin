import request from '@/utils/request'

export function adminList(params) {
  return request({
    url: '/vue-admin-template/ums/admin/list',
    method: 'get',
    params
  })
}

export function roleList(params) {
  return request({
    url: '/vue-admin-template/ums/role/list',
    method: 'get',
    params
  })
}

export function menuList() {
  return request({
    url: '/vue-admin-template/ums/menu/list',
    method: 'get'
  })
}

export function dictList() {
  return request({
    url: '/vue-admin-template/ums/dict/list',
    method: 'get'
  })
}
