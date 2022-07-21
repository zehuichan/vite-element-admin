import LayoutMap, { Layout, getParentLayout } from '@/router/constant'
import { cloneDeep, omit } from 'lodash-es'
import VueRouter from 'vue-router'

export function asyncImportRoute(routes) {
  const dynamicViewsModules = import.meta.glob('../views/**/*.{vue,jsx,tsx}')
  if (!routes) return
  routes.forEach((item) => {
    const { component, name } = item
    const { children } = item
    if (component) {
      const layoutFound = LayoutMap.get(component.toUpperCase())
      if (layoutFound) {
        item.component = layoutFound
      } else {
        item.component = dynamicImport(dynamicViewsModules, component)
      }
    } else if (name) {
      item.component = getParentLayout()
    }
    children && asyncImportRoute(children)
  })
}

function dynamicImport(dynamicViewsModules, component) {
  const keys = Object.keys(dynamicViewsModules)
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../views', '')
    const startFlag = component.startsWith('/')
    const endFlag =
      component.endsWith('.vue') ??
      component.endsWith('.jsx') ??
      component.endsWith('.tsx')
    const startIndex = startFlag ? 0 : 1
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.')
    return k.substring(startIndex, lastIndex) === component
  })
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0]
    return dynamicViewsModules[matchKey]
  } else if (matchKeys?.length > 1) {
    console.warn(
      'Please do not create `.{vue,jsx,tsx}` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure'
    )
    return false
  } else {
    console.warn(`${component} is not found`)
    return false
  }
}

// 路由降级
export function flatMultiLevelRoutes(routeModules) {
  const modules = cloneDeep(routeModules)

  for (let index = 0; index < modules.length; index++) {
    const routeModule = modules[index]
    // 判断级别是否 多级 路由
    if (!isMultipleRoute(routeModule)) {
      // 声明终止当前循环， 即跳过此次循环，进行下一轮
      continue
    }
    // 路由等级提升
    promoteRouteLevel(routeModule)
  }
  return modules
}

// 层级是否大于2
function isMultipleRoute(routeModule) {
  if (
    !routeModule ||
    !Reflect.has(routeModule, 'children') ||
    !routeModule.children?.length
  ) {
    return false
  }

  const { children } = routeModule

  let flag = false
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    if (child.children?.length) {
      flag = true
      break
    }
  }
  return flag
}

// 生成二级路由
function promoteRouteLevel(routeModule) {
  // Use vue-router to splice menus
  let router = new VueRouter({
    routes: [routeModule]
  })
  const routes = router.getRoutes()
  // 将所有子路由添加到二级路由
  addToChildren(routes, routeModule.children || [], routeModule)
  router = null

  routeModule.children = routeModule.children?.map((item) =>
    omit(item, 'children')
  )
}

// 添加所有子菜单
function addToChildren(routes, children, routeModule) {
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    const route = routes.find((item) => item.name === child.name)
    if (!route) {
      continue
    }
    routeModule.children = routeModule.children || []
    if (!routeModule.children.find((item) => item.name === route.name)) {
      routeModule.children?.push(route)
    }

    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule)
    }
  }
}

// 后端数据转路由
export function transformObjToRoute(routeList) {
  routeList.forEach((route) => {
    const { component } = route
    if (component) {
      if (component.toUpperCase() === 'LAYOUT') {
        route.component = LayoutMap.get(component.toUpperCase())
      } else {
        route.children = [cloneDeep(route)]
        route.component = Layout
        route.name = `${route.name}Parent`
        route.path = ''
        const meta = route.meta || {}
        meta.single = true
        meta.affix = false
        route.meta = meta
      }
    } else {
      console.warn('请正确配置路由：' + route?.name + '的component属性')
    }
    route.children && asyncImportRoute(route.children)
  })
  return routeList
}

// 后端数据转菜单
export function transformRouteToMenu(routeModList, routerMapping = false) {
  // 借助 lodash 深拷贝
  const cloneRouteModList = cloneDeep(routeModList)
  const routeList = []

  // 对路由项进行修改
  cloneRouteModList.forEach((item) => {
    if (item?.children.length === 1) {
      const realItem = item?.children?.[0]
      realItem && routeList.push(realItem)
    } else {
      routeList.push(item)
    }
  })

  return routeList
}
