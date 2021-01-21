<template>
  <el-dialog
    custom-class="v-dialog"
    :visible="value"
    v-bind="$attrs"
    v-on="$listeners"
    @close="onClose"
  >
    <slot/>
    <div slot="footer" class="dialog-footer">
      <slot name="footer">
        <el-button type="default" @click="onClose">{{cancelButtonText}}</el-button>
        <el-button v-bind="$attrs" type="primary" @click="onConfirm">
          {{$attrs.loading ? '提交中...' : confirmButtonText}}
        </el-button>
      </slot>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'VDialog',
    model: {
      prop: 'value',
      event: 'input'
    },
    props: {
      value: Boolean,
      confirmButtonText: {
        type: String,
        default: '确认'
      },
      cancelButtonText: {
        type: String,
        default: '取消'
      },
    },
    methods: {
      onClose() {
        this.$emit('input', false)
        this.$emit('cancel', false)
      },
      onConfirm() {
        this.$emit('confirm')
      },
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep {
    .v-dialog.el-dialog {
      border-radius: 2px;

      .el-dialog__header {
        background-color: #F6FAFF;
        padding: 12px 24px;
        border-radius: 2px 2px 0 0;
      }

      .el-dialog__title {
        font-size: 14px;
        font-weight: 600;
      }

      .el-dialog__headerbtn {
        top: 16px;
      }

      .el-dialog__body {
        padding: 24px 20px 20px;
      }
    }
  }
</style>