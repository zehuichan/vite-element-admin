import request from '@/utils/request'

export function priv() {
  return request({
    url: '/permission/priv',
    method: 'get'
  })
}
