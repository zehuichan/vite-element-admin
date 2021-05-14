// api
import getDictDetail from '@/api/dict'

async function $_dict_init(names, dict) {
  if (names === undefined) {
    throw new Error('need Dict names')
  }
  const ps = []
  names.forEach(n => {
    ps.push(getDictDetail[n]().then((res) => {
      dict[n] = [...res.data]
      res.data.forEach(d => {
        d.value = d.id
        d.label = d.name
      })
    }))
  })
  await Promise.all(ps)
}

function plugin(Vue, opt) {
  if (plugin.installed) {
    return
  }
  Vue.mixin({
    data() {
      if (this.$options.dicts instanceof Array) {
        const dict = {}
        return {
          dict
        }
      }
      return {}
    },
    created() {
      if (this.$options.dicts instanceof Array) {
        $_dict_init(this.$options.dicts, this.dict)
      }
    },
  })
}

export default plugin