<template>
  <el-popover>
    <template #reference>
      <div class="navbar-action__item">
        <i class="el-icon-bell" />
      </div>
    </template>
    <template #default>
      <div class="notification-list" v-if="list.length > 0">
        <div class="item" v-for="item in list" :key="item.id">
          <el-badge :is-dot="item.status === 0">
            <div class="title">{{ item.type }}</div>
            <div class="desc">{item.desc}</div>
          </el-badge>
        </div>
      </div>
      <div v-else class="el-empty" style="width: 220px; padding: 0 0 20px;">
        <div class="el-empty__description">暂无数据</div>
      </div>
    </template>
  </el-popover>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Notify',
  setup() {
    const list = ref([])

    return {
      list
    }
  }
}
</script>

<style lang="scss">
.notification-list {
  .item {
    padding: 5px 16px;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .title {
    margin-bottom: 4px;
    color: #333;
    font-size: 14px;
    font-weight: 600;
    line-height: normal;
    cursor: pointer;
  }

  .desc {
    color: #8c8c8c;
    font-size: 12px;
    line-height: 22px;
  }
}
</style>