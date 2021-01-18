export const options = [
  {
    label: 'digit',
    key: 'digit',
    value: '',
    placeholder: '正整数',
    type: 'digit',
    rules: [
      {required: true, message: '请输入正整数', trigger: 'blur'}
    ],
  },
  {label: 'number', key: 'number', value: '', placeholder: '数字', type: 'number'},
  {label: 'ID', key: 'id', value: '', placeholder: 'ID', type: 'input'},
  {label: 'ETC卡号', key: 'cardNumber', value: '', placeholder: 'ETC卡号', type: 'input'},
  {label: 'uid', key: 'uid', value: '', placeholder: 'uid', type: 'input'},
  {label: '车牌号码', key: 'plateNumber', value: '', placeholder: '车牌号码', type: 'input'},
  {
    label: '创建时间',
    key: 'createTime',
    value: [],
    placeholder: '创建时间',
    type: 'daterange',
    valueFormat: 'yyyy-MM-dd HH:mm:ss'
  }
]