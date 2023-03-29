<template>
  <div></div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'

export default defineComponent({
  name: 'Redirect',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const { params, query } = route
    const { path } = params

    const _path = Array.isArray(path) ? path.join('/') : path

    router.push({
      path: _path.startsWith('/') ? _path : '/' + _path,
      query
    })
  }
})
</script>
