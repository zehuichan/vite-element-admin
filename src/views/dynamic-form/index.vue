<template>
  <div class="dynamic-form">
    <div class="app-container">
      <div class="page-header-heading">
        <span class="page-header-heading-title">{{$route.meta.title}}</span>
      </div>
    </div>
    <div class="app-container">
      <div class="clearfix">
        <div class="fl">
          <v-form v-model.sync="dataForm" :options="options"/>
        </div>
        <div class="fr">
          <code>
            {{dataForm}}
          </code>
        </div>
      </div>
    </div>
    <v-footer-tool-bar>
      <el-button type="primary" @click="submit">保存</el-button>
    </v-footer-tool-bar>
  </div>
</template>

<script>
  // components
  import FooterToolBar from '@/components/VFooterToolBar/index'
  // mapping
  import {options} from './mapping'

  export default {
    name: 'DynamicForm',
    data() {
      return {
        options: [],
        dataForm: {}
      }
    },
    created() {
      this.options = options
    },
    methods: {
      submit() {
      }
    },
    components: {
      FooterToolBar
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>