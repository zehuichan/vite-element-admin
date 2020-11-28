import * as enums from '@/constants/enums'


// 搜索框相关
export const options = [
  {label: '车辆号码', key: 'plateNumber', value: '', placeholder: '车辆号码', type: 'input'},
  {label: 'uid', key: 'uid', value: '', placeholder: 'uid', type: 'input'},
  {
    label: '执行类型',
    key: 'executeType',
    value: [],
    placeholder: '执行类型',
    type: 'select',
    options: enums.executeType,
    multiple: true,
    remote: true
  },
  {
    label: '执行时间',
    key: 'updateTime',
    value: [],
    placeholder: '执行时间',
    type: 'daterange',
    valueFormat: 'yyyy-MM-dd HH:mm:ss'
  },
  {
    label: '状态',
    key: 'executeStatus',
    value: '',
    placeholder: '状态',
    type: 'select',
    options: enums.executeStatus
  }
]

// table相关
export const columns = [
  {label: '售后单号', key: 'id'},
  {label: '发行方', key: 'supplierId'},
  {label: '车型', key: 'vehicleType'},
  {label: '车牌号', key: 'plateNumber'},
  {label: 'uid', key: 'uid'},
  {label: '模式', key: 'pattern'},
  {label: '寄回单号', key: 'sendBackExpressNo'},
  {label: '寄回时间', key: 'userReturnTime'},
  {label: '主状态', key: 'afterSaleStateDesc'},
  {label: '子状态', key: 'deliveryStateDesc'},
  {label: '特殊操作', key: 'specialActions'},
  {label: '常规操作', key: 'actions', with: 80}
]

// 表单相关
export const formOptions = [
  {label: '车辆号码', key: 'equipmentId', value: '', placeholder: '车辆号码', type: 'input'},

]