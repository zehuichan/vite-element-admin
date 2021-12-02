<template>
  <div>
    <div class="app-container">
      <code>
        当前角色，当前页面，分配的按钮权限
        {{ permissions }}
      </code>
    </div>
    <div class="app-container">
      <el-row>
        <el-button v-action:add>新增 v-action:add</el-button>
        <el-button type="primary" v-action:delete>删除 v-action:delete</el-button>
        <el-button type="success" v-action:edit>修改 v-action:edit</el-button>
        <el-button type="info" v-action:query>查询 v-action:query</el-button>
        <el-button type="warning" v-action:import>导入 v-action:import</el-button>
        <el-button type="danger" v-action:export>导出 v-action:export</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
// directives
import action from '@/directive/action/index'

export default {
  name: 'Dashboard',
  dicts: ['order_status'],
  data() {
    return {
      permissions: {
        permissionId: 'dashboard',
        actionsList: ['add', 'delete', 'edit', 'query', 'import', 'export'],
      }
    }
  },
  directives: {
    action
  },
  created() {
    console.log(this.dict)
  }
}
</script>

<style lang="scss">

</style>
