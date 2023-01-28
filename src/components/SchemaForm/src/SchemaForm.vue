<template>
  <el-form
    v-bind="getBindValue"
    ref="formElRef"
    :model="formModel"
    :validate-on-rule-change="false"
    @keyup.enter.native="handleEnterPress"
  >
    <el-row v-bind="getRow">
      <slot name="formHeader"></slot>
      <template v-for="schema in getSchema">
        <schema-form-item
          :schema="schema"
          :formProps="getProps"
          :allDefaultValues="defaultValueRef"
          :formModel="formModel"
          v-model="formModel[schema.field]"
        >
          <template #[item]="data" v-for="item in Object.keys($scopedSlots)">
            <slot :name="item" v-bind="data || {}"></slot>
          </template>
        </schema-form-item>
      </template>
      <slot name="formFooter"></slot>
    </el-row>
  </el-form>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, ref, unref, watch } from 'vue'
import { cloneDeep, pick } from 'lodash-es'

import { Form } from 'element-ui'

import { useFormValues } from './hooks/useFormValues'
import { useFormEvents } from './hooks/useFormEvents'

import SchemaFormItem from './components/SchemaFormItem.vue'

export default defineComponent({
  name: 'SchemaForm',
  components: {
    SchemaFormItem
  },
  inheritAttrs: false,
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    labelPosition: {
      type: String,
      default: 'right'
    },
    labelWidth: {
      type: [Number, String],
      default: 'auto'
    },
    // 表单配置规则
    schemas: {
      type: [Array],
      default: () => []
    },
    size: String,
    disabled: Boolean,
    rulesMessageJoinLabel: {
      type: Boolean,
      default: true
    },
    autoSubmitOnEnter: {
      type: Boolean,
      default: false
    },
    autoSetPlaceHolder: {
      type: Boolean,
      default: true
    },
    autoFocusFirstItem: Boolean
  },
  emits: ['register', 'field-value-change', 'enter'],
  setup(props, { attrs, emit }) {
    const formModel = reactive({})

    const defaultValueRef = ref({})
    const isInitedDefaultRef = ref(false)
    const propsRef = ref({})
    const schemaRef = ref(null)
    const formElRef = ref(null)

    const getProps = computed(() => {
      return { ...props, ...unref(propsRef) }
    })

    const getRow = computed(() => {
      const { baseRowStyle = {}, rowProps = { gutter: 20 } } = unref(getProps)
      return {
        style: baseRowStyle,
        ...rowProps
      }
    })

    const getBindValue = computed(() => {
      return pick(
        { ...attrs, ...props, ...unref(getProps) },
        Object.keys(Form.props)
      )
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
      appendSchemaByField,
      removeSchemaByFiled,
      resetFields,
      clearValidate,
      validate,
      validateField,
      handleEnter
    } = useFormEvents({
      emit,
      getProps,
      formModel,
      getSchema,
      defaultValueRef,
      formElRef,
      schemaRef,
      handleFormValues
    })

    watch(
      () => unref(getProps).model,
      (model) => {
        if (!model) return
        setFieldsValue(model)
      },
      { immediate: true }
    )

    watch(
      () => unref(getProps).schemas,
      (schemas) => {
        resetSchema(schemas ?? [])
      }
    )

    watch(
      () => getSchema.value,
      (schema) => {
        if (unref(isInitedDefaultRef)) {
          return
        }
        if (schema?.length) {
          initDefault()
          isInitedDefaultRef.value = true
        }
      }
    )

    async function setProps(formProps) {
      propsRef.value = Object.assign({}, unref(propsRef), formProps)
    }

    const formAction = {
      setProps,
      setFieldsValue,
      getFieldsValue,
      updateSchema,
      resetSchema,
      appendSchemaByField,
      removeSchemaByFiled,
      resetFields,
      clearValidate,
      validate,
      validateField,
      handleEnter
    }

    function handleEnterPress(e) {
      const { autoSubmitOnEnter } = unref(getProps)
      if (!autoSubmitOnEnter) return
      if (e.key === 'Enter' && e.target && e.target instanceof HTMLElement) {
        const target = e.target
        if (target && target.tagName && target.tagName.toUpperCase() == 'INPUT') {
          handleEnter()
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
