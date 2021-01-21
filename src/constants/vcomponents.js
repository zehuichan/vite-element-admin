// components
import VSearch from '@/components/VSearch'
import VTable from '@/components/VTable'
import VForm from '@/components/VForm'
import VExcelUpload from '@/components/VExcelUpload'
import VExcelExport from '@/components/VExcelExport'
import VUploader from '@/components/VUploader'
import VCountDown from '@/components/VCountDown'
import VFooterToolBar from '@/components/VFooterToolBar'
import VIconSelect from '@/components/VIconSelect'
import VIconSelect2 from '@/components/VIconSelect2'
import VDialog from '@/components/VDialog'
import VDrawer from '@/components/VDrawer'
import VDescriptions from '@/components/VDescriptions'
import VFooter from '@/components/VFooter'
import SvgIcon from '@/components/SvgIcon'
import VImageViewer from '@/components/VImageViewer'
import VBadge from '@/components/VBadge'

const components = [
  VSearch,
  VTable,
  VForm,
  VExcelUpload,
  VExcelExport,
  VUploader,
  VCountDown,
  VFooterToolBar,
  VIconSelect,
  VIconSelect2,
  VDialog,
  VDrawer,
  VDescriptions,
  VFooter,
  SvgIcon,
  VImageViewer,
  VBadge,
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