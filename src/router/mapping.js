// require('login/index').default   // 同步的方式
// () => import('login/index')      // 异步的方式

const mapping = {
  // index
  dashboard: () => import('@/views/dashboard/index'),
  // mms
  member: () => import('@/views/mms/member'),
  // pms
  product: () => import('@/views/pms/product'),
  cate: () => import('@/views/pms/cate'),
  // oms
  order: () => import('@/views/oms/order'),
  // cms
  live: () => import('@/views/cms/live'),
  article: () => import('@/views/cms/article'),
  course: () => import('@/views/cms/course'),
  // sms
  flash: () => import('@/views/sms/flash'),
  subject: () => import('@/views/sms/subject'),
  // bms
  base: () => import('@/views/bms/base'),
  about: () => import('@/views/bms/about'),
  // ums
  admin: () => import('@/views/ums/admin'),
  role: () => import('@/views/ums/role'),
  menu: () => import('@/views/ums/menu'),
}


export default mapping