<template>
  <el-col>
    <el-form-item>
      <template v-if="labelIsVNode" #label>
        <component :is="label" />
      </template>
      <component
        v-model="getModelValue"
        v-bind="compAttr"
        :is="renderComponent"
      />
    </el-form-item>
  </el-col>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { componentMap } from '../componentMap'

export default defineComponent({
  name: 'VFormItem',
  inheritAttrs: false,
  props: {
    schema: {
      type: Object,
      default: () => ({})
    },
    formProps: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const { component, field, label } = props.schema

    // 内容组件的双向绑定数据
    const getModelValue = computed({
      get() {
        return props.formProps.model[field]
      },
      set(value) {
        props.setFormModel(field, value)
      }
    })

    function renderComponent() {
      if (props.schema.render) {
        return props.schema.render
      }
      return componentMap.get(component)
    }

    return {
      getModelValue,
      renderComponent
    }
  }
})
</script>

<style>

</style>