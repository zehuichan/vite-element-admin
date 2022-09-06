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
      </div>
      <v-form
        ref="formElRef"
        :schemas="schemas"
      >
        <template #f3="{model,field}">
          <el-input v-model="model[field]" placeholder="自定义slot" />
        </template>
      </v-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, onActivated, onMounted, reactive, ref } from 'vue'
import VForm from '@/components/VForm'

const schemas = [
  {
    field: 'field1',
    component: 'Input',
    label: '字段1',
    colProps: {
      span: 8
    },
    defaultValue: 123
  },
  {
    field: 'field2',
    component: 'Input',
    label: '字段2',
    colProps: {
      span: 8
    }
  }
]

export default defineComponent({
  components: {
    VForm
  },
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
      }
    }
  }
})
</script>

<style lang="scss">

</style>
