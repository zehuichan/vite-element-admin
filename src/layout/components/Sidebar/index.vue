<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        mode="vertical"
        :default-active="activeMenu"
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
import { mapGetters } from 'vuex'
import Logo from './Logo.vue'
import MenuItem from './Item.vue'
import { isUrl } from '@/utils/is'

import defaultSettings from '@/settings'

export default {
  components: {
    Logo,
    MenuItem
  },
  computed: {
    ...mapGetters([
      'menus',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return defaultSettings.sidebar
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    onSelect(index) {
      if (index === this.activeMenu) return
      if (isUrl(index)) {
        window.open(index)
      } else {
        this.$router.push(index)
      }
    }
  }
}
</script>
