<template>
  <el-dialog
    custom-class="v-dialog"
    :visible="value"
    v-bind="$attrs"
    v-on="$listeners"
    :show-close="false"
    @close="onClose"
  >
    <slot/>
    <div slot="footer" class="dialog-footer">
      <el-button type="default" size="medium" @click="onClose">{{cancelButtonText}}</el-button>
      <el-button v-bind="$attrs" type="primary" size="medium" @click="onConfirm">
        {{$attrs.loading ? '提交中...' : confirmButtonText}}
      </el-button>
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

</style>