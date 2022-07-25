import * as filters from './filters'

// register global utility filters
export function setupGlobalFilters(app) {
  Object.keys(filters).forEach((key) => {
    app.filter(key, filters[key])
  })
}