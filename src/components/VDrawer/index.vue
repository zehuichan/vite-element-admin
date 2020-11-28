<template>
  <el-drawer
      custom-class="v-drawer"
      :visible="value"
      v-bind="$attrs"
      v-on="$listeners"
      @close="onClose"
  >
    <div class="drawer-content">
      <div class="drawer-body">
        <slot/>
      </div>
      <div class="drawer-footer">
        <el-button type="default" size="medium" @click="onClose">{{cancelButtonText}}</el-button>
        <el-button type="primary" size="medium" @click="onConfirm">{{confirmButtonText}}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
  export default {
    name: 'VDrawer',
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
    :focus {
      outline: none;
    }
  }

  .drawer-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .drawer-body {
    flex: 1;
    padding: 12px;
  }

  .drawer-footer {
    padding: 12px 24px;
    text-align: right;
  }
</style>