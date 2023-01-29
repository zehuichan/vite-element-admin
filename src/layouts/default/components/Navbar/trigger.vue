<template>
  <div class="trigger" @click="toggleCollapsed">
    <i class="el-icon-s-fold" v-if="!getCollapsed" />
    <i class="el-icon-s-unfold" v-else />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useMenuSetting } from '@/hooks/useMenuSetting'

export default defineComponent({
  name: 'Trigger',
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
.trigger {
  display: flex;
  height: 100%;
  padding: 0 10px;
  cursor: pointer;
  align-items: center;

  &:hover {
    background-color: #f6f6f6;
  }

  .el-icon {
    font-size: 16px;
  }
}
</style>
