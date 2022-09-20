<template>
  <div class="app-container">
    <schema-form auto-submit-on-enter @register="register" @enter="handelQuery">
      <template #actions>
        <div style="display: flex">
          <el-button>导入</el-button>
          <el-button>导出</el-button>
          <div class="flex-grow"></div>
          <div>
            <el-button>重置</el-button>
            <el-button type="primary" @click="handelQuery">查询</el-button>
          </div>
        </div>
      </template>
    </schema-form>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
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
    field: 'field3',
    component: 'Input',
    label: '字段3',
    colProps: {
      span: 8
    }
  },
  {
    field: 'actions',
    colSlot: 'actions'
  }
]

export default defineComponent({
  setup() {
    const [register, { getFieldsValue }] = useForm({
      schemas
    })

    return {
      register,
      handelQuery() {
        const data = getFieldsValue()
        console.log(data)
      }
    }
  }
})
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
