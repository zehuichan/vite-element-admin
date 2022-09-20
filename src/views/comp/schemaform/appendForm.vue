<template>
  <div class="app-container">
    <schema-form @register="register">
      <template #add="{ field }">
        <el-button v-if="Number(field) === 0" text icon="Plus" @click="add" />
        <el-button v-if="field > 0" text icon="Minus" @click="del(field)" />
      </template>
    </schema-form>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useForm } from '@/components/SchemaForm'

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
    const [register, { appendSchemaByField, removeSchemaByFiled }] = useForm({
      schemas
    })
    const n = ref(1)

    function add() {
      appendSchemaByField({
        field: `field${n.value}a`,
        component: 'Input',
        label: '字段' + n.value,
        colProps: {
          span: 16
        },
        defaultValue: 123,
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
      register,
      add,
      del
    }
  }
})
</script>
