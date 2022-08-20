<template>
  <el-form ref="formElRef" :model="formModel" v-bind="getBindValue">
    <el-row v-bind="getRow">
      <template v-for="schema in getSchema">
        <v-form-item
          :schema="schema"
          :formModel="formModel"
          :setFormModel="setFormModel"
        ></v-form-item>
      </template>
    </el-row>
  </el-form>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, ref, unref } from 'vue'
import { useFormEvents } from './hooks/useFormEvents'
import { deepMerge } from '@/utils'
import VFormItem from './components/VFormItem.vue'

export default defineComponent({
  name: 'VForm',
  inheritAttrs: false,
  components: {
    VFormItem
  },
  props: {
    model: Object,
    labelWidth: {
      type: [Number, String],
      default: '80px'
    },
    // 表单配置规则
    schemas: {
      type: [Array],
      default: () => []
    }
  },
  emits: ['register'],
  setup(props, { attrs, emit }) {
    const formModel = reactive({})

    const propsRef = ref({})
    const schemaRef = ref(null)
    const formElRef = ref(null)

    const getProps = computed(() => ({ ...props, ...unref(propsRef) }))
    // Get uniform row style and Row configuration for the entire form
    const getRow = computed(() => {
      const { baseRowStyle = {}, rowProps } = unref(getProps)
      return {
        style: baseRowStyle,
        ...rowProps
      }
    })
    const getBindValue = computed(() => ({ ...attrs, ...props, ...unref(getProps) }))

    const getSchema = computed(() => {
      return unref(schemaRef) || unref(getProps).schemas
    })

    const { validate, resetFields, clearValidate, scrollToField, validateField } = useFormEvents({
      propsRef,
      formElRef: formElRef
    })

    async function setProps(formProps) {
      propsRef.value = deepMerge(unref(propsRef) || {}, formProps)
    }

    function setFormModel(key, value) {
      formModel[key] = value
      emit('field-value-change', key, value)
    }

    const formAction = {
      setProps,
      validate,
      resetFields,
      clearValidate,
      scrollToField,
      validateField
    }

    onMounted(() => {
      emit('register', formAction)
    })

    return {
      getBindValue,
      formModel,
      getSchema,
      getRow,
      getProps,
      formElRef,
      formAction,
      setFormModel,

      ...formAction
    }
  }
})
</script>

<style>

</style>