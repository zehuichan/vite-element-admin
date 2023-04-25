import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import './element-variables.scss'

export function setupElement(app) {
  app.use(Element, { size: 'small' })
}
