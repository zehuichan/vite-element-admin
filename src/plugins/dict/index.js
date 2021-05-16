import Vue from 'vue'
// api
import getDictDetail from '@/api/dict'

async function $_dict_init(names, dict) {
  if (names === undefined) {
    throw new Error('need Dict names')
  }
  const ps = []
  names.forEach(n => {
    Vue.set(dict, n, [])
    ps.push(getDictDetail(n).then((res) => {
      dict[n].splice(0, 0, ...res.data.items)
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
        $_dict_init(this.$options.dicts, this.dict).then(() => {
          this.$emit('dictReady')
        })
      }
    },
  })
}

export default plugin