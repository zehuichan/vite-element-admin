import { nextTick, unref } from 'vue'

export function useFormValues({ defaultValueRef, getSchema, propsRef }) {

  async function initDefault() {
    await nextTick()
    const schemas = unref(getSchema)
    const formModel = unref(propsRef).model
    if (formModel) {
      schemas.forEach((item) => {
        const key = item.field
        defaultValueRef[item.field] = formModel[key]
      })
    }
  }

  return {
    initDefault
  }
}
