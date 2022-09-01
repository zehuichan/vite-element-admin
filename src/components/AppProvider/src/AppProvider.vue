<script>
import { defineComponent, ref } from 'vue'
import { breakpointsAntDesign, useBreakpoints } from '@vueuse/core'

import { useAppProvideStore } from '@/hooks/useAppProvideStore'

export default defineComponent({
  name: 'AppProvider',
  setup(props, { slots }) {
    const isMobile = ref(false)
    const isLaptop = ref(false)

    const breakpoints = useBreakpoints(breakpointsAntDesign)

    isMobile.value = breakpoints.smaller('md')
    isLaptop.value = breakpoints.between('md', 'lg')

    // Inject variables into the global
    useAppProvideStore({ isMobile, isLaptop })

    return () => slots.default?.()
  }
})
</script>
