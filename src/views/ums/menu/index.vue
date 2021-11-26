<template>
  <div>
    <el-container class="app-container">
      <el-aside>
        <div style="margin-bottom: 16px;">
          <el-button v-if="!state" type="primary" plain icon="el-icon-s-unfold" @click="toggle(true)">全部展开</el-button>
          <el-button v-else type="primary" plain icon="el-icon-s-fold" @click="toggle(false)">全部收起</el-button>
        </div>
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText"
          suffix-icon="el-icon-search"
        />
        <el-tree
          class="filter-tree"
          ref="tree"
          :data="data"
          node-key="id"
          :props="defaultProps"
          highlight-current
        />
      </el-aside>
      <el-main>
        
      </el-main>
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
      },
      state: false
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.data = listToTree(data, 'parentId', 0)
    },
    toggle(state) {
      this.state = state
      this.$refs.tree.store._getAllNodes().forEach(item => {
        item.expanded = state
      })
    },
  }
}
</script>

<style lang="scss">
.filter-tree {
  margin-top: 16px;
}
</style>
