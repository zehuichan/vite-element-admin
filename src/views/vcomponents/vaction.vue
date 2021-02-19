<template>
  <div class="v-components">
    <demo-card title="v-action">
      <el-button type="default" v-action:add>新增 v-action:add</el-button>
      <el-button type="primary" v-action:delete>删除 v-action:delete</el-button>
      <el-button type="success" v-action:edit>修改 v-action:edit</el-button>
      <el-button type="info" v-action:query>查询 v-action:query</el-button>
      <el-button type="warning" v-action:import>导入 v-action:import</el-button>
      <el-button type="danger" v-action:export>导出 v-action:export</el-button>
      <demo-block title="template">
        <highlightjs language="html" :code="vaction.template"/>
      </demo-block>
    </demo-card>
  </div>
</template>

<script>
  // mixins
  import comp from './comp'
  // code
  import {vaction} from './code'

  export default {
    name: 'vaction',
    mixins: [comp],
    data() {
      return {
        vaction,
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "./index.scss";
</style>