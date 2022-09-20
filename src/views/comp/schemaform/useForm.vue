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
        <el-button @click="getFieldsValue">getFieldsValue</el-button>
        <el-button @click="handleChange">handleChange</el-button>
      </el-form-item>
    </el-form>
    <schema-form :model="modelRef" :schemas="schemas" @register="register">
      <template #f3="{ model, field }">
        <el-input v-model="model[field]" placeholder="自定义slot" />
      </template>
    </schema-form>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { optionsListApi } from '@/api'
import { useForm } from '@/components/SchemaForm'

const options = [
  { label: '黄金糕', value: 1 },
  { label: '双皮奶', value: 2 },
  { label: '蚵仔煎', value: 3 },
  { label: '龙须面', value: 4 },
  { label: '北京烤鸭', value: 5 }
]

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
  },
  {
    field: 'field35',
    component: 'ApiSelect',
    label: '本地下拉选择',
    componentProps: {
      options: options
    },
    colProps: {
      span: 8
    }
  }
]

export default defineComponent({
  setup() {
    const modelRef = ref({})

    const [register, { setProps, setFieldsValue, getFieldsValue }] = useForm()

    function handleChange() {
      modelRef.value = { field2: 123123 }
    }

    return {
      modelRef,
      register,
      schemas,
      setProps,
      setFieldsValue,
      getFieldsValue() {
        const data = getFieldsValue()
        console.log(data)
      },
      handleChange
    }
  }
})
</script>
