<template>
  <el-col v-bind="getColProps" v-if="getShow().isIfShow" v-show="getShow().isShow">
    <el-divider v-if="schema.component === 'Divider'" v-bind="getComponentsProps">
    </el-divider>
    <el-form-item
      v-else
      v-bind="schema.itemProps"
      :prop="schema.field"
      :label="schema.label"
      :rules="handleRules()"
    >
      <slot v-if="schema.slot" :name="schema.slot" v-bind="getValues"></slot>
      <component
        v-else-if="getComponent"
        :is="getComponent"
        v-bind="getComponentsProps"
        :disabled="getDisable"
        v-model="modelValue"
      ></component>
    </el-form-item>
  </el-col>
</template>

<script>
import { computed, defineComponent, nextTick, ref, toRefs, unref, watch } from 'vue'

import { cloneDeep } from 'lodash-es'

import { componentMap } from '../componentMap'
import { createPlaceholderMessage } from '../helper'

import { isBoolean, isFunction, isNull } from '@/utils/is'
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
        componentProps = Object.assign({ direction: 'horizontal' }, componentProps, { contentPosition: 'left' })
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


    function getShow() {
      const { show, ifShow } = props.schema

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

      return { isShow, isIfShow }
    }

    function handleRules() {
      const {
        rules: defRules = [],
        component,
        rulesMessageJoinLabel,
        label,
        dynamicRules,
        required
      } = props.schema

      if (isFunction(dynamicRules)) {
        return dynamicRules(unref(getValues))
      }

      let rules = cloneDeep(defRules)
      const { rulesMessageJoinLabel: globalRulesMessageJoinLabel } = props.formProps

      const joinLabel = Reflect.has(props.schema, 'rulesMessageJoinLabel')
        ? rulesMessageJoinLabel
        : globalRulesMessageJoinLabel
      const defaultMsg = createPlaceholderMessage(component) + `${joinLabel ? label : ''}`

      function validator(rule, value) {
        const msg = rule.message || defaultMsg
        if (value === undefined || isNull(value)) {
          // 空值
          return Promise.reject(msg)
        } else if (Array.isArray(value) && value.length === 0) {
          // 数组类型
          return Promise.reject(msg)
        } else if (typeof value === 'string' && value.trim() === '') {
          // 空字符串
          return Promise.reject(msg)
        } else if (
          typeof value === 'object' &&
          Reflect.has(value, 'checked') &&
          Reflect.has(value, 'halfChecked') &&
          Array.isArray(value.checked) &&
          Array.isArray(value.halfChecked) &&
          value.checked.length === 0 &&
          value.halfChecked.length === 0
        ) {
          // 非关联选择的tree组件
          return Promise.reject(msg)
        }
        return Promise.resolve()
      }

      const getRequired = isFunction(required) ? required(unref(getValues)) : required

      /*
       * 1、若设置了required属性，又没有其他的rules，就创建一个验证规则；
       * 2、若设置了required属性，又存在其他的rules，则只rules中不存在required属性时，
       * 才添加验证required的规则也就是说rules中的required，优先级大于required
       */
      if (getRequired) {
        if (!rules || rules.length === 0) {
          rules = [{ required: getRequired, validator }]
        } else {
          const requiredIndex = rules.findIndex((rule) => Reflect.has(rule, 'required'))

          if (requiredIndex === -1) {
            rules.push({ required: getRequired, validator })
          }
        }
      }

      const requiredRuleIndex = rules.findIndex(
        (rule) => Reflect.has(rule, 'required') && !Reflect.has(rule, 'validator')
      )

      if (requiredRuleIndex !== -1) {
        const rule = rules[requiredRuleIndex]
        const { isShow } = getShow()
        if (!isShow) {
          rule.required = false
        }
      }

      // Maximum input length rule check
      const characterInx = rules.findIndex((val) => val.max)
      if (characterInx !== -1 && !rules[characterInx].validator) {
        rules[characterInx].message =
          rules[characterInx].message || `字符数应小于${[rules[characterInx].max]}位`
      }
      return rules
    }

    return {
      getValues,
      getColProps,
      getComponentsProps,
      getDisable,
      getComponent,
      modelValue,
      getShow,
      handleRules
    }
  }
})
</script>
