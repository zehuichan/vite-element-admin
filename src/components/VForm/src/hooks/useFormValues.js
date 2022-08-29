import { unref } from 'vue'
import { cloneDeep, set } from 'lodash-es'
import { isArray, isFunction, isNullOrUnDef, isObject, isString } from '@/utils/is'

export function useFormValues({ defaultValueRef, getSchema, formModel }) {
  function handleFormValues(values) {
    if (!isObject(values)) {
      return {}
    }
    const res = {}
    for (const item of Object.entries(values)) {
      let [, value] = item
      const [key] = item
      if (
        !key ||
        (isArray(value) && value.length === 0) ||
        isFunction(value) ||
        isNullOrUnDef(value)
      ) {
        continue
      }
      // 删除空格
      if (isString(value)) {
        value = value.trim()
      }
      set(res, key, value)
    }
    return res
  }

  function initDefault() {
    const schemas = unref(getSchema)
    schemas.forEach((item) => {
      const { defaultValue } = item
      if (!isNullOrUnDef(defaultValue)) {
        formModel[item.field] = defaultValue
      }
    })
  }

  return {
    handleFormValues,
    initDefault
  }
}
