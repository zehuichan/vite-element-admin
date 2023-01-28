<template>
  <div :class="{'fixed-header': getFixed}">
    <navbar />
    <tags-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import Navbar from '../Navbar/index.vue'
import TagsView from '../TagsView/index.vue'

import { useHeaderSetting } from '@/hooks/useHeaderSetting'

export default defineComponent({
  name: 'AppHeader',
  components: {
    Navbar,
    TagsView
  },
  setup() {
    const { getFixed } = useHeaderSetting()

    return {
      getFixed
    }
  }
})
</script>

<style scoped>

</style>