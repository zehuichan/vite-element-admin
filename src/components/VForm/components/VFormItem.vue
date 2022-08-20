<script lang="jsx">
import { computed, defineComponent, toRefs, unref } from 'vue'

import { isBoolean, isFunction, isNull } from '@/utils/is'
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
    },
    formModel: {
      type: Object,
      default: () => ({})
    },
    setFormModel: {
      type: Function,
      default: null
    },
    formActionType: {
      type: Object
    }
  },
  setup(props, { slots }) {
    const { schema, formProps } = toRefs(props)

    const getValues = computed(() => {
      const { formModel, schema } = props
      const { mergeDynamicData } = props.formProps
      return {
        field: schema.field,
        model: formModel,
        values: {
          ...mergeDynamicData,
          ...formModel
        },
        schema: schema
      }
    })

    const getComponentsProps = computed(() => {
      const { schema, tableAction, formModel, formActionType } = props
      let { componentProps = {} } = schema
      if (isFunction(componentProps)) {
        componentProps = componentProps({ schema, tableAction, formModel, formActionType }) ?? {}
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

    function renderItem() {
      const { itemProps, slot, render, field, label, size, component } = props.schema

      if (component === 'Divider') {
        return (
          <el-col span={24}>
            <el-divider {...unref(getComponentsProps)}></el-divider>
          </el-col>
        )
      } else {
        const Comp = componentMap.get(component)

        const compAttr = {
          attrs: {
            clearable: true,
            size,
            value: props.formModel[field]
          },
          on: {
            input(value) {
              props.setFormModel(field, value)
            },
            change(value) {
              props.setFormModel(field, value)
            }
          }
        }

        return (
          <el-form-item
            prop={field}
            label={label}
          >
            <Comp {...compAttr} />
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
        return renderColContent
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

<style>

</style>