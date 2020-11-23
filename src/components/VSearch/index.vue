<template>
  <div class="v-search">
    <div class="app-container">
      <el-form label-position="right" ref="dataForm" :model="value" :label-width="labelWidth">
        <el-row :gutter="32">
          <el-col :span="8" v-for="(item, index) in options" :key="index" v-if="!item.hidden">
            <el-form-item :label="item.label" :prop="item.key">
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
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="base-form-tools">
      <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
      <el-button type="default" icon="el-icon-refresh" @click="onReset">重置</el-button>
      <slot name="tools"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VSearch',
    model: {
      prop: 'value',
      event: 'input'
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
    methods: {
      onSearch() {
        this.$emit('input', this.value)
        this.$emit('change', this.value)
        this.$emit('search', this.value)
      },
      onReset() {
        this.$refs.dataForm.resetFields()
        this.$emit('input', this.value)
        this.$emit('change', this.value)
        this.$emit('reset', this.value)
      }
    }
  }
</script>

<style lang="scss">
  .v-search {

    .base-form-tools {
      margin: 0 24px;
    }
  }
</style>
