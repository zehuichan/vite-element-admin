<template>
  <div>
    <el-menu-item v-if="!hasMultiChild(item) && getShowMenu" :index="item.path">
      <i v-if="item.meta.icon" class="svg-icon" :class="item.meta.icon" />
      <template #title>
        <span>{{ item.meta?.title }}</span>
      </template>
    </el-menu-item>
    <el-submenu v-if="hasMultiChild(item) && getShowMenu" :index="item.path">
      <template #title>
        <i v-if="item.meta.icon" class="svg-icon" :class="item.meta.icon" />
        <span>{{ item.meta?.title }}</span>
      </template>
      <menu-item v-for="sub in item.children || []" :key="sub.path" :item="sub" />
    </el-submenu>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import FixiOSBug from './FixiOSBug'

export default defineComponent({
  name: 'MenuItem',
  mixins: [FixiOSBug],
  props: {
    item: Object
  },
  setup(props) {
    const getShowMenu = computed(() => !props.item.meta?.hidden)

    const hasMultiChild = (item) => {
      return (
        !item.meta?.hidden &&
        Reflect.has(item, 'children') &&
        !!item.children &&
        item.children.length > 0
      )
    }

    return {
      getShowMenu,
      hasMultiChild
    }
  }
})
</script>
