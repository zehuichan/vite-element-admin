<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="item in routes" :key="item.path">
        <span v-if="!hasRedirect(routes, item)" class="no-redirect">
          {{ item.meta?.title }}
        </span>
        <router-link v-else :to="pathCompile(item)">
          {{ item.meta.title }}
        </router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { computed, defineComponent, unref } from 'vue'
import { useStore } from '@/store'
import { useRouter } from '@/router'

import { compile } from 'path-to-regexp'

import { filter } from '@/utils/treeHelper'

import { REDIRECT_NAME } from '@/router/constant'
import { getAllParentPath } from '@/router/menuHelper'

export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    const store = useStore()

    const { currentRoute } = useRouter()

    const routes = computed(() => {
      if (currentRoute.name === REDIRECT_NAME) return []

      const menus = store.getters.menus

      const routeMatched = currentRoute.matched
      const cur = routeMatched?.[routeMatched.length - 1]
      let { path } = currentRoute

      if (cur && cur?.meta?.currentActiveMenu) {
        path = cur.meta.currentActiveMenu
      }

      const parent = getAllParentPath(menus, path)
      const filterMenus = menus.filter((item) => item.path === parent[0])
      const matched = getMatched(filterMenus, parent)

      if (!matched || matched.length === 0) return []

      const breadcrumbList = filterItem(matched)

      if (currentRoute.meta?.currentActiveMenu) {
        breadcrumbList.push({
          ...currentRoute,
          name: currentRoute.meta?.title || currentRoute.name
        })
      }

      return breadcrumbList
    })

    function getMatched(menus, parent) {
      const metched = []
      menus.forEach((item) => {
        if (parent.includes(item.path)) {
          metched.push({
            ...item,
            name: item.meta?.title || item.name
          })
        }
        if (item.children?.length) {
          metched.push(...getMatched(item.children, parent))
        }
      })
      return metched
    }

    function filterItem(list) {
      return filter(list, (item) => {
        const { meta, name } = item
        if (!meta) {
          return !!name
        }
        const { title, hideBreadcrumb, hideMenu } = meta
        if (!title || hideBreadcrumb || hideMenu) {
          return false
        }
        return true
      }).filter((item) => !item.meta?.hideBreadcrumb)
    }

    function hasRedirect(routes, route) {
      return routes.indexOf(route) !== routes.length - 1
    }

    function pathCompile(route) {
      const { redirect, path } = route
      if (redirect) {
        return redirect
      }
      const { params } = unref(currentRoute)
      const toPath = compile(path)
      return toPath(params)
    }

    return {
      routes,
      hasRedirect,
      pathCompile
    }
  }
})
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
