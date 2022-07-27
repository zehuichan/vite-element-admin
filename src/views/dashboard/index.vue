<template>
  <div>
    <div class="app-container">
      <code>Dashboard</code>
    </div>
    <div class="app-container">
      <el-button @click="setProps({ labelWidth: 150 })" class="mr-2"> 更改labelWidth</el-button>
      <v-form ref="formEl" :schemas="schemas" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import VForm from '@/components/VForm'

const schemas = [
  {
    field: 'field1',
    component: 'Input',
    label: '字段1',
    colProps: {
      span: 8
    }
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
    component: 'DatePicker',
    label: '字段3',
    colProps: {
      span: 8
    }
  }
]

export default {
  name: 'Dashboard',
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
      }
    }
  }
}
</script>

<style lang="scss">

</style>
