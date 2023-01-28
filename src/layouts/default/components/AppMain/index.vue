<template>
  <section class="app-main">
    <keep-alive :include="include">
      <router-view :key="key" />
    </keep-alive>
  </section>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router/composables'
import { useMultipleTabStore } from '@/store'

export default defineComponent({
  name: 'AppMain',
  setup() {
    const multipleTabStore = useMultipleTabStore()
    const route = useRoute()

    const include = computed(() => multipleTabStore.getTabList.map(item => item.name))
    const key = computed(() => route.path)

    return {
      include,
      key
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
