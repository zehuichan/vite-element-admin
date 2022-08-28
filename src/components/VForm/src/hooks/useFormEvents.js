import { nextTick, toRaw, unref } from 'vue'
import { isArray, isDef, isObject } from '@/utils/is'
import { cloneDeep } from 'lodash-es'

export function useFormEvents({ formModel, getSchema, defaultValueRef, formElRef, schemaRef, handleFormValues }) {
  //设置表单值
  async function setFieldsValue(values) {
    const fields = unref(getSchema)
      .map((item) => item.field)
      .filter(Boolean)

    Object.keys(values).forEach((key) => {
      const value = values[key]
      if (fields.includes(key)) {
        formModel[key] = value
      }
    })

    console.log(formModel)
  }

  //获取表单值
  function getFieldsValue() {
    const formEl = unref(formElRef)
    if (!formEl) return {}
    return handleFormValues(toRaw(unref(formModel)))
  }

  async function resetSchema(data) {
    let updateData = []
    if (isObject(data)) {
      updateData.push(data)
    }
    if (isArray(data)) {
      updateData = [...data]
    }

    const hasField = updateData.every(
      (item) => item.component === 'Divider' || (Reflect.has(item, 'field') && item.field)
    )

    if (!hasField) {
      console.error(
        'All children of the form Schema array that need to be updated must contain the `field` field'
      )
      return
    }
    schemaRef.value = updateData
  }

  async function resetFields() {
    await unref(formElRef).resetFields()
    await nextTick()
    await clearValidate()
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

  return {
    setFieldsValue,
    getFieldsValue,
    resetSchema,
    resetFields,
    clearValidate,
    validate,
    validateField,
    scrollToField
  }
}
