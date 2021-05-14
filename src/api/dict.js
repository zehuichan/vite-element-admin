import request from '@/utils/request'

export default function getDictDetail(name) {
  return request({
    url: '/vue-admin-template/dict',
    method: 'get',
    params: { name }
  })
}
