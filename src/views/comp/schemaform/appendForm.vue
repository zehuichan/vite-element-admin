<template>
  <div class="app-container">
    <el-form>
      <el-form-item label="配置">
        <el-button @click="validate">
          validate
        </el-button>
      </el-form-item>
    </el-form>
    <schema-form :schemas="schemas" @register="register">
      <template #add="{field}">
        <el-button v-if="Number(field) === 0" text icon="el-icon-plus" @click="add" />
        <el-button v-if="field > 0" text icon="el-icon-minus" @click="del(field)" />
      </template>
    </schema-form>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import { useForm } from '@/components/SchemaForm'

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
    field: '0',
    component: 'Input',
    colProps: {
      span: 8
    },
    slot: 'add'
  }
]

export default defineComponent({
  setup() {
    const [register, { validate, appendSchemaByField, removeSchemaByFiled }] = useForm()
    const n = ref(1)

    function add() {
      appendSchemaByField({
        field: `field${n.value}a`,
        component: 'Input',
        label: '字段' + n.value,
        colProps: {
          span: 16
        },
        required: true
      })
      appendSchemaByField({
        field: `${n.value}`,
        component: 'Input',
        label: ' ',
        colProps: {
          span: 8
        },
        slot: 'add'
      })
      n.value++
    }

    function del(field) {
      removeSchemaByFiled([`field${field}a`, `field${field}b`, `${field}`])
      n.value--
    }

    return {
      schemas,
      register,
      validate,
      add,
      del
    }
  }
})
</script>
