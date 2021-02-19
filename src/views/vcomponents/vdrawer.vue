<template>
  <div class="v-components">
    <!--v-drawer-->
    <demo-section>
      <demo-card title="v-drawer">
        <el-button type="primary" @click="showDrawer = true">打开drawer</el-button>
        <demo-block>
          <p>el-drawer的二次封装，支持双向数据绑定展示隐藏。</p>
          <p>公共基础组件，可再次封装。</p>
        </demo-block>
      </demo-card>
      <demo-card style="width: 1200px;">
        <demo-block title="template">
          <highlightjs language="html" :code="vdrawer.template"/>
        </demo-block>
        <demo-block title="javascript">
          <highlightjs language="javascript" :code="vdrawer.javascript"/>
        </demo-block>
      </demo-card>
    </demo-section>

    <v-drawer v-model="showDrawer" title="v-drawer" size="600px">
      <demo-block title="template">
        <highlightjs language="html" :code="vdrawer.template"/>
      </demo-block>
      <demo-block title="javascript">
        <highlightjs language="javascript" :code="vdrawer.javascript"/>
      </demo-block>
    </v-drawer>
  </div>
</template>

<script>
  // mixins
  import comp from './comp'
  // code
  import {vdrawer} from './code'

  export default {
    name: 'vdrawer',
    mixins: [comp],
    data() {
      return {
        vdrawer,

        showDrawer: false,
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "./index.scss";
</style>