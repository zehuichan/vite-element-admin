<template>
  <div :class="['app-wrapper', classObj, mediaQuery]">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{hasTagsView: needTagsView}" class="main-container">
      <div :class="{'fixed-header': fixedHeader}">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, unref } from 'vue'

import { useStore } from '@/store'

import AppMain from './components/AppMain/index.vue'
import Navbar from './components/Navbar/index.vue'
import Sidebar from './components/Sidebar/index.vue'
import TagsView from './components/TagsView/index.vue'
import ResizeMixin from './mixin/ResizeHandler'

export default defineComponent({
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  setup() {
    const store = useStore()

    const sidebar = computed(() => store.state.app.sidebar)
    const device = computed(() => store.state.app.device)
    const mediaQuery = computed(() => store.state.app.mediaQuery)
    const showSettings = computed(() => store.state.settings.showSettings)
    const needTagsView = computed(() => store.state.settings.tagsView)
    const fixedHeader = computed(() => store.state.settings.fixedHeader)
    const classObj = computed(() => ({
      hideSidebar: !unref(sidebar).opened,
      openSidebar: unref(sidebar).opened,
      withoutAnimation: unref(sidebar).withoutAnimation,
      mobile: unref(device) === 'mobile'
    }))

    function handleClickOutside() {
      store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }

    return {
      sidebar,
      device,
      mediaQuery,
      showSettings,
      needTagsView,
      fixedHeader,
      classObj,

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
