<template>
  <div class="dynamic-form">
    <div class="app-container">
      <div class="page-header-heading">
        <span class="page-header-heading-title">{{$route.meta.title}}</span>
      </div>
    </div>
    <div class="app-container">
      <el-row :gutter="20">
        <el-col :span="12">
          <v-form ref="dataForm" v-model.sync="dataForm" :options="options" label-position="left" label-width="80px"/>
        </el-col>
        <el-col :span="12">
          <code>{{dataForm}}</code>
        </el-col>
      </el-row>
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
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
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