<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        mode="vertical"
        :default-active="defaultActive"
        :collapse="isCollapse"
        :background-color="variables.backgroundColor"
        :text-color="variables.textColor"
        :active-text-color="variables.activeTextColor"
        @select="onSelect"
      >
        <menu-item v-for="route in menus" :key="route.path" :item="route" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'

import { useStore } from '@/store'
import { useRoute, useRouter } from '@/router'

import Logo from './Logo.vue'
import MenuItem from './Item.vue'

import defaultSettings from '@/settings'
import { isUrl } from '@/utils/is'

export default defineComponent({
  components: {
    Logo,
    MenuItem
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const showLogo = computed(() => store.state.settings.sidebarLogo)
    const isCollapse = computed(() => !store.getters.sidebar.opened)
    const defaultActive = computed(() => {
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.currentActiveMenu) {
        return meta.currentActiveMenu
      }
      return path
    })
    const variables = computed(() => defaultSettings.sidebar)
    const menus = computed(() => store.getters.menus)

    function onSelect(index) {
      if (index === defaultActive.value) return
      if (isUrl(index)) {
        window.open(index)
      } else {
        router.push(index)
      }
    }

    return {
      showLogo,
      isCollapse,
      defaultActive,
      variables,
      menus,
      onSelect
    }
  }
})
</script>
