// components
import VSearch from '@/components/VSearch'
import VTable from '@/components/VTable'
import VForm from '@/components/VForm'
import ExcelUpload from '@/components/ExcelUpload'
import ExcelExport from '@/components/ExcelExport'
import Uploader from '@/components/Uploader'
import Countdown from '@/components/Countdown'
import FooterToolBar from '@/components/FooterToolBar'
import VIconSelect from '@/components/VIconSelect'

const components = [
  VSearch,
  VTable,
  VForm,
  ExcelUpload,
  ExcelExport,
  Uploader,
  Countdown,
  FooterToolBar,
  VIconSelect,
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