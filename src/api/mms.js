import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/mms/member/list',
    method: 'get',
    params
  })
}
