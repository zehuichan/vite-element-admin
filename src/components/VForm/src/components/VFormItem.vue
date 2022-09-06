<template>
  <el-col v-bind="getColProps" v-if="getShow.isIfShow" v-show="getShow.isShow">
    <el-divider v-if="schema.component === 'Divider'" v-bind="getComponentsProps">
    </el-divider>
    <el-form-item
      v-else
    >
      <slot v-if="schema.slot" :name="schema.slot" v-bind="getValues"></slot>
      <component
        v-else-if="getComponent"
        :is="getComponent"
        v-model="modelValue"
      ></component>
    </el-form-item>
  </el-col>
</template>

<script>
import { computed, defineComponent, nextTick, ref, toRefs, unref, watch } from 'vue'

import { componentMap } from '../componentMap'

import { isBoolean, isFunction } from '@/utils/is'
import { getSlot } from '@/utils/jsxHelper'

export default defineComponent({
  name: 'VFormItem',
  inheritAttrs: false,
  props: {
    value: [String, Number],
    schema: {
      type: Object,
      default: () => ({})
    },
    formProps: {
      type: Object,
      default: () => ({})
    },
    allDefaultValues: {
      type: Object,
      default: () => ({})
    },
    formModel: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['input', 'change'],
  setup(props, { attrs, emit, listeners, slots }) {
    const modelValue = ref(props.value ?? null)

    const getValues = computed(() => {
      const { allDefaultValues, formModel, schema } = props
      const { mergeDynamicData } = props.formProps
      return {
        field: schema.field,
        model: formModel,
        values: {
          ...mergeDynamicData,
          ...allDefaultValues,
          ...formModel
        },
        schema: schema
      }
    })

    const getColProps = computed(() => {
      const { colProps = {} } = props.schema
      const { baseColProps = {} } = props.formProps
      return { ...baseColProps, ...colProps }
    })

    const getComponentsProps = computed(() => {
      const { schema, formModel } = props
      let { componentProps = {} } = schema
      if (isFunction(componentProps)) {
        componentProps = componentProps({ schema, formModel }) ?? {}
      }
      if (schema.component === 'Divider') {
        componentProps = Object.assign({ type: 'horizontal' }, componentProps, {
          orientation: 'left',
          plain: true
        })
      }
      return componentProps
    })

    const getDisable = computed(() => {
      const { disabled: globDisabled } = props.formProps
      const { dynamicDisabled } = props.schema
      const { disabled: itemDisabled = false } = unref(getComponentsProps)
      let disabled = !!globDisabled || itemDisabled
      if (isBoolean(dynamicDisabled)) {
        disabled = dynamicDisabled
      }
      if (isFunction(dynamicDisabled)) {
        disabled = dynamicDisabled(unref(getValues))
      }
      return disabled
    })

    const getShow = computed(() => {
      const { show, ifShow } = props.schema
      const { showAdvancedButton } = props.formProps
      const itemIsAdvanced = showAdvancedButton
        ? isBoolean(props.schema.isAdvanced)
          ? props.schema.isAdvanced
          : true
        : true

      let isShow = true
      let isIfShow = true

      if (isBoolean(show)) {
        isShow = show
      }
      if (isBoolean(ifShow)) {
        isIfShow = ifShow
      }
      if (isFunction(show)) {
        isShow = show(unref(getValues))
      }
      if (isFunction(ifShow)) {
        isIfShow = ifShow(unref(getValues))
      }
      isShow = isShow && itemIsAdvanced

      return { isShow, isIfShow }
    })

    const getComponent = computed(() => {
      const { component } = props.schema
      if (!componentMap.has(component)) {
        return null
      }
      return componentMap.get(component)
    })

    watch(
      () => modelValue.value,
      (value) => {
        emit('input', value)
      }
    )

    watch(
      () => props.formModel,
      (value) => {
        console.log(value)
      },
      { deep: true }
    )

    return {
      getValues,
      getColProps,
      getComponentsProps,
      getDisable,
      getShow,
      getComponent,
      modelValue
    }
  }
})
</script>
