export const Layout = () => import('@/layout/index.vue')

export const getParentLayout = (_name) => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: 'ParentLayout'
      })
    })
}

const LayoutMap = new Map()

LayoutMap.set('LAYOUT', Layout)

export default LayoutMap
