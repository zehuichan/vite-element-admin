<template>
  <section class="app-main">
    <!--    <transition name="fade-transform" mode="out-in">-->
    <keep-alive :include="cachedViews">
      <router-view :key="key"/>
    </keep-alive>
    <!--    </transition>-->
    <v-footer :copyright="copyright"/>
  </section>
</template>

<script>
  // settings
  import defaultSettings from '@/settings'

  export default {
    name: 'AppMain',
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      },
      key() {
        return this.$route.path
      },
      copyright() {
        return defaultSettings.copyright
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-main {
    /*50 = navbar  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
    background: #f0f2f5;
  }

  .fixed-header + .app-main {
    padding-top: 50px;
  }

  .hasTagsView {
    .app-main {
      /* 84 = navbar + tags-view = 50 + 34 */
      min-height: 100vh;
    }

    .fixed-header + .app-main {
      padding-top: 84px;
    }
  }
</style>

<style lang="scss">
  // fix css style bug in open el-dialog
  .el-popup-parent--hidden {
    .fixed-header {
      padding-right: 15px;
    }
  }
</style>
