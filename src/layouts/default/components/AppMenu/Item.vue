<template>
  <el-menu-item v-if="!hasMultiChild(item) && getShowMenu" :index="item.path">
    <i v-if="item.meta?.icon" :class="item.meta.icon" />
    <template #title>
      <span>{{ item.meta?.title }}</span>
    </template>
  </el-menu-item>
  <el-submenu v-else-if="hasMultiChild(item) && getShowMenu" :index="item.path">
    <template #title>
      <i v-if="item.meta?.icon" :class="item.meta.icon" />
      <span>{{ item.meta?.title }}</span>
    </template>
    <menu-item v-for="childrenItem in item.children || []" :key="childrenItem.path" :item="childrenItem" />
  </el-submenu>
</template>

<script>
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuItem',
  props: {
    item: Object
  },
  setup(props) {
    const getShowMenu = computed(() => !props.item.meta?.hideMenu)

    const hasMultiChild = (menuTreeItem) => {
      return (
        !menuTreeItem.meta?.hideChildrenInMenu &&
        Reflect.has(menuTreeItem, 'children') &&
        !!menuTreeItem.children &&
        menuTreeItem.children.length > 0
      )
    }

    return {
      getShowMenu,
      hasMultiChild
    }
  }
})
</script>
