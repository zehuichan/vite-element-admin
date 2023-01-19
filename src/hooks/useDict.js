import { ref, toRefs } from 'vue'
import { getDict } from '@/api'

export function useDict(...args) {
  const res = ref({})
  return (() => {
    args.forEach((d) => {
      res.value[d] = []
      getDict(d).then((resp) => {
        res.value[d] = resp.data.map((p) => ({ ...p, text: p.name }))
      })
    })
    return toRefs(res.value)
  })()
}
