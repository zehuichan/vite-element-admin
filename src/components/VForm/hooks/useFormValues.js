import { unref } from 'vue'
import { cloneDeep } from 'lodash-es'
import { isNullOrUnDef } from '@/utils/is'

export function useFormValues({ defaultValueRef, getSchema, formModel }) {

  function initDefault() {
    const schemas = unref(getSchema)
    const obj = {}
    schemas.forEach((item) => {
      const { defaultValue } = item
      if (!isNullOrUnDef(defaultValue)) {
        obj[item.field] = defaultValue

        if (formModel[item.field] === undefined) {
          formModel[item.field] = defaultValue
        } else {
          formModel[item.field] = null
        }
      }
    })
    defaultValueRef.value = cloneDeep(obj)
  }

  return {
    initDefault
  }
}
