<template>
  <el-form
    class="v-form"
    ref="dataForm"
    :model="value"
    label-position="right"
    label-width="120px"
    style="width: 470px;"
  >
    <el-form-item
      v-for="(item, index) in options"
      :key="index"
      v-if="!item.hidden"
      :label="item.label"
      :prop="item.key"
    >
      <el-input
        v-if="item.type == 'input'"
        v-model="value[item.key]"
        :placeholder="item.placeholder"
        :disabled="item.disabled"
        clearable
        style="width:100%"
      />
      <el-select
        v-if="item.type == 'select'"
        v-model="value[item.key]"
        :multiple="item.multiple"
        :collapse-tags="item.multiple"
        :filterable="item.remote"
        :remote="item.remote"
        :reserve-keyword="item.remote"
        :remote-method="remoteMethod"
        :placeholder="item.placeholder"
        :disabled="item.disabled"
        :loading="loading"
        clearable
        style="width:100%"
      >
        <el-option label="全部" value="" v-if="!item.remote"/>
        <el-option
          v-for="(sub, idx) in item.options"
          :key="idx"
          :value="sub.value"
          :label="sub.label"
        />
      </el-select>
      <el-date-picker
        v-if="item.type == 'daterange'"
        v-model="value[item.key]"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :value-format="item.valueFormat || ''"
        :default-time="item.defaultTime || ['00:00:00', '23:59:59']"
        style="width:100%; height:33px;"
      />
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'VForm',
    model: {
      prop: 'value',
      event: 'update:value'
    },
    props: {
      value: {
        type: Object,
        default: () => ({})
      },
      options: {
        type: Array,
        default: () => [],
        required: true
      },
      labelWidth: {
        type: String,
        default: '120px'
      },
      remoteMethod: Function,
      loading: Boolean
    },
  }
</script>

<style lang="scss" scoped>
.v-form {}
</style>