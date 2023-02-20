// store
import store from '@/store'

const PERMISSION_ENUM = {
  'add': {key: 'add', label: '新增'},
  'delete': {key: 'delete', label: '删除'},
  'edit': {key: 'edit', label: '修改'},
  'query': {key: 'query', label: '查询'},
  'get': {key: 'get', label: '详情'},
  'enable': {key: 'enable', label: '启用'},
  'disable': {key: 'disable', label: '禁用'},
  'import': {key: 'import', label: '导入'},
  'export': {key: 'export', label: '导出'}
}

export default {
  inserted(el, binding, vnode) {
    const actionName = binding.arg
    const permissions = store.getters && store.getters.permissions
    const elVal = vnode.context.$route.meta.permissions
    const permissionId = vnode.context.$route.name.toLowerCase()
    permissions.forEach(p => {
      if (permissionId !== p.permissionId) {
        return
      }
      if (p.actionList && !p.actionList.includes(actionName)) {
        el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
      }
    })
  }
}