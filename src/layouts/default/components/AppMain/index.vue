<template>
  <section class="app-main">
    <keep-alive :include="include">
      <router-view :key="key" />
    </keep-alive>
  </section>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppMain',
  computed: {
    include() {
      return this.$store.state.tagsView.visitedViews.map(item => item.name)
    },
    key() {
      return this.$route.path
    }
  }
})
</script>

<style lang="scss">
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
    padding-top: 92px;
  }
}
</style>
