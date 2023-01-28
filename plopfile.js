const viewGenerator = require('./templates/view/prompt')
const componentGenerator = require('./templates/component/prompt')
const storeGenerator = require('./templates/store/prompt.js')

module.exports = function (plop) {
  plop.setGenerator('view', viewGenerator)
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('store', storeGenerator)
}
