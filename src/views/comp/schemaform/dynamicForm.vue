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
        <el-button @click="validate">
          validate
        </el-button>
      </el-form-item>
    </el-form>
    <schema-form :schemas="schemas" @register="register">
      <template #f3="{ model, field }">
        <el-input v-model="model[field]" placeholder="自定义slot" clearable />
      </template>
    </schema-form>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { optionsListApi } from '@/api'
import { useForm } from '@/components/SchemaForm'

const schemas = [
  {
    field: 'field1',
    component: 'Input',
    label: '字段1',
    defaultValue: 123,
    required: true,
    ifShow: ({ values }) => {
      return !!values.field4
    }
  },
  {
    field: 'field4',
    component: 'Switch',
    label: '字段4',
    defaultValue: true
  },
  {
    field: 'field2',
    component: 'Input',
    label: '字段2',
    dynamicDisabled: ({ values }) => {
      return values.field35 == 1
    }
  },
  {
    field: 'field3',
    component: 'Input',
    label: '字段3',
    slot: 'f3',
    dynamicRules: ({ values }) => {
      return values.field34 == 0 ? [{ required: true, message: '必填', trigger: 'change' }] : []
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
    }
  }
]

export default defineComponent({
  setup() {
    const [register, { setProps, setFieldsValue, validate }] = useForm()

    return {
      register,
      schemas,
      setProps,
      setFieldsValue,
      validate
    }
  }
})
</script>
