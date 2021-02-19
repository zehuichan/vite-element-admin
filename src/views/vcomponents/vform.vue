<template>
  <div class="v-components">
    <!--v-form-->
    <demo-section>
      <demo-card title="v-form">
        <v-form v-model="dataForm" :options="form" label-position="right" label-width="80px">
          <template #custom="{scope}">
            <el-image lazy fit="contain" style="width: 100px; height: 100px">
              <div slot="placeholder" class="image-slot">
                <i class="el-icon-loading"></i>
              </div>
            </el-image>
          </template>
          <template #actions>
            <el-button type="primary">立即创建</el-button>
            <el-button>取消</el-button>
          </template>
        </v-form>
      </demo-card>
      <demo-card style="width: 1200px;">
        <demo-block title="template">
          <highlightjs language="html" :code="vform.template"/>
        </demo-block>
        <demo-block title="javascript">
          <highlightjs language="javascript" :code="vform.javascript"/>
        </demo-block>
      </demo-card>
    </demo-section>
  </div>
</template>

<script>
  // mixins
  import comp from './comp'
  // mapping
  import {form} from './mapping'
  // code
  import {vform} from './code'

  export default {
    name: 'vform',
    mixins: [comp],
    data() {
      return {
        form,
        vform,

        dataForm: {},
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "./index.scss";
</style>