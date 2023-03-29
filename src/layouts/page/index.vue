<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive v-if="openCache" :include="getCaches">
      <component :is="Component" :key="route.fullPath" />
    </keep-alive>
    <component v-else :is="Component" :key="route.fullPath" />
  </router-view>
</template>

<script>
import { computed, defineComponent, unref } from 'vue'

import { useMultipleTabStore } from '@/store'
import { useMultipleTabSetting } from '@/hooks/useMultipleTabSetting'
import { useRootSetting } from '@/hooks/useRootSetting'

export default defineComponent({
  name: 'PageLayout',
  setup() {

    const tabStore = useMultipleTabStore()

    const { getOpenKeepAlive } = useRootSetting()
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

    return {
      openCache,
      getCaches
    }
  }
})
</script>