import Layout from '@/layout/index.vue'

const getParentLayout = (_name) => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: 'ParentLayout'
      })
    })
}
const LayoutMap = new Map()

LayoutMap.set('LAYOUT', Layout)

export { Layout, getParentLayout }

export default LayoutMap
