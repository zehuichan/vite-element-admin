<template>
  <div class="app-container">
    <el-form>
      <el-form-item label="配置">
        <el-button @click="setProps({ size: 'medium' })">medium</el-button>
        <el-button @click="setProps({ size: 'small' })">small</el-button>
        <el-button @click="setProps({ size: 'mini' })">mini</el-button>
        <el-button @click="setProps({ disabled: true })">禁用表单</el-button>
        <el-button @click="setProps({ disabled: false })">解除禁用</el-button>
        <el-button @click="setFieldsValue({ field1: 123123 })">
          setFieldsValue
        </el-button>
      </el-form-item>
    </el-form>
    <schema-form ref="formRef" :schemas="schemas">
      <template #f3="{ model, field }">
        <el-input v-model="model[field]" placeholder="自定义slot" />
      </template>
    </schema-form>
  </div>
</template>

<script>
import { defineComponent, ref, unref } from 'vue'
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
    component: 'Input',
    label: '字段3',
    slot: 'f3',
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
  }
]

export default defineComponent({
  setup() {
    const formRef = ref(null)

    return {
      formRef,
      schemas,
      setProps(props) {
        unref(formRef).setProps(props)
      },
      setFieldsValue(values) {
        unref(formRef).setFieldsValue(values)
      }
    }
  }
})
</script>
