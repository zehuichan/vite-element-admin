<template>
  <div class="basic-layout-navbar-action__item" @click="toggle">
    <i class="el-icon-full-screen" v-if="!isFullscreen" />
    <i class="el-icon-close" v-else />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useFullscreen } from '@vueuse/core'

export default defineComponent({
  name: 'Screenfull',
  setup() {
    const { isFullscreen, toggle } = useFullscreen()

    return {
      isFullscreen,
      toggle
    }
  }
})
</script>
