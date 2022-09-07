<template>
  <el-form
    ref="formElRef"
    :model="formModel"
    :label-position="labelPosition"
    :label-width="labelWidth"
    v-bind="propsRef"
    @keyup.enter.native="handleEnterPress"
  >
    <el-row v-bind="getRow">
      <slot name="formHeader"></slot>
      <template v-for="schema in getSchema">
        <v-form-item
          :schema="schema"
          :formProps="getProps"
          :allDefaultValues="defaultValueRef"
          :formModel="formModel"
          v-model="formModel[schema.field]"
        >
          <template v-for="item in Object.keys($scopedSlots)" #[item]="data">
            <slot :name="item" v-bind="data || {}"></slot>
          </template>
        </v-form-item>
      </template>
      <slot name="formFooter"></slot>
    </el-row>
  </el-form>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, ref, unref, watch } from 'vue'

import { useFormValues } from './hooks/useFormValues'
import { useFormEvents } from './hooks/useFormEvents'

import VFormItem from './components/VFormItem.vue'
import { cloneDeep } from 'lodash-es'

export default defineComponent({
  name: 'VForm',
  components: {
    VFormItem
  },
  inheritAttrs: false,
  props: {
    labelPosition: {
      type: String,
      default: 'right'
    },
    labelWidth: {
      type: [Number, String],
      default: '80px'
    },
    // 表单配置规则
    schemas: {
      type: [Array],
      default: () => []
    },
    size: String,
    disabled: Boolean,
    autoSubmitOnEnter: {
      type: Boolean,
      default: false
    },
    autoSetPlaceHolder: {
      type: Boolean,
      default: true
    }
  },
  emits: ['register', 'field-value-change'],
  setup(props, { attrs, emit }) {
    const formModel = reactive({})

    const defaultValueRef = ref({})
    const propsRef = ref({})
    const schemaRef = ref(null)
    const formElRef = ref(null)

    const getProps = computed(() => {
      return { ...props, ...unref(propsRef) }
    })

    const getRow = computed(() => {
      const { baseRowStyle = {}, rowProps } = unref(getProps)
      return {
        style: baseRowStyle,
        ...rowProps
      }
    })

    const getBindValue = computed(() => {
      return { ...attrs, ...props, ...unref(getProps) }
    })

    const getSchema = computed(() => {
      const schemas = unref(schemaRef) || unref(getProps).schemas
      for (const schema of schemas) {
        const { defaultValue } = schema
        if (defaultValue) {
          schema.defaultValue = defaultValue
        }
      }
      return cloneDeep(schemas)
    })

    const { handleFormValues, initDefault } = useFormValues({
      defaultValueRef,
      getSchema,
      formModel
    })

    const {
      setFieldsValue,
      getFieldsValue,
      updateSchema,
      resetSchema,
      resetFields,
      clearValidate,
      validate,
      validateField,
      scrollToField
    } = useFormEvents({
      getProps,
      formModel,
      getSchema,
      defaultValueRef,
      formElRef,
      schemaRef,
      handleFormValues
    })

    async function setProps(formProps) {
      propsRef.value = Object.assign({}, unref(propsRef), formProps)
    }

    const formAction = {
      setProps,
      setFieldsValue,
      getFieldsValue,
      updateSchema,
      resetSchema,
      resetFields,
      clearValidate,
      validate,
      validateField,
      scrollToField
    }

    function handleEnterPress(e) {
      const { autoSubmitOnEnter } = unref(getProps)
      if (!autoSubmitOnEnter) return
      if (e.key === 'Enter' && e.target && e.target instanceof HTMLElement) {
        const target = e.target
        if (target && target.tagName && target.tagName.toUpperCase() == 'INPUT') {
          console.log('submit')
        }
      }
    }

    onMounted(() => {
      initDefault()
      emit('register', formAction)
    })

    return {
      getBindValue,
      formModel,
      defaultValueRef,
      propsRef,
      getSchema,
      getRow,
      getProps,
      formElRef,
      formAction,

      handleEnterPress,
      ...formAction
    }
  }
})
</script>

<style>

</style>