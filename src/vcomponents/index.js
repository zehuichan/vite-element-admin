// components
import VSearch from '@/vcomponents/VSearch'
import VTable from '@/vcomponents/VTable'
import VForm from '@/vcomponents/VForm'
import VExcelUpload from '@/vcomponents/VExcelUpload'
import VExcelExport from '@/vcomponents/VExcelExport'
import VUploader from '@/vcomponents/VUploader'
import VCountDown from '@/vcomponents/VCountDown'
import VFooterToolBar from '@/vcomponents/VFooterToolBar'
import VIconSelect from '@/vcomponents/VIconSelect'
import VIconSelect2 from '@/vcomponents/VIconSelect2'
import VDialog from '@/vcomponents/VDialog'
import VDrawer from '@/vcomponents/VDrawer'
import VDescriptions from '@/vcomponents/VDescriptions'
import VFooter from '@/vcomponents/VFooter'
import VImageViewer from '@/vcomponents/VImageViewer'
import VBadge from '@/vcomponents/VBadge'
import VEllipsis from '@/vcomponents/VEllipsis'
import VQrcode from '@/vcomponents/VQrcode'
import VConfirm from '@/vcomponents/VConfirm'
import VSticky from '@/vcomponents/VSticky'
import VTreeSelect from '@/vcomponents/VTreeSelect'
import VEmpty from '@/vcomponents/VEmpty'
import VInput from '@/vcomponents/VInput'
import VSelect from '@/vcomponents/VSelect'

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
  VImageViewer,
  VBadge,
  VEllipsis,
  VQrcode,
  VConfirm,
  VSticky,
  VTreeSelect,
  VEmpty,
  VInput,
  VSelect,
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