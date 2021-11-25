<template>
  <div>
    <el-container class="app-container">
      <el-aside>
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText"
        />
        <el-tree
          class="filter-tree"
          :data="data"
          :props="defaultProps"
          highlight-current
        />
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script>
// api
import { data } from './data'
// utils
import listToTree from '@/utils/listToTree'

export default {
  name: 'Menu',
  data() {
    return {
      filterText: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.data = listToTree(data, 'parentId', 0)
    }
  }
}
</script>

<style lang="scss">
.filter-tree {
  margin-top: 16px;
}
</style>
