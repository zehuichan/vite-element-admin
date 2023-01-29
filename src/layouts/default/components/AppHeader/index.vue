<template>
  <div>
    <div :style="getPlaceholderDomStyle" v-if="getFixed"></div>
    <div
      :class="{'basic-layout-multiple-header': true, 'basic-layout-multiple-header--fixed': getFixed}"
    >
      <navbar />
      <tabs v-if="getShowMultipleTab" />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, unref } from 'vue'
import Navbar from '../Navbar/index.vue'
import Tabs from '../Tabs/index.vue'

import { useHeaderSetting } from '@/hooks/useHeaderSetting'
import { useMultipleTabSetting } from '@/hooks/useMultipleTabSetting'

const HEADER_HEIGHT = 48
const TABS_HEIGHT = 40

export default defineComponent({
  name: 'AppHeader',
  components: {
    Navbar,
    Tabs
  },
  setup() {
    const { getFixed, getShowHeader } = useHeaderSetting()
    const { getShowMultipleTab } = useMultipleTabSetting()

    const getPlaceholderDomStyle = computed(() => {
      let height = 0
      if (unref(getShowHeader)) {
        height += HEADER_HEIGHT
      }
      if (unref(getShowMultipleTab)) {
        height += TABS_HEIGHT
      }
      return {
        height: `${height}px`
      }
    })

    return {
      HEADER_HEIGHT,
      TABS_HEIGHT,

      getFixed,
      getPlaceholderDomStyle,

      getShowMultipleTab
    }
  }
})
</script>