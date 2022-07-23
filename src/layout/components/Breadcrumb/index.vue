<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index === levelList.length - 1" class="no-redirect">
          {{ item.meta?.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { compile } from 'path-to-regexp'
import { getMenus } from '@/router'
import { REDIRECT_NAME } from '@/router/constant'
import { getAllParentPath } from '@/utils/menuHelper'
import { filter } from '@/utils/treeHelper'

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
    return !(!title || hideBreadcrumb || hideMenu)
  }).filter((item) => !item.meta?.hideBreadcrumb)
}

const generator = (routerMap) => {
  return routerMap.map((item) => {
    const currentMenu = {
      ...item,
      label: item.meta.title,
      key: item.name,
      disabled: item.path === '/'
    }
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentMenu.children = generator(item.children, currentMenu)
    }
    return currentMenu
  })
}

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      const currentRoute = this.$route
      if (currentRoute.name === REDIRECT_NAME) return
      const menus = getMenus()

      const routeMatched = currentRoute.matched
      const cur = routeMatched?.[routeMatched.length - 1]
      let path = currentRoute.path

      if (cur && cur?.meta?.currentActiveMenu) {
        path = cur.meta.currentActiveMenu
      }

      const parent = getAllParentPath(menus, path)
      const filterMenus = menus.filter((item) => item.path === parent[0])
      const matched = getMatched(filterMenus, parent)

      if (!matched || matched.length === 0) return


      const breadcrumbList = filterItem(matched)


      if (currentRoute.meta?.currentActiveMenu) {
        breadcrumbList.push({
          ...currentRoute,
          name: currentRoute.meta?.title || currentRoute.name
        })
      }
      this.levelList = breadcrumbList
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      const toPath = compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
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
