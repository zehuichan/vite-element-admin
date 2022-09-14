<script lang="jsx">
import { computed, defineComponent, h, unref, watch } from 'vue'
import { useVModel } from '@vueuse/core'
import { cloneDeep } from 'lodash-es'

import { componentMap } from '../componentMap'
import { createPlaceholderMessage } from '../helper'

import { isBoolean, isFunction, isNull } from '@/utils/is'
import { getSlot } from '@/utils/jsxHelper'

export default defineComponent({
  name: 'SchemaFormItem',
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
  setup(props, { slots }) {
    const modelValue = useVModel(props)

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

    watch(
      () => props.value,
      (value) => {
        modelValue.value = value
      },
      { immediate: true }
    )

    function getShow() {
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

      function validator(rule, value, callback) {
        const msg = rule.message || defaultMsg
        if (value === undefined || isNull(value)) {
          // 空值
          return callback(new Error(msg))
        } else if (Array.isArray(value) && value.length === 0) {
          // 数组类型
          return callback(new Error(msg))
        } else if (typeof value === 'string' && value.trim() === '') {
          // 空字符串
          return callback(new Error(msg))
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
          return callback(new Error(msg))
        }
        return callback()
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

    function renderComponent() {
      const { renderComponentContent, field, label, component } = props.schema

      const tag = componentMap.get(component)

      const { size } = props.formProps

      const propsData = {
        prop: field,
        clearable: true,
        size,
        ...unref(getComponentsProps),
        disabled: unref(getDisable)
      }

      if (['daterange', 'datetimerange'].includes(unref(getComponentsProps)?.type) && component === 'DatePicker') {
        propsData.startPlaceholder = unref(getComponentsProps)?.startPlaceholder || '开始时间'
        propsData.endPlaceholder = unref(getComponentsProps)?.endPlaceholder || '结束时间'
      } else {
        propsData.placeholder = unref(getComponentsProps)?.placeholder || label
      }

      const bindValue = {
        value: modelValue.value
      }

      const compAttr = {
        style: {
          width: '100%'
        },
        attrs: {
          ...propsData,
          ...bindValue
        },
        on: {
          input(val) {
            modelValue.value = val
          }
        }
      }

      if (!renderComponentContent) {
        return h(tag, compAttr)
      }

      const compSlot = isFunction(renderComponentContent)
        ? { ...renderComponentContent(unref(getValues)) }
        : { default: () => renderComponentContent }

      return h(tag, { ...compAttr, ...compSlot })
    }

    function renderItem() {
      const { itemProps, slot, render, field, label, component } = props.schema

      if (component === 'Divider') {
        return (
          <el-col span={24}>
            <el-divider {...{ attrs: unref(getComponentsProps) }}></el-divider>
          </el-col>
        )
      } else {
        const getContent = () => {
          return slot
            ? getSlot(slots, slot, unref(getValues))
            : render
              ? render(unref(getValues))
              : renderComponent()
        }

        return (
          <el-form-item
            prop={field}
            label={label}
            rules={handleRules()}
            {...{ attrs: itemProps }}
          >
            {getContent()}
          </el-form-item>
        )
      }
    }

    return () => {
      const { colProps = {}, colSlot, renderColContent, component } = props.schema
      if (!componentMap.has(component)) {
        return null
      }

      const { baseColProps = {} } = props.formProps
      const realColProps = { ...baseColProps, ...colProps }
      const { isIfShow, isShow } = getShow()
      const values = unref(getValues)

      const getContent = () => {
        return colSlot
          ? getSlot(slots, colSlot, values)
          : renderColContent
            ? renderColContent(values)
            : renderItem()
      }

      return (
        isIfShow && (
          <el-col {...{ attrs: realColProps }} v-show={isShow}>
            {getContent()}
          </el-col>
        )
      )
    }
  }
})
</script>
