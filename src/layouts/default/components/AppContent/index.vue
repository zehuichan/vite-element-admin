<template>
  <section class="basic-layout-content">
    <keep-alive v-if="openCache" :include="getCaches">
      <router-view :key="key" />
    </keep-alive>
    <router-view v-else :key="key" />
  </section>
</template>

<script>
import { computed, defineComponent, unref } from 'vue'
import { useRoute } from 'vue-router/composables'

import { useMultipleTabStore } from '@/store'
import { useRootSetting } from '@/hooks/useRootSetting'
import { useMultipleTabSetting } from '@/hooks/useMultipleTabSetting'

export default defineComponent({
  name: 'AppContent',
  setup() {
    const route = useRoute()

    const tabStore = useMultipleTabStore()

    const { setRootSetting, getOpenKeepAlive, getFullContent } = useRootSetting()
    const { getShowMultipleTab } = useMultipleTabSetting()

    const openCache = computed(
      () => unref(getOpenKeepAlive) && unref(getShowMultipleTab)
    )
    const getCaches = computed(() => {
      if (!unref(getOpenKeepAlive)) {
        return []
      }
      return tabStore.getCachedTabList
    })

    const key = computed(() => route.fullPath)

    return {
      openCache,
      getCaches,
      key
    }
  }
})
</script>

<style lang="scss">
.basic-layout-content {
  position: relative;
  width: 100%;
  min-height: 0;
}
</style>
