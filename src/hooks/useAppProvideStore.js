import { computed, reactive, unref } from 'vue'
import { createInjectionState } from '@vueuse/core'

const [useAppProvideStore, useAppInjectStore] = createInjectionState(
  (context) => {
    const state = reactive(context)

    return {
      getIsMobile: computed(() => unref(state.isMobile)),
      getIsLaptop: computed(() => unref(state.isLaptop))
    }
  }
)

export {
  useAppProvideStore,
  useAppInjectStore
}
