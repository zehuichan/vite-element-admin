const componentMap = new Map()

componentMap.set('Input', 'el-input')
componentMap.set('InputNumber', 'el-input-number')
componentMap.set('Cascader', 'el-cascader')
componentMap.set('DatePicker', 'el-date-picker')
componentMap.set('TimePicker', 'el-time-picker')
componentMap.set('TimeSelect', 'el-time-select')
componentMap.set('Switch', 'el-switch')
componentMap.set('Upload', 'el-upload')
componentMap.set('Slider', 'el-slider')
componentMap.set('Rate', 'el-rate')
componentMap.set('Divider', 'el-divider')

export function add(compName, component) {
  componentMap.set(compName, component)
}

export function del(compName) {
  componentMap.delete(compName)
}

export { componentMap }
