<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
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
        <menu-item v-for="route in menus" :key="route.path" :item="route" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { computed, defineComponent, unref } from 'vue'

import { usePermissionStore } from '@/store'
import { useRoute, useRouter } from '@/router'

import Logo from './logo.vue'
import MenuItem from './Item.vue'

import { isUrl } from '@/utils/is'
import { useAppInjectStore } from '@/hooks/useAppProvideStore'
import { useMenuSetting } from '@/hooks/useMenuSetting'

export default defineComponent({
  components: {
    Logo,
    MenuItem
  },
  setup() {
    const permissionStore = usePermissionStore()

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

    const menus = computed(() => permissionStore.getMenus)

    function onSelect(index) {
      if (index === defaultActive.value) return
      if (isUrl(index)) {
        window.open(index)
      } else {
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
      onSelect,
      menus
    }
  }
})
</script>
