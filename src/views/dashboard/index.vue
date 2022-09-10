<template>
  <div>
    <div class="app-container">
      <code>Dashboard</code>
    </div>
    <div class="app-container">
      <div>
        <el-button @click="setProps({ size: 'medium' })">更改Size</el-button>
        <el-button @click="setProps({ size: 'small' })">更改Size</el-button>
        <el-button @click="setProps({ size: 'mini' })">更改Size</el-button>
        <el-button @click="setProps({ disabled: true })">禁用表单</el-button>
        <el-button @click="setProps({ disabled: false })">解除禁用</el-button>
        <el-button @click="setFieldsValue">setFieldsValue</el-button>
        <el-button @click="getFieldsValue">getFieldsValue</el-button>
        <el-button @click="updateSchema">updateSchema</el-button>
      </div>
      <schema-form
        ref="formElRef"
        :schemas="schemas"
      >
        <template #f3="{model,field}">
          <el-input v-model="model[field]" placeholder="自定义slot" />
        </template>
        <template #formFooter>
          <el-button @click="submit">submit</el-button>
        </template>
      </schema-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { optionsListApi } from '@/api'

const schemas = [
  {
    field: 'field1',
    component: 'Input',
    label: '字段1',
    colProps: {
      span: 8
    },
    defaultValue: 123,
    required: true
  },
  {
    field: 'field2',
    component: 'Input',
    label: '字段2',
    colProps: {
      span: 8
    }
  },
  {
    field: 'field3',
    component: 'Select',
    label: '字段3',
    colProps: {
      span: 8
    }
  },
  {
    field: 'field34',
    component: 'ApiSelect',
    label: 'ApiSelect',
    componentProps: {
      api: optionsListApi,
      params: {
        count: 2
      },
      resultField: 'data.list',
      // use name as label
      labelField: 'name',
      // use id as value
      valueField: 'id'
    },
    colProps: {
      span: 8
    },
    defaultValue: '1',
    required: true
  },
  {
    field: 'field35',
    component: 'ApiSelect',
    label: '本地下拉选择',
    componentProps: {
      options: [
        { label: '黄金糕', value: 1 },
        { label: '双皮奶', value: 2 },
        { label: '蚵仔煎', value: 3 },
        { label: '龙须面', value: 4 },
        { label: '北京烤鸭', value: 5 }
      ]
    },
    colProps: {
      span: 8
    }
  }
]

export default defineComponent({
  setup() {
    const formElRef = ref(null)

    return {
      formElRef,
      schemas,
      setProps(props) {
        const formEl = formElRef.value
        if (!formEl) return
        formEl.setProps(props)
      },
      setFieldsValue() {
        const formEl = formElRef.value
        if (!formEl) return
        formEl.setFieldsValue({ field1: '12312312' })
      },
      getFieldsValue() {
        const formEl = formElRef.value
        if (!formEl) return
        console.log(formEl.getFieldsValue())
      },
      updateSchema() {
        const formEl = formElRef.value
        if (!formEl) return
        formEl.updateSchema({
          field: 'field3',
          label: '字段3 New++'
        })
      },
      submit() {
        const formEl = formElRef.value
        if (!formEl) return
        formEl.validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            return false
          }
        })
      }
    }
  }
})
</script>

<style lang="scss">

</style>
