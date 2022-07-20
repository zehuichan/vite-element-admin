import request from '@/utils/request'

export function menu() {
  return request({
    url: '/ums/menu/list',
    method: 'get'
  })
}