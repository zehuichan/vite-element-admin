import request from '@/utils/request'

export function menus() {
  return request({
    url: '/upms/menus',
    method: 'get'
  })
}