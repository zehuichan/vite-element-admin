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
          <v-form ref="dataForm" v-model.sync="dataForm" :options="options" label-position="left" label-width="80px">
            <template #custom="{scope}">
              <el-image
                style="width: 100px; height: 100px"
                lazy
                fit="contain"
                :preview-src-list="pics"
              >
                <div slot="placeholder" class="image-slot">
                  <i class="el-icon-loading"></i>
                </div>
              </el-image>
              {{scope}}
            </template>
          </v-form>
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
        dataForm: {},
        pics: [],
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

<style lang="scss">
  .el-image {
    margin-right: 8px;
  }

  .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #f5f7fa;
    color: #409eff;
    font-size: 16px;
  }
</style>