<template>
  <div class="v-search">
    <div class="app-container">
      <el-form label-position="right" ref="form" :model="value" :label-width="labelWidth">
        <el-row>
          <el-col :span="22">
            <el-col :span="8" v-for="item in _options" :key="item.key">
              <el-form-item :label="item.label" :prop="item.key">
                <template v-if="item.type === 'input'">
                  <el-input
                    :value="value[item.key]"
                    :placeholder="item.placeholder"
                    :disabled="item.disabled"
                    clearable
                    @input="$_inputChange(item.key, $event)"
                    style="width:100%"
                  />
                </template>
                <template v-if="item.type === 'select'">
                  <el-select
                    :value="value[item.key]"
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
                    @input="$_inputChange(item.key, $event)"
                    style="width:100%"
                  >
                    <el-option label="全部" value="全部" @click.native="value[item.key] = null"/>
                    <el-option
                      v-for="(sub, idx) in item.options"
                      :key="idx"
                      :value="sub.value"
                      :label="sub.label"
                    />
                  </el-select>
                </template>
                <template v-if="item.type === 'daterange'">
                  <el-date-picker
                    :value="value[item.key]"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :value-format="item.valueFormat || ''"
                    :default-time="item.defaultTime || ['00:00:00', '23:59:59']"
                    @input="$_inputChange(item.key, $event)"
                    style="width:100%; height:33px;"
                  />
                </template>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="2" class="text-right" v-if="options.length > threshold">
            <el-button type="text" @click="ellipsis = !ellipsis">
              {{ellipsis ? '收起' : '展开'}}<i class="el-icon--right" :class="_icon"/>
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="base-form-tools clearfix">
      <div class="fl">
        <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
        <el-button type="default" icon="el-icon-refresh" @click="onReset">重置</el-button>
        <slot name="tools"/>
      </div>
      <div class="extra fr" v-if="$slots && $slots.extra">
        <slot name="extra"/>
      </div>
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
        default: () => {
          return {}
        }
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
      loading: Boolean,
      // 阈值
      threshold: {
        type: String | Number,
        default: 5
      }
    },
    data() {
      return {
        ellipsis: false
      }
    },
    computed: {
      _options() {
        const tempArr = this.options.filter(item => !item.hidden)
        return tempArr.slice(0, this.ellipsis ? tempArr.length : this.threshold)
      },
      _icon() {
        return this.ellipsis ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
      },
    },
    watch: {
      _options: {
        handler: '$_setDefaultValue',
        immediate: true
      }
    },
    methods: {
      onSearch() {
        this.$emit('input', { ...this.value })
        this.$emit('change', { ...this.value })
        this.$emit('search', { ...this.value })
      },
      onReset() {
        this.$refs.form.resetFields()
        this.$emit('input', { ...this.value })
        this.$emit('change', { ...this.value })
        this.$emit('reset', { ...this.value })
      },
      $_setDefaultValue() {
        this._options.forEach((item) => {
          this.value[item.key] = this.value[item.key] || item.value
        })
      },
      $_inputChange(key, event) {
        this.$emit('input', { ...this.value, [key]: event })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .v-search {

    .base-form-tools {
      margin: 24px 24px 0;
    }
  }
</style>
