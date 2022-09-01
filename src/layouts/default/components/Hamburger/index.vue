<template>
  <div class="hamburger" @click="toggleCollapsed">
    <i class="el-icon-s-fold" v-if="getCollapsed" />
    <i class="el-icon-s-unfold" v-else />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useMenuSetting } from '@/hooks/useMenuSetting'

export default defineComponent({
  name: 'Hamburger',
  setup() {
    const { getCollapsed, toggleCollapsed } = useMenuSetting()

    return {
      getCollapsed,
      toggleCollapsed
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
