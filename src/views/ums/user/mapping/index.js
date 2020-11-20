// search相关
export const options = [
  { label: '输入搜索', key: 'name', value: '', placeholder: '账号/姓名', type: 'input' },
]

// table相关
export const columns = [
  { label: '账号', key: 'account', minWidth: 120 },
  { label: '姓名', key: 'name' },
  { label: '所属机构', key: 'org' },
  { label: '手机号', key: 'mobile', minWidth: 120 },
  { label: '邮箱', key: 'email' },
  { label: '添加时间', key: 'create_time' },
  { label: '最后登录', key: 'login_time' },
  { label: '状态', key: 'status' },
  { label: '操作', key: 'actions', width: 260 },
]
