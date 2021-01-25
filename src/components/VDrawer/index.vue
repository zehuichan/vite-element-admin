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
        <el-button v-bind="$attrs" type="primary" size="medium" @click="onConfirm">
          {{$attrs.loading ? '提交中...' : confirmButtonText}}
        </el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
  import popup from '@/components/utils/popup'

  export default {
    name: 'VDrawer',
    mixins: [popup]
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
    padding: 0 24px;
  }

  .drawer-footer {
    padding: 12px 24px;
    text-align: right;
  }
</style>