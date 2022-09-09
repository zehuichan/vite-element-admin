import { ref, onUnmounted, unref, watch, nextTick } from 'vue'
import { getDynamicProps } from '@/utils'

function isProdMode() {
  return import.meta.env.PROD
}

export function useForm(props) {
  const formRef = ref(null)
  const loadedRef = ref(false)

  async function getForm() {
    const form = unref(formRef)
    console.log(form)
    if (!form) {
      throw new Error(
        'The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!'
      )
    }
    await nextTick()
    return form
  }

  function register(instance) {
    // 开发环境下，组件卸载后释放内存
    isProdMode() && onUnmounted(() => {
      formRef.value = null
      loadedRef.value = null
    })

    // form 组件实例 instance 已存在
    // 实际上 register 拿到的并不是 组件实例， 只是挂载了一些组件内部方法的 对象 formAction
    if (unref(loadedRef) && isProdMode() && instance === unref(formRef)) return

    formRef.value = instance
    loadedRef.value = true

    // 监听 props， 若props改变了
    // 则使用 form 实例调用内部的 setProps 方法将新的props设置到form组件内部
    watch(
      () => props,
      () => {
        props && instance.setProps(getDynamicProps(props))
      },
      { immediate: true, deep: true }
    )
  }

  const methods = {
    async setProps(formProps) {
      const form = await getForm()
      form.setProps(formProps)
    },
    async validate(callback) {
      const form = await getForm()
      form.validate(callback)
    },
    async validateField(props, callback) {
      const form = await getForm()
      form.validateField(props, callback)
    },
    async resetFields() {
      const form = await getForm()
      form.resetFields()
    },
    async clearValidate() {
      const form = await getForm()
      form.clearValidate()
    },
    async scrollToField(prop) {
      const form = await getForm()
      form.scrollToField(prop)
    }
  }

  return [register, methods]
}
