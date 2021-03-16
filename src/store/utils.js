// mapping
import mapping from '@/router/mapping'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param pkey 树
 * @param pid 父ID
 */
export function listToTree(list, tree, pkey, pid) {
  list.forEach(item => {
    // 判断是否为父级菜单
    if (item[pkey] == pid) {
      const child = {
        ...item,
        children: []
      }
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children, pkey, item.id)
      // 删掉不存在 children 值的属性
      if (child.children.length <= 0) {
        delete child.children
      }
      // 加入到树中
      tree.push(child)
    }
  })
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 * @param routerMap
 * @returns {[]}
 */
export function generatorRouter(routerMap) {
  const res = []

  routerMap.forEach((item) => {
    // 目录且没有children
    if (item.type === 1 && !item.children) {
      return false
    }

    const tmp = {
      // 该路由对应页面的组件
      component: mapping[item.path]?.component || mapping.Layout,
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: item.name,
        icon: item?.icon,
      },
      // 是否设置了隐藏菜单，1=显示，2=隐藏
      hidden: item.hidden !== 1
    }

    if (item.type === 1) {
      // 路由path
      tmp.path = '/' + item.children[0].path.split('/')[1]
      tmp.redirect = item.children[0].path
    } else {
      // 路由path
      tmp.path = item.path
      // 路由名称，建议唯一
      tmp.name = mapping[item.path].name
    }

    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      tmp.children = generatorRouter(item.children)
    }

    res.push(tmp)
  })

  return res
}