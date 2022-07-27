import {
  ElInput,
  ElInputNumber,
  ElCascader,
  ElDatePicker,
  ElTimePicker,
  ElTimeSelect,
  ElSwitch,
  ElUpload,
  ElSlider,
  ElRate,
  ElDivider
} from 'element-ui'

const componentMap = new Map()

componentMap.set('Input', ElInput)
componentMap.set('InputNumber', ElInputNumber)
componentMap.set('Cascader', ElCascader)
componentMap.set('DatePicker', ElDatePicker)
componentMap.set('TimePicker', ElTimePicker)
componentMap.set('TimeSelect', ElTimeSelect)
componentMap.set('Switch', ElSwitch)
componentMap.set('Upload', ElUpload)
componentMap.set('Slider', ElSlider)
componentMap.set('Rate', ElRate)
componentMap.set('Divider', ElDivider)

export function add(compName, component) {
  componentMap.set(compName, component)
}

export function del(compName) {
  componentMap.delete(compName)
}

export { componentMap }
