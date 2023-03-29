<template>
  <section class="basic-layout-content">
    <page-layout />
  </section>
</template>

<script>
import { defineComponent } from 'vue'

import PageLayout from '@/layouts/page/index.vue'

export default defineComponent({
  name: 'AppContent',
  components: { PageLayout }
})
</script>

<style lang="scss">
.basic-layout-content {
  position: relative;
  width: 100%;
  min-height: 0;
}
</style>
