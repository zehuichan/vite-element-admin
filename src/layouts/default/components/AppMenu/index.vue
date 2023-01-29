<template>
  <el-menu
    mode="vertical"
    :default-active="defaultActive"
    :collapse="collapse"
    :unique-opened="getAccordion"
    :background-color="getMenuBackgroundColor"
    :text-color="getMenuTextColor"
    :active-text-color="getMenuActiveTextColor"
    :collapse-transition="false"
    @select="onSelect"
  >
    <menu-item v-for="route in routes" :key="route.path" :item="route" />
  </el-menu>
</template>

<script>
import { computed, defineComponent, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'

import MenuItem from './Item.vue'

import { isUrl } from '@/utils/is'
import { useAppInjectStore } from '@/hooks/useAppProvideStore'
import { useMenuSetting } from '@/hooks/useMenuSetting'

export default defineComponent({
  name: 'AppMenu',
  components: {
    MenuItem
  },
  props: {
    routes: Array,
    uniqueOpened: Boolean
  },
  emits: ['click'],
  setup(props, { emit }) {
    const { getIsMobile } = useAppInjectStore()

    const {
      getCollapsed,
      getAccordion,
      getMenuBackgroundColor,
      getMenuTextColor,
      getMenuActiveTextColor,
      getMenuWidth
    } = useMenuSetting()

    const router = useRouter()
    const route = useRoute()

    const defaultActive = computed(() => {
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.currentActiveMenu) {
        return meta.currentActiveMenu
      }
      return path
    })

    const collapse = computed(() => {
      if (unref(getIsMobile)) {
        return false
      }
      return unref(getCollapsed)
    })

    function onSelect(index) {
      if (index === defaultActive.value) return
      if (isUrl(index)) {
        window.open(index)
      } else {
        emit('click')
        router.push(index)
      }
    }

    return {
      getCollapsed,
      getAccordion,
      getMenuBackgroundColor,
      getMenuTextColor,
      getMenuActiveTextColor,
      getMenuWidth,

      defaultActive,
      collapse,
      onSelect
    }
  }
})
</script>

<style lang="scss">
.el-menu-item:not(.is-active) {
  &:hover {
    i {
      color: #fff;
    }

    color: #fff !important;
  }
}
</style>
