<template>
  <div class="app-wrapper" :class="layoutClass">
    <div v-if="getIsMobile && !getCollapsed" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{hasTagsView: getShowMultipleTab}" class="main-container">
      <div :class="{'fixed-header': getFixed}">
        <navbar />
        <tags-view v-if="getShowMultipleTab" />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, unref, watch } from 'vue'

import AppMain from './components/AppMain/index.vue'
import Navbar from './components/Navbar/index.vue'
import TagsView from './components/TagsView/index.vue'
import Sidebar from './components/Sidebar/index.vue'

import { useAppInjectStore } from '@/hooks/useAppProvideStore'
import { useMenuSetting } from '@/hooks/useMenuSetting'
import { useHeaderSetting } from '@/hooks/useHeaderSetting'
import { useMultipleTabSetting } from '@/hooks/useMultipleTabSetting'

export default defineComponent({
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    TagsView,
    Sidebar
  },
  setup() {
    const { getIsMobile } = useAppInjectStore()

    const {
      setMenuSetting,
      getCollapsed,
      getAnimation
    } = useMenuSetting()
    const {
      getFixed
    } = useHeaderSetting()
    const {
      getShowMultipleTab
    } = useMultipleTabSetting()

    const layoutClass = computed(() => {
      const opened = unref(getCollapsed)
      return {
        hideSidebar: opened,
        openSidebar: !opened,
        withoutAnimation: unref(getAnimation),
        mobile: unref(getIsMobile)
      }
    })

    watch(
      () => getIsMobile.value,
      () => {
        setMenuSetting({
          animation: unref(getCollapsed) && true
        })
      }
    )

    function handleClickOutside() {
      setMenuSetting({
        collapsed: true,
        animation: false
      })
    }

    onMounted(() => {
      if (unref(getCollapsed)) {
        setMenuSetting({
          collapsed: true,
          animation: true
        })
      }
    })

    return {
      getIsMobile,
      layoutClass,
      getFixed,
      getShowMultipleTab,
      getCollapsed,
      handleClickOutside
    }
  }
})
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}
</style>
