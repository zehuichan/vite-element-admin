import * as enums from '@/constants/enums'

// 搜索框相关
export const options = [
  {label: '订单号', key: 'id', value: null, placeholder: '订单号', type: 'input'},
  {label: '收货人手机', key: 'consigneePhone', value: null, placeholder: '收货人手机', type: 'input'},
  {label: '车辆号码', key: 'plateNumber', value: null, placeholder: '车辆号码', type: 'input'},
  {
    label: '订单状态',
    key: 'orderState',
    value: [],
    placeholder: '订单状态',
    type: 'select',
    options: enums.orderState,
    multiple: true
  },
  {
    label: '车辆类型',
    key: 'vehicleType',
    value: [],
    placeholder: '车辆类型',
    type: 'select',
    options: enums.vehicleType,
    multiple: true
  },
  {label: '车主姓名', key: 'carOwner', value: null, placeholder: '车主姓名', type: 'input'},
  {
    label: '审核人',
    key: 'auditUid',
    value: [],
    placeholder: '审核人',
    type: 'select',
    options: [],
    multiple: true,
    remote: true
  },
  {
    label: '申办方式(签约)',
    key: 'creditInstitutions',
    value: [],
    placeholder: '申办方式(签约)',
    type: 'select',
    options: enums.creditInstitutions,
    multiple: true
  },
  {
    label: '申办渠道',
    key: 'orderChannel',
    value: [],
    placeholder: '申办渠道',
    type: 'select',
    options: enums.orderChannel,
    multiple: true
  },
  {
    label: '发行方',
    key: 'supplierId',
    value: [],
    placeholder: '发行方',
    type: 'select',
    options: enums.supplier,
    multiple: true
  },
  {
    label: '是否推广订单',
    key: 'whetherPromotion',
    value: null,
    placeholder: '是否推广订单',
    type: 'select',
    options: enums.whetherPromotion
  },
  {label: '下单时间', key: 'createOrderTime', value: [], placeholder: '下单时间', type: 'daterange'},
  {label: '激活日期', key: 'activationTime', value: [], placeholder: '激活日期', type: 'daterange'},
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
  {label: '订单号', key: 'orderId', value: '', placeholder: '订单号', type: 'input', disabled: true},
  {
    label: '快递公司',
    key: 'expressCompanyId',
    value: '',
    placeholder: '快递公司',
    type: 'select',
    options: enums.express,
    rules: [
      {required: true, message: '请选择快递公司', trigger: 'change'}
    ]
  },
  {
    label: '快递单号',
    key: 'expressOrder',
    value: '',
    placeholder: '快递单号',
    type: 'input',
    rules: [
      {required: true, message: '请选择快递公司', trigger: 'blur'}
    ]
  },
  {label: '设备商', key: 'deviceCompanyId', value: '', placeholder: '设备商', type: 'select', options: enums.device},
  {label: 'OBU设备号', key: 'obuActivationNumber', value: '', placeholder: 'OBU设备号', type: 'input'},
  {label: '卡厂商', key: 'cardBrandId', value: '', placeholder: '卡厂商', type: 'select', options: enums.card},
  {label: '卡号', key: 'cardActivationNumber', value: '', placeholder: '卡号', type: 'input'},
]
