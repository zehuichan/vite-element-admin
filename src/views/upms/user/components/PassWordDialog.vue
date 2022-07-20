<template>
  <el-dialog :visible.sync="visible" title="修改密码" :close-on-click-modal="false" width="380px">
    <el-form ref="dataForm" label-position="left" label-width="80px" :model="dataForm" :rules="rules">
      <el-form-item label="密码" prop="password">
        <el-input v-model="dataForm.password" type="password"/>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="dataForm.checkPass" type="password"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="onClose">关闭</el-button>
      <el-button size="mini" type="primary" @click="onConfirm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'PassWordDialog',
    props: {
      value: Boolean
    },
    watch: {
      value(val) {
        this.visible = val
      },
    },
    data() {
      return {
        visible: this.value,
        dataForm: {
          password: '',
          checkPass: ''
        },
        rules: {
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {
              validator: (rule, value, callback) => {
                if (this.dataForm.checkPass !== '') {
                  this.$refs.dataForm.validateField('checkPass')
                }
                callback()
              }, trigger: 'blur'
            }
          ],
          checkPass: [
            {required: true, message: '请再输入确认密码', trigger: 'blur'},
            {
              validator: (rule, value, callback) => {
                if (value !== this.dataForm.password) {
                  callback(new Error('两次输入密码不一致!'))
                } else {
                  callback()
                }
              }, trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      onClose() {
        this.visible = false
        this.$emit('input', false)
      },
      onConfirm() {
        this.visible = false
        this.$emit('input', false)
      }
    }
  }
</script>

<style lang="scss">

</style>