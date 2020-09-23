// 推广方案模型属性
const channelProps = {
  shitType: [
    {
      value: 1,
      name: '网上发货'
    },
    {
      value: 2,
      name: '线下交付'
    }
  ],
  isPublic: [
    {
      value: 0,
      name: '否'
    },
    {
      value: 1,
      name: '是'
    }
  ],
  nodeType: [
    {
      value: 1,
      name: '银行渠道'
    },
    {
      value: 2,
      name: '发行方推广渠道'
    },
    {
      value: 3,
      name: '物流行业推广渠道'
    },
    {
      value: 4,
      name: '收费站推广渠道'
    },
    {
      value: 5,
      name: '服务区推广渠道'
    },
    {
      value: 6,
      name: '其他'
    }
  ],
  status: [
    {
      value: 0,
      name: '停用'
    },
    {
      value: 1,
      name: '上线'
    }
  ],
  issuer: [
    {
      value: 'GJieTong',
      name: '捷通'
    },
    {
      value: 'Beijing',
      name: '北京'
    }
  ],
  isOpen: [
    {
      value: 1,
      name: '公开'
    },
    {
      value: 0,
      name: '非公开'
    }
  ],
  reward: [
    {
      value: 0,
      name: '无奖励'
    },
    {
      value: 1,
      name: '指定金额'
    }
  ],
  protect: [
    {
      value: 1,
      name: '保护'
    },
    {
      value: 0,
      name: '不保护'
    }
  ],
  order: [
    {
      value: 1,
      name: '待提交'
    },
    {
      value: 2,
      name: '待领取'
    },
    {
      value: 3,
      name: '待审核'
    },
    {
      value: 4,
      name: '待发行方审核'
    },
    {
      value: 5,
      name: '审核驳回'
    },
    {
      value: 6,
      name: '待发货'
    },
    {
      value: 7,
      name: '待确认收货'
    },
    {
      value: 8,
      name: '确认收货/待激活'
    },
    {
      value: 9,
      name: '已激活'
    }
  ]
}

// 合作机构模型属性
const partnerProps = {
  status: [
    {
      value: 0,
      name: '未合作'
    },
    {
      value: 1,
      name: '合作中'
    },
    {
      value: 2,
      name: '停止合作'
    }
  ]
}

export {
  channelProps,
  partnerProps
}
