// 订单状态
export const orderState = [
  {
    id: 1,
    label: '待领取',
    value: '1'
  },
  {
    id: 2,
    label: '待审核',
    value: '2'
  },
  {
    id: 3,
    label: '待发行方审核',
    value: '3'
  },
  {
    id: 4,
    label: '审核不通过',
    value: '4'
  },
  {
    id: 5,
    label: '待发货',
    value: '5'
  },
  {
    id: 6,
    label: '已发货',
    value: '6'
  },
  {
    id: 7,
    label: '物流异常',
    value: '7'
  },
  {
    id: 8,
    label: '拒收',
    value: '8'
  },
  {
    id: 9,
    label: '确认收货',
    value: '9'
  },
  {
    id: 10,
    label: '已激活',
    value: '10'
  },
  {
    id: 11,
    label: '已取消',
    value: '11'
  },
  {
    id: 12,
    label: '待提交',
    value: '12'
  },
  {
    id: 13,
    label: '已提交',
    value: '13'
  }
]

// 车辆类型
export const vehicleType = [
  {
    id: 1,
    label: '货车',
    value: '1'
  },
  {
    id: 2,
    label: '客车',
    value: '2'
  },
  {
    id: 3,
    label: '专项作业车',
    value: '3'
  }
]

// 申办方式(签约)
export const creditInstitutions = [
  {
    id: 1,
    label: '建设银行',
    value: '1'
  },
  {
    id: 2,
    label: '网商银行',
    value: '2'
  },
  {
    id: 3,
    label: '中国农业银行',
    value: '3'
  },
  {
    id: 4,
    label: '中国邮政储蓄银行',
    value: '4'
  },
  {
    id: 5,
    label: '中国工商银行',
    value: '5'
  },
  {
    id: 6,
    label: '华夏银行',
    value: '6'
  },
  {
    id: 7,
    label: '招商银行',
    value: '7'
  },
  {
    id: 8,
    label: '支付宝代扣',
    value: '8'
  },
  {
    id: 99,
    label: '未知不合法',
    value: '99'
  }
]

export const orderChannel = [
  {
    id: 1,
    label: '中视小程序',
    value: '1'
  },
  {
    id: 2,
    label: '路网小程序',
    value: '2'
  },
  {
    id: 3,
    label: '捷通小程序',
    value: '3'
  },
  {
    id: 4,
    label: '江苏小程序',
    value: '4'
  },
  {
    id: 5,
    label: '内蒙古小程序',
    value: '5'
  },
  {
    id: 6,
    label: '北京小程序',
    value: '6'
  },
  {
    id: 7,
    label: '福建小程序',
    value: '7'
  },
  {
    id: 8,
    label: '吉林小程序',
    value: '8'
  },
  {
    id: 9,
    label: '湖南小程序',
    value: '9'
  },
  {
    id: 10,
    label: '黑龙江小程序',
    value: '10'
  },
  {
    id: 11,
    label: '河北交投小程序',
    value: '11'
  },
  {
    id: 12,
    label: '贵州小程序',
    value: '12'
  }
]

// 是否为推广订单
export const whetherPromotion = [
  {
    id: 1,
    label: '否',
    value: '1'
  },
  {
    id: 2,
    label: '是',
    value: '2'
  }
]

export const shipType = [
  {
    id: '1',
    value: 1,
    label: '网上发货'
  },
  {
    id: '2',
    value: 2,
    label: '线下交付'
  }
]

export const supplier = [
  {
    id: 1,
    label: '广西发行方',
    value: '1'
  },
  {
    id: 2,
    label: '内蒙发行方',
    value: '2'
  },
  {
    id: 3,
    label: '北京发行方',
    value: '3'
  },
  {
    id: 4,
    label: '湖南发行方',
    value: '4'
  },
  {
    id: 5,
    label: '福建发行方',
    value: '5'
  },
  {
    id: 6,
    label: '黑龙江发行方',
    value: '6'
  },
  {
    id: 7,
    label: '江苏发行方',
    value: '7'
  },
  {
    id: 8,
    label: '吉林发行方',
    value: '8'
  },
  {
    id: 9,
    label: '河北发行方',
    value: '9'
  },
  {
    id: 10,
    label: '贵州发行方',
    value: '10'
  }
]

// 执行类型
export const executeType = [
  {
    id: 1,
    label: '拉黑',
    value: '1'
  },
  {
    id: 2,
    label: '返白',
    value: '2'
  }
]

// 状态
export const executeStatus = [
  {
    id: 1,
    label: '待处理',
    value: '1'
  },
  {
    id: 2,
    label: '完成',
    value: '2'
  },
  {
    id: 3,
    label: '省方处理中',
    value: '3'
  },
  {
    id: 4,
    label: '失败',
    value: '4'
  }
]

// 快递公司
export const express = [
  {
    id: 1,
    label: '顺丰',
    value: '1',
    code: 'SFEXPRESS'
  },
  {
    id: 3,
    label: '圆通',
    value: '3',
    code: 'YTO'
  },
  {
    id: 6,
    label: '韵达',
    value: '6',
    code: 'YUNDA'
  },
  {
    id: 8,
    label: 'EMS',
    value: '8',
    code: 'EMS'
  }
]

// 设备商
export const device = [
  {
    id: 1,
    label: '埃特斯',
    value: '1'
  },
  {
    id: 2,
    label: '星曜',
    value: '2'
  },
  {
    id: 3,
    label: '千方',
    value: '3'
  },
  {
    id: 4,
    label: '天地融',
    value: '4'
  },
  {
    id: 5,
    label: '万集',
    value: '5'
  },
  {
    id: 6,
    label: '聚利',
    value: '6'
  },
  {
    id: 7,
    label: '金溢',
    value: '7'
  },
  {
    id: 8,
    label: '成谷',
    value: '8'
  }
]

// 卡厂商
export const card = [
  {
    id: 1,
    label: '金邦达',
    value: '1'
  },
  {
    id: 2,
    label: '量必达',
    value: '2'
  }
]