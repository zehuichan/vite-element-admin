// search相关
export const options = [
  { label: '用户名', key: 'name', value: '', placeholder: '用户名', type: 'input' },
  { label: '登录账号', key: 'account', value: '', placeholder: '登录账号', type: 'input' },
  { label: '手机', key: 'mobile', value: '', placeholder: '手机', type: 'input' },
  { label: '角色', key: 'role', value: '', placeholder: '角色', type: 'select', options: [] },
  { label: '邮箱', key: 'email', value: '', placeholder: '邮箱', type: 'input' },
  { label: '状态', key: 'status', value: '', placeholder: '状态', type: 'select', options: [] },
]

// table相关
export const columns = [
  { label: '用户名', key: 'name' },
  { label: '登录账号', key: 'account' },
  { label: '手机', key: 'mobile' },
  { label: '邮箱', key: 'email' },
  { label: '角色', key: 'role' },
  { label: '状态', key: 'status' },
  { label: '创建时间', key: 'create_time' },
  { label: '最后登录', key: 'login_time' },
  { label: '操作', key: 'actions', width: 260 },
]
