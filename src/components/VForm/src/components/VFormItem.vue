<script lang="jsx">
import { computed, defineComponent, unref } from 'vue'

import { componentMap } from '../componentMap'

import { isBoolean, isFunction } from '@/utils/is'
import { getSlot } from '@/utils/jsxHelper'

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
    },
    allDefaultValues: {
      type: Object,
      default: () => ({})
    },
    formModel: {
      type: Object,
      default: () => ({})
    },
    setFormModel: {
      type: Function,
      default: null
    }
  },
  emits: ['input'],
  setup(props, { attrs, emit, listeners, slots }) {
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

    function renderComponent() {
      const { renderComponentContent, field, label, size, component } = props.schema

      const Comp = componentMap.get(component)

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
        value: props.formModel[field]
      }

      const compAttr = {
        attrs: {
          ...propsData,
          ...bindValue,
          ...attrs
        },
        on: {
          ...listeners
        }
      }

      if (!renderComponentContent) {
        return <Comp {...compAttr} />
      }

      const compSlot = isFunction(renderComponentContent)
        ? { ...renderComponentContent(unref(getValues)) }
        : { default: () => renderComponentContent }

      return <Comp {...compAttr}>{compSlot}</Comp>
    }

    function renderItem() {
      const { itemProps, slot, render, field, label, component } = props.schema

      if (component === 'Divider') {
        return (
          <el-col span={24}>
            <el-divider {...unref(getComponentsProps)}></el-divider>
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
