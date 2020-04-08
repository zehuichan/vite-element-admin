import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    pic: '@image(\'80x80\', \'#50B347\', \'#FFF\', \'Mock.js\')',
    name: '@ctitle',
    'brand|1': ['小米', '七匹狼', '海澜之家', '苹果', '三星', '华为', '格力', '方太', '万和', 'OPPO', 'NIKE'],
    'price|100-1000': 1,
    'origin_price|200-1000': 1,
    'tags|0-3': [
      {
        'color|1': ['rgb(102, 177, 255)', 'rgb(225, 243, 216)', 'rgb(250, 236, 216)', 'rgb(253, 226, 226)', 'rgb(233, 233, 235)'],
        'title|1': ['包邮', '新品', '推荐', '爆款']
      }
    ],
    on_off: 1,
    sort: 0,
    sale: 0,
    status: '未审核'
  }]
})

export default [
  {
    url: '/vue-admin-template/pms/product/list',
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
