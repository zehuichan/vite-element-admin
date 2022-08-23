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
      </div>
      <v-form
        ref="formElRef"
        :schemas="schemas"
        v-model="dataForm"
      >
        <template #f3="{model,field}">
          <el-input v-model="model[field]" placeholder="自定义slot" />
        </template>
      </v-form>
      <code>{{ dataForm }}</code>
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
    label: '自定义Slot',
    slot: 'f3',
    colProps: {
      span: 8
    }
  }
]

export default defineComponent({
  name: 'Dashboard',
  components: {
    VForm
  },
  setup() {
    const formElRef = ref(null)
    const dataForm = reactive({
      field1: '123',
      field2: '123',
      field3: '123'
    })

    onMounted(() => {
      console.log('onMounted')
    })

    onActivated(() => {
      console.log('onActivated')
    })

    return {
      formElRef,
      schemas,
      dataForm,
      setProps(props) {
        const formEl = formElRef.value
        if (!formEl) return
        formEl.setProps(props)
      }
    }
  }
})
</script>

<style lang="scss">

</style>
