<template>
  <div>
    <div class="app-container">
      <el-form ref="dataForm" :model="dataForm" label-width="110px">
        <el-form-item label="菜单ICON：" prop="icon" required>
          <v-icon-select v-model="dataForm.icon" placeholder="请选择" clearable/>
        </el-form-item>
      </el-form>
    </div>
    <div class="app-container">
      <el-form ref="dataForm" :model="dataForm" label-width="110px">
        <el-form-item label="菜单ICON：" prop="icon" required>
          <v-icon-select2 v-model="dataForm.icon2" placeholder="请选择" clearable/>
        </el-form-item>
      </el-form>
    </div>
    <div class="app-container">
      <code>{{dataForm}}</code>
    </div>
    <footer-tool-bar>
      <el-button type="default" @click="onReset">取消</el-button>
      <el-button type="primary">确认保存</el-button>
    </footer-tool-bar>
  </div>
</template>

<script>
  export default {
    name: 'Demo',
    data() {
      return {
        dataForm: {
          icon: 'el-icon-orange',
          icon2: 'platform-eleme'
        },
      }
    },
    methods: {
      onReset() {
        this.$refs.dataForm.resetFields()
      },
    }
  }
</script>

<style scoped>

</style>