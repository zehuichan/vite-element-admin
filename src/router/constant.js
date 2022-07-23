export const REDIRECT_NAME = 'Redirect'

export const PARENT_LAYOUT_NAME = 'ParentLayout'

export const PAGE_NOT_FOUND_NAME = 'PageNotFound'

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
