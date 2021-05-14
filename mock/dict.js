const Mock = require('mockjs')

const data = Mock.mock({
  'order_status': [
    {
      'id': 9,
      'label': '保存',
      'value': 'SAVE',
      'sort': '1',
      'dictId': 7,
      'createTime': 1610175440000
    },
    {
      'id': 10,
      'label': '审核',
      'value': 'PASS',
      'sort': '2',
      'dictId': 7,
      'createTime': 1610175451000
    },
    {
      'id': 11,
      'label': '反审',
      'value': 'REJECT',
      'sort': '3',
      'dictId': 7,
      'createTime': 1610257350000
    },
    {
      'id': 29,
      'label': '关闭',
      'value': 'CLOSED',
      'sort': '4',
      'dictId': 7,
      'createTime': 1611020539000
    },
    {
      'id': 85,
      'label': '作废',
      'value': 'INVALID',
      'sort': '5',
      'dictId': 7,
      'createTime': 1614930131000
    },
    {
      'id': 86,
      'label': '中止',
      'value': 'STOP',
      'sort': '6',
      'dictId': 7,
      'createTime': 1614930142000
    },
    {
      'id': 87,
      'label': '恢复',
      'value': 'RECOVER',
      'sort': '7',
      'dictId': 7,
      'createTime': 1614930156000
    },
    {
      'id': 158,
      'label': '回退',
      'value': 'BACK',
      'sort': '8',
      'dictId': 7,
      'createTime': 1620963077000
    }
  ],
  'job_status': [
    {
      'id': 5,
      'label': '启用',
      'value': 'true',
      'sort': '1',
      'dictId': 5,
      'createTime': null
    },
    {
      'id': 6,
      'label': '停用',
      'value': 'false',
      'sort': '2',
      'dictId': 5,
      'createTime': 1572179496000
    }
  ],
  'dept_status': [
    {
      'id': 3,
      'label': '启用',
      'value': 'true',
      'sort': '1',
      'dictId': 4,
      'createTime': null
    },
    {
      'id': 4,
      'label': '停用',
      'value': 'false',
      'sort': '2',
      'dictId': 4,
      'createTime': 1572179496000
    }
  ],
  'user_status': [
    {
      'id': 1,
      'label': '激活',
      'value': 'true',
      'sort': '1',
      'dictId': 1,
      'createTime': 1572179496000
    },
    {
      'id': 2,
      'label': '禁用',
      'value': 'false',
      'sort': '2',
      'dictId': 1,
      'createTime': null
    }
  ],
})

module.exports = [
  {
    url: '/vue-admin-template/dict',
    type: 'get',
    response: config => {
      const { name } = config.query
      const items = data.items[name]
      return {
        code: 20000,
        data: {
          items: items
        }
      }
    }
  }
]
