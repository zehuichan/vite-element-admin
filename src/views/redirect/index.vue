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
    const { path, _redirect_type = 'path' } = params

    Reflect.deleteProperty(params, '_redirect_type')
    Reflect.deleteProperty(params, 'path')

    const _path = Array.isArray(path) ? path.join('/') : path


    if (_redirect_type === 'name') {
      router.push({
        name: _path,
        query,
        params
      })
    } else {
      router.push({
        path: _path.startsWith('/') ? _path : '/' + _path,
        query
      })
    }
  }
})
</script>
