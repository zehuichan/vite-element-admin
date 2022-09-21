<template>
  <el-select
    v-bind="$attrs"
    v-on="$listeners"
    v-model="state"
    :loading="loading"
    @visible-change="handleFetch"
  >
    <el-option v-for="item in getOptions" :key="item.value" :label="item.label" :value="item.value" />
    <template #[item]="data" v-for="item in Object.keys($slots)">
      <slot :name="item" v-bind="data || {}" />
    </template>
  </el-select>
</template>

<script>
import { defineComponent, ref, computed, unref, watch, onMounted } from 'vue'

import { useVModel } from '@vueuse/core'

import { get, omit } from 'lodash-es'

import { isFunction } from '@/utils/is'

export default defineComponent({
  name: 'ApiSelect',
  inheritAttrs: false,
  props: {
    value: [Array, Object, String, Number],
    options: Array,
    numberToString: Boolean,
    api: {
      type: Function,
      default: null
    },
    // api params
    params: {
      type: Object,
      default: () => ({})
    },
    // support xxx.xxx.xx
    resultField: {
      type: String,
      default: ''
    },
    labelField: {
      type: String,
      default: 'label'
    },
    valueField: {
      type: String,
      default: 'value'
    },
    immediate: {
      type: Boolean,
      default: true
    },
    alwaysLoad: {
      type: Boolean,
      default: false
    }
  },
  emits: ['options-change', 'input'],
  setup(props, { emit }) {
    const options = ref([])
    const loading = ref(false)
    const isFirstLoad = ref(true)

    // Embedded in the form, just use the hook binding to perform form verification

    // 方式一：
    const state = useVModel(props)

    // 方式二：
    // const state = computed({
    //   get() {
    //     return props.value
    //   },
    //   set(val) {
    //     emit('input', val)
    //   }
    // })

    const getOptions = computed(() => {
      const { labelField, valueField, numberToString, options: defaultOptions } = props

      return (defaultOptions ?? unref(options)).reduce((prev, next) => {
        if (next) {
          const value = next[valueField]
          prev.push({
            ...omit(next, [labelField, valueField]),
            label: next[labelField],
            value: numberToString ? `${value}` : value
          })
        }
        return prev
      }, [])
    })

    watch(
      () => props.params,
      () => {
        !unref(isFirstLoad) && fetch()
      },
      { deep: true }
    )

    async function fetch() {
      const { api, options: defaultOptions = [] } = props
      if (defaultOptions.length || !api || !isFunction(api)) return
      options.value = []
      try {
        loading.value = true
        const res = await api(props.params)
        if (Array.isArray(res)) {
          options.value = res
          emitChange()
          return
        }
        if (props.resultField) {
          options.value = get(res, props.resultField) || []
        }
        emitChange()
      } catch (error) {
        console.warn(error)
      } finally {
        loading.value = false
      }
    }

    async function handleFetch(visible) {
      if (visible) {
        if (props.alwaysLoad) {
          await fetch()
        } else if (!props.immediate && unref(isFirstLoad)) {
          await fetch()
          isFirstLoad.value = false
        }
      }
    }

    function emitChange() {
      emit('options-change', unref(getOptions))
    }

    onMounted(() => {
      props.immediate && !props.alwaysLoad && fetch()
    })

    return {
      state,
      getOptions,
      loading,
      handleFetch
    }
  }
})
</script>
