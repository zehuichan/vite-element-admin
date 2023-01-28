const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    create_time: '@datetime',
    name: '@cname',
    'gender|1': ['男', '女'],
    birthday: '@date',
    mobile: /^1[385][1-9]\d{8}/,
    address: '@county(true)'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/mms/member/list',
    type: 'get',
    response: config => {
      const {p, ps} = config.query
      const total = data.items.length
      const begin = +(p - 1) * ps
      const end = +p * ps
      const items = data.items.slice(begin, end)
      return {
        code: 20000,
        data: {
          total: total,
          items: items
        }
      }
    }
  }
]
