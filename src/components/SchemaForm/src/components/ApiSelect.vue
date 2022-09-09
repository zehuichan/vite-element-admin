<template>
  <el-select
    v-bind="$attrs"
    v-model="state"
    :loading="loading"
    @change="handleChange"
    @visible-change="handleFetch"
  >
    <el-option v-for="item in getOptions" :key="item.value" :label="item.label" :value="item.value" />
    <template #[item]="data" v-for="item in Object.keys($slots)">
      <slot :name="item" v-bind="data || {}" />
    </template>
  </el-select>
</template>
<script>
import { defineComponent, ref, watchEffect, computed, unref, watch } from 'vue'

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
  emits: ['options-change', 'input', 'change'],
  setup(props, { emit }) {
    const options = ref([])
    const loading = ref(false)
    const isFirstLoad = ref(true)

    // Embedded in the form, just use the hook binding to perform form verification
    const state = useVModel(props)

    const getOptions = computed(() => {
      const { labelField, valueField, numberToString, options: defaultOptions } = props

      return (defaultOptions || unref(options)).reduce((prev, next) => {
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

    watchEffect(() => {
      props.immediate && !props.alwaysLoad && fetch()
    })

    watch(
      () => props.params,
      () => {
        !unref(isFirstLoad) && fetch()
      },
      { deep: true }
    )

    watch(
      () => props.value,
      (value) => {
        state.value = value
      },
      { immediate: true }
    )

    async function fetch() {
      const api = props.api
      if (!api || !isFunction(api)) return
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

    function handleChange(val) {
      state.value = val
    }

    return {
      state,
      getOptions,
      loading,
      handleFetch,
      handleChange
    }
  }
})
</script>
