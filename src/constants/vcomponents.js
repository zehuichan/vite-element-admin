// components
import VSearch from '@/components/VSearch'
import VTable from '@/components/VTable'
import VForm from '@/components/VForm'
import ExcelUpload from '@/components/ExcelUpload'
import ExcelExport from '@/components/ExcelExport'
import Uploader from '@/components/Uploader'
import VCountDown from '@/components/VCountDown'
import FooterToolBar from '@/components/FooterToolBar'
import VIconSelect from '@/components/VIconSelect'
import VIconSelect2 from '@/components/VIconSelect2'
import VDialog from '@/components/VDialog'
import VDrawer from '@/components/VDrawer'
import VDescriptions from '@/components/VDescriptions'
import VFooter from '@/components/VFooter'
import SvgIcon from '@/components/SvgIcon'

const components = [
  VSearch,
  VTable,
  VForm,
  ExcelUpload,
  ExcelExport,
  Uploader,
  VCountDown,
  FooterToolBar,
  VIconSelect,
  VIconSelect2,
  VDialog,
  VDrawer,
  VDescriptions,
  VFooter,
  SvgIcon,
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