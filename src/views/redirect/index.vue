<template>
  <div></div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRoute, useRouter } from '@/router'

export default defineComponent({
  name: 'Redirect',
  setup() {
    const { params, query } = useRoute()
    const { path } = params

    const router = useRouter()
    router.replace({
      path: '/' + (Array.isArray(path) ? path.join('/') : path),
      query
    })
  }
})
</script>
