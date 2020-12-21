const Mock = require('mockjs')

const menu = Mock.mock([
  // 订单总表
  {
    path: '/all',
    component: 'Layout',
    hidden: false,
    children: [
      {
        path: '/all',
        component: 'Test',
        hidden: false,
        name: 'All',
        meta: {
          title: '订单总表',
          icon: 'el-icon-orange',
          affix: true,
          roles: ['ZHONGSHI-ADMIN']
        },
      },
    ]
  },
  // 审核管理
  {
    path: '/oms/audit',
    redirect: '/oms/audit/accept',
    component: 'Layout',
    meta: { title: '审核管理', icon: 'el-icon-orange', roles: ['ZHONGSHI-ADMIN'], },
    hidden: false,
    children: [
      {
        path: '/oms/audit/accept',
        component: 'Test',
        name: 'Accept',
        meta: {
          title: '待领取订单',
          roles: ['ZHONGSHI-ADMIN'],
          permissions: [
            { action: 'claim', desc: '领单' },
            { action: 'batch-claim', desc: '批量领单' },
          ]
        }
      },
      {
        path: '/oms/audit/review',
        component: 'Test',
        name: 'Review',
        meta: {
          title: '待审核订单',
          roles: ['ZHONGSHI-ADMIN'],
          permissions: [
            { action: 'resolve', desc: '审核通过' },
            { action: 'reject', desc: '审核驳回' },
            { action: 'cancel', desc: '取消订单' },
          ]
        }
      },
      {
        path: '/oms/audit/reviewed',
        component: 'Test',
        name: 'Reviewed',
        meta: { title: '已审核订单', roles: ['ZHONGSHI-ADMIN'], }
      },
      {
        path: '/oms/audit/reject',
        component: 'Test',
        name: 'Reject',
        meta: {
          title: '发行方驳回订单',
          roles: ['ZHONGSHI-ADMIN'],
          permissions: [
            { action: 'reject', desc: '审核通过' },
            { action: 'cancel', desc: '取消订单' },
            { action: 'retry', desc: '重新推送' },
          ]
        }
      },
    ],
  },
  // 发货管理
  {
    path: '/oms/delivery',
    redirect: '/oms/delivery/delivery',
    component: 'Layout',
    meta: { title: '发货管理', icon: 'el-icon-orange', roles: ['ZHONGSHI-ADMIN'], },
    hidden: false,
    children: [
      {
        path: '/oms/delivery/delivery',
        component: 'Test',
        name: 'Delivery',
        meta: {
          title: '待发货订单',
          roles: ['ZHONGSHI-ADMIN'],
          permissions: [
            { action: 'export', desc: '导出订单' },
            { action: 'import', desc: '批量导入' },
            { action: 'retry', desc: '发货' },
          ]
        }
      },
      {
        path: '/oms/delivery/roadnet',
        component: 'Test',
        name: 'RoadNetDelivery',
        meta: {
          title: '待发货(路网)',
          roles: ['ZHONGSHI-ADMIN'],
          permissions: [
            { action: 'export', desc: '导出订单' },
            { action: 'import', desc: '批量导入' },
            { action: 'retry', desc: '发货' },
          ]
        }
      },
      {
        path: '/oms/delivery/delivered',
        component: 'Test',
        name: 'Delivered',
        meta: {
          title: '已发货订单',
          roles: ['ZHONGSHI-ADMIN'],
          permissions: [
            { action: 'log', desc: '激活日志' },
            { action: 'sign', desc: '签收' },
            { action: 'exception', desc: '物流异常' },
            { action: 'refusal', desc: '拒签' },
          ]
        }
      },
      {
        path: '/oms/delivery/apply',
        component: 'Test',
        name: 'Apply',
        meta: {
          title: '服务申请单',
          roles: ['ZHONGSHI-ADMIN'],
          permissions: [
            { action: 'log', desc: '激活日志' },
            { action: 'sign', desc: '签收' },
          ]
        }
      },
    ],
  },
  // 订单管理
  {
    path: '/oms/order',
    redirect: '/oms/order/push',
    component: 'Layout',
    meta: { title: '订单管理', icon: 'el-icon-orange', roles: ['ZHONGSHI-ADMIN'], },
    hidden: false,
    children: [
      {
        path: '/oms/order/push',
        component: 'Test',
        name: 'Push',
        meta: { title: '推送发行方订单', roles: ['ZHONGSHI-ADMIN'], }
      },
      {
        path: '/oms/order/cancel',
        component: 'Test',
        name: 'Cancel',
        meta: { title: '取消订单', roles: ['ZHONGSHI-ADMIN'], }
      },
      {
        path: '/oms/order/exception',
        component: 'Test',
        name: 'Exception',
        meta: { title: '异常订单', roles: ['ZHONGSHI-ADMIN'], }
      },
    ],
  },
  // 黑名单管理
  {
    path: '/blacklist-management',
    redirect: '/blacklist-management/index',
    component: 'Layout',
    meta: { title: '黑名单管理', icon: 'el-icon-orange', roles: ['ZHONGSHI-ADMIN'], },
    hidden: false,
    children: [
      // 黑名单追溯
      {
        path: '/blacklist-management/tracing',
        component: 'Test',
        name: 'Tracing',
        meta: { title: '黑名单追溯', roles: ['ZHONGSHI-ADMIN'], }
      },
      // 黑名单执行
      {
        path: '/blacklist-management/execution',
        component: 'Test',
        name: 'Execution',
        meta: { title: '黑名单执行', roles: ['ZHONGSHI-ADMIN'], }
      },
      // 黑名单日志
      {
        path: '/blacklist-management/execution/log/:id',
        component: 'Test',
        hidden: true,
        name: 'ExecutionLog',
        meta: {
          title: '黑名单执行日志',
          noCache: true,
          activeMenu: '/blacklist-management/execution',
          roles: ['ZHONGSHI-ADMIN'],
        }
      },
    ],
  },
  // 通行订单管理
  {
    path: '/transport-orders',
    redirect: '/transport-orders/pass-order',
    component: 'Layout',
    meta: { title: '通行订单管理', icon: 'el-icon-orange', roles: ['ZHONGSHI-ADMIN'], },
    hidden: false,
    children: [
      // 通行订单
      {
        path: '/transport-orders/pass-order',
        component: 'Test',
        name: 'PassOrder',
        meta: {
          title: '通行订单',
          roles: ['ZHONGSHI-ADMIN'],
        }
      },
      // 通行订单详情
      {
        path: '/transport-orders/pass-order/:id',
        component: 'Test',
        hidden: true,
        name: 'PassOrderDetail',
        meta: {
          title: '通行订单详情',
          noCache: true,
          activeMenu: '/transport-orders/pass-order',
          roles: ['ZHONGSHI-ADMIN'],
        }
      },
      // 路网日终对账
      {
        path: '/transport-orders/road-net-reconciliation',
        component: 'Test',
        name: 'RoadNetReconciliation',
        meta: {
          title: '路网日终对账',
          roles: ['ZHONGSHI-ADMIN'],
        }
      },
    ],
  },
  // 通行文件管理
  {
    path: '/transport-files',
    redirect: '/transport-files/confirm',
    component: 'Layout',
    meta: { title: '通行文件管理', icon: 'el-icon-orange', roles: ['ZHONGSHI-ADMIN'], },
    hidden: false,
    children: [
      // 扣款结果确认文件管理
      {
        path: '/transport-files/confirm',
        component: 'Test',
        name: 'Confirm',
        meta: { title: '扣款结果确认文件管理', roles: ['ZHONGSHI-ADMIN'], }
      },
      // 省份日清文件管理
      {
        path: '/transport-files/cleanup',
        component: 'Test',
        name: 'Cleanup',
        meta: { title: '省份日清文件管理', roles: ['ZHONGSHI-ADMIN'], }
      },
      // 通行业务数据管理
      {
        path: '/transport-files/data',
        component: 'Test',
        name: 'Data',
        meta: { title: '通行业务数据管理', roles: ['ZHONGSHI-ADMIN'], }
      },
    ],
  },
  // 售后管理
  {
    path: '/after-sale',
    redirect: '/after-sale',
    component: 'Layout',
    meta: { title: '售后管理', icon: 'el-icon-orange', roles: ['ZHONGSHI-ADMIN'], },
    hidden: false,
    children: [
      // 仅退款/仅取消
      {
        path: '/after-sale/only-refund-cancel',
        component: 'Test',
        name: 'OnlyRefundCancel',
        meta: { title: '仅退款/仅取消', roles: ['ZHONGSHI-ADMIN', 'RUIJIE-REVIEWDELIVERY'], }
      },
      // 仅退款/仅取消详情
      {
        path: '/after-sale/only-refund-cancel/:id',
        component: 'Test',
        hidden: true,
        name: 'OnlyRefundCancelDetail',
        meta: {
          title: '仅退款/仅取消详情',
          noCache: true,
          activeMenu: '/after-sale/only-refund-cancel',
          roles: ['ZHONGSHI-ADMIN', 'RUIJIE-REVIEWDELIVERY'],
        }
      },
      // 标准退货退款
      {
        path: '/after-sale/standard-return-refund',
        component: 'Test',
        name: 'StandardReturnRefund',
        meta: { title: '标准退货退款', roles: ['ZHONGSHI-ADMIN', 'RUIJIE-REVIEWDELIVERY'], }
      },
      // 标准退货退款详情
      {
        path: '/after-sale/standard-return-refund/:id',
        component: 'Test',
        hidden: true,
        name: 'StandardReturnRefundDetail',
        meta: {
          title: '标准退货退款详情',
          noCache: true,
          activeMenu: '/after-sale/standard-return-refund',
          roles: ['ZHONGSHI-ADMIN', 'RUIJIE-REVIEWDELIVERY'],
        }
      },
      // 换卡换签
      {
        path: '/after-sale/change',
        component: 'Test',
        name: 'Change',
        meta: { title: '换卡换签', roles: ['ZHONGSHI-ADMIN'], }
      },
      // 换卡换签详情
      {
        path: '/after-sale/change/:id',
        component: 'Test',
        hidden: true,
        name: 'ChangeDetail',
        meta: {
          title: '换卡换签详情',
          noCache: true,
          activeMenu: '/after-sale/change',
          roles: ['ZHONGSHI-ADMIN'],
        }
      },
      // 补卡补签
      {
        path: '/after-sale/replace',
        component: 'Test',
        name: 'Replace',
        meta: { title: '补卡补签', roles: ['ZHONGSHI-ADMIN'], }
      },
      // 补卡补签详情
      {
        path: '/after-sale/replace/:id',
        component: 'Test',
        hidden: true,
        name: 'ReplaceDetail',
        meta: {
          title: '补卡补签详情',
          noCache: true,
          activeMenu: '/after-sale/replace',
          roles: ['ZHONGSHI-ADMIN'],
        }
      },
      // 售后入口
      {
        path: '/after-sale/entrance',
        component: 'Test',
        name: 'Entrance',
        meta: {
          title: '售后入口',
          roles: ['ZHONGSHI-ADMIN'],
          permissions: [
            { action: 'change', desc: '更换' },
            { action: 'replace', desc: '补办' },
            { action: 'activation', desc: '二次激活' },
          ]
        }
      },
      // 二次激活
      {
        path: '/after-sale/second-activation',
        component: 'Test',
        name: 'SecondActivation',
        meta: { title: '二次激活', roles: ['ZHONGSHI-ADMIN'], }
      },
      // 二次激活详情
      {
        path: '/after-sale/second-activation/:id',
        component: 'Test',
        hidden: true,
        name: 'SecondActivationDetail',
        meta: {
          title: '二次激活详情',
          noCache: true,
          activeMenu: '/after-sale/second-activation',
          roles: ['ZHONGSHI-ADMIN'],
        }
      },
      // ETC注销
      {
        path: '/after-sale/cancellation',
        component: 'Test',
        name: 'Cancellation',
        meta: { title: 'ETC注销', roles: ['ZHONGSHI-ADMIN'], }
      },
      // ETC注销详情
      {
        path: '/after-sale/cancellation/:id',
        component: 'Test',
        hidden: true,
        name: 'CancellationDetail',
        meta: {
          title: 'ETC注销详情',
          noCache: true,
          activeMenu: '/after-sale/cancellation',
          roles: ['ZHONGSHI-ADMIN'],
        }
      },
    ],
  },
])

module.exports = [
  {
    url: '/vue-admin-template/zhongshi/menu/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: menu
      }
    }
  }
]