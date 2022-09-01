import AppProvider from './AppProvider'
import SvgIcon from './SvgIcon'

const components = [AppProvider, SvgIcon]

export function registerComponents(app) {
  components.map((item) => {
    if (item.install) {
      app.use(item)
    } else if (item.name) {
      app.component(item.name, item)
    }
  })
}
