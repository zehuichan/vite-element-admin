<template>
  <div class="hamburger" @click="toggle">
    <i class="el-icon-s-fold" v-if="opened" />
    <i class="el-icon-s-unfold" v-else />
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  name: 'Hamburger',
  setup() {
    const store = useStore()
    const opened = computed(() => store.getters.sidebar.opened)

    function toggle() {
      store.dispatch('app/toggleSideBar')
    }

    return {
      opened,
      toggle
    }
  }
})
</script>

<style lang="scss">
.hamburger {
  display: flex;
  height: 100%;
  padding: 0 10px;
  cursor: pointer;
  align-items: center;
  font-size: 16px;
  color: #000;

  &:hover {
    background-color: #f6f6f6;
  }
}
</style>
