import AppProvider from './AppProvider'
import SchemaForm from './SchemaForm'
import SvgIcon from './SvgIcon'

const components = [AppProvider, SchemaForm, SvgIcon]

export function registerComponents(app) {
  components.map((item) => {
    if (item.install) {
      app.use(item)
    } else if (item.name) {
      app.component(item.name, item)
    }
  })
}
