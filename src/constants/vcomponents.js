// components
import VSearch from '@/components/VSearch'
import VTable from '@/components/VTable'
import ExcelUpload from '@/components/ExcelUpload'
import ExcelExport from '@/components/ExcelExport'
import Uploader from '@/components/Uploader'
import Countdown from '@/components/Countdown'

const components = [
  VSearch,
  VTable,
  ExcelUpload,
  ExcelExport,
  Uploader,
  Countdown,
]

function plugin(Vue, opt) {
  if (plugin.installed) {
    return
  }
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default plugin