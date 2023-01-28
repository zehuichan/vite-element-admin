import { nextTick, toRaw, unref } from 'vue'
import { isArray, isNullOrUnDef, isObject, isString } from '@/utils/is'
import { cloneDeep, uniqBy } from 'lodash-es'
import { deepMerge } from '@/utils'

export function useFormEvents({ emit, formModel, getSchema, formElRef, schemaRef, handleFormValues }) {

  //设置表单值
  async function setFieldsValue(values) {
    const schemas = unref(getSchema)
    const fields = schemas.map((item) => item.field).filter(Boolean)

    Object.keys(values).forEach((key) => {
      const value = values[key]
      if (fields.includes(key)) {
        formModel[key] = value
      }
    })
  }

  //获取表单值
  function getFieldsValue() {
    const formEl = unref(formElRef)
    if (!formEl) return {}
    return handleFormValues(toRaw(unref(formModel)))
  }

  async function updateSchema(data) {
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
    const schema = []
    updateData.forEach((item) => {
      unref(getSchema).forEach((val) => {
        if (val.field === item.field) {
          const newSchema = deepMerge(val, item)
          schema.push(newSchema)
        } else {
          schema.push(val)
        }
      })
    })
    _setDefaultValue(schema)

    schemaRef.value = uniqBy(schema, 'field')
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

  async function appendSchemaByField(schema, prefixField, first = false) {
    const schemaList = cloneDeep(unref(getSchema))

    const index = schemaList.findIndex((schema) => schema.field === prefixField)

    if (!prefixField || index === -1 || first) {
      first ? schemaList.unshift(schema) : schemaList.push(schema)
      schemaRef.value = schemaList
      _setDefaultValue(schema)
      return
    }
    if (index !== -1) {
      schemaList.splice(index + 1, 0, schema)
    }
    _setDefaultValue(schema)

    schemaRef.value = schemaList
  }

  async function removeSchemaByFiled(fields) {
    const schemaList = cloneDeep(unref(getSchema))
    if (!fields) {
      return
    }

    let fieldList = isString(fields) ? [fields] : fields
    if (isString(fields)) {
      fieldList = [fields]
    }
    for (const field of fieldList) {
      _removeSchemaByFiled(field, schemaList)
    }
    schemaRef.value = schemaList
  }

  async function validate(callback) {
    return await unref(formElRef).validate(callback)
  }

  async function validateField(prop, callback) {
    return await unref(formElRef).validateField(prop, callback)
  }

  async function resetFields() {
    await unref(formElRef).resetFields()
    await nextTick()
    await clearValidate()
  }

  async function clearValidate(name) {
    await unref(formElRef).clearValidate(name)
  }

  async function handleEnter() {
    const formEl = unref(formElRef)
    if (!formEl) return
    try {
      await validate()
      emit('enter')
    } catch (error) {
      console.log(error)
    }
  }

  function _removeSchemaByFiled(field, schemaList) {
    if (isString(field)) {
      const index = schemaList.findIndex((schema) => schema.field === field)
      if (index !== -1) {
        delete formModel[field]
        schemaList.splice(index, 1)
      }
    }
  }

  function _setDefaultValue(data) {
    let schemas = []
    if (isObject(data)) {
      schemas.push(data)
    }
    if (isArray(data)) {
      schemas = [...data]
    }

    const obj = {}
    const currentFieldsValue = getFieldsValue()
    schemas.forEach((item) => {
      if (
        item.component != 'Divider' &&
        Reflect.has(item, 'field') &&
        item.field &&
        !isNullOrUnDef(item.defaultValue) &&
        !(item.field in currentFieldsValue)
      ) {
        obj[item.field] = item.defaultValue
      }
    })
    setFieldsValue(obj)
  }

  return {
    setFieldsValue,
    getFieldsValue,
    updateSchema,
    resetSchema,
    appendSchemaByField,
    removeSchemaByFiled,
    validate,
    validateField,
    resetFields,
    clearValidate,
    handleEnter
  }
}
