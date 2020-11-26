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
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="onConfirm">保存</el-button>
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
    },
    methods: {
      onClose() {
        this.$emit('input', false)
        this.$emit('cancel', false)
      },
      onConfirm() {
        this.$emit('input', false)
        this.$emit('confirm', false)
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>