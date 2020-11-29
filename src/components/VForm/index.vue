<template>
  <el-form
      class="v-form"
      ref="form"
      :model="value"
      label-position="right"
  >
    <el-form-item
        v-for="item in _options"
        :key="item.key"
        :label="item.label"
        :prop="item.key"
        :rules="item.rules"
    >
      <template v-if="item.type === 'input'">
        <el-input
            :value="value[item.key]"
            :placeholder="item.placeholder"
            :disabled="item.disabled"
            :readonly="item.readonly"
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
  </el-form>
</template>

<script>
  export default {
    name: 'VForm',
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
        default: '80px'
      },
      remoteMethod: Function,
      loading: Boolean
    },
    computed: {
      _options() {
        return this.options.filter(item => !item.hidden)
      }
    },
    created() {
      this.$_setDefaultValue()
    },
    methods: {
      $_setDefaultValue() {
        this._options.forEach((item) => {
          this.value[item.key] = this.value[item.key] || item.value
        })
      },
      $_inputChange(key, event) {
        this.$emit('input', {...this.value, [key]: event})
      },
      // v-form api
      validate(cb) {
        return this.$refs.form.validate(cb)
      },
      validateField(props, cb) {
        return this.$refs.form.validateField(props, cb)
      },
      resetFields() {
        return this.$refs.form.resetFields()
      },
      clearValidate(props, cb) {
        return this.$refs.form.clearValidate(props, cb)
      },
    }
  }
</script>

<style lang="scss" scoped>
  .v-form {

  }
</style>