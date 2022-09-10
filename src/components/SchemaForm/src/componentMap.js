import ApiSelect from './components/ApiSelect.vue'

const componentMap = new Map()

componentMap.set('Input', 'el-input')
componentMap.set('InputNumber', 'el-input-number')
componentMap.set('Autocomplete', 'el-autocomplete')

componentMap.set('Select', 'el-select')
componentMap.set('Cascader', 'el-cascader')

componentMap.set('Switch', 'el-switch')
componentMap.set('Slider', 'el-slider')

componentMap.set('TimeSelect', 'el-time-select')
componentMap.set('TimePicker', 'el-time-picker')
componentMap.set('DatePicker', 'el-date-picker')

componentMap.set('Upload', 'el-upload')
componentMap.set('Rate', 'el-rate')
componentMap.set('ColorPicker', 'el-color-picker')

componentMap.set('Divider', 'el-divider')

componentMap.set('ApiSelect', ApiSelect)

export function add(compName, component) {
  componentMap.set(compName, component)
}

export function del(compName) {
  componentMap.delete(compName)
}

export { componentMap }
