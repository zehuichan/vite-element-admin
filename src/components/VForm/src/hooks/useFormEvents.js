import { nextTick, unref } from 'vue'
import { isDef } from '@/utils/is'
import { cloneDeep } from 'lodash-es'

export function useFormEvents({ formModel, getSchema, defaultValueRef, formElRef, schemaRef }) {
  /**
   * @description: Set form value
   */
  async function setFieldsValue(values) {
    const fields = unref(getSchema)
      .map((item) => item.field)
      .filter(Boolean)

    Object.keys(values).forEach((key) => {
      let value = values[key]

      const hasKey = Reflect.has(values, key)

      if (hasKey && fields.includes(key)) {
        formModel[key] = cloneDeep(defaultValueRef.value[key]) || value
      }
    })
  }

  async function resetFields() {
    await unref(formElRef).resetFields()
    nextTick(() => clearValidate())
  }

  async function clearValidate(name) {
    await unref(formElRef).clearValidate(name)
  }

  async function validate(callback) {
    return await unref(formElRef).validate(callback)
  }

  async function validateField(prop, callback) {
    return await unref(formElRef).validateField(prop, callback)
  }

  async function scrollToField(prop) {
    return await unref(formElRef).scrollToField(prop)
  }

  return { setFieldsValue, resetFields, clearValidate, validate, validateField, scrollToField }
}
