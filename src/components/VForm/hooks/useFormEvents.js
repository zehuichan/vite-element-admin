import { nextTick, unref } from 'vue'


export function useFormEvents({ formElRef }) {
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

  async function validateField(
    prop,
    callback
  ) {
    return await unref(formElRef).validateField(prop, callback)
  }

  async function scrollToField(prop) {
    return await unref(formElRef).scrollToField(prop)
  }

  return { resetFields, clearValidate, validate, validateField, scrollToField }
}
