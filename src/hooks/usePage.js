import { useRouter } from 'vue-router/composables'
import { REDIRECT_NAME } from '@/router/constant'

function handleError(e) {
  console.error(e)
}

/**
 * page switch
 */
export function useGo(_router) {
  const router = _router || useRouter()

  function go(opt, isReplace = false) {
    if (!opt) {
      return
    }
    isReplace ? router.replace(opt).catch(handleError) : router.push(opt).catch(handleError)
  }

  return go
}

/**
 * @description: redo current page
 */
export const useRedo = (_router) => {
  const router = _router || useRouter()
  const { query, params = {}, name, fullPath } = router.currentRoute

  function redo() {
    return new Promise((resolve) => {
      if (name === REDIRECT_NAME) {
        resolve(false)
        return
      }
      if (name && Object.keys(params).length > 0) {
        params['_redirect_type'] = 'name'
        params['path'] = String(name)
      } else {
        params['_redirect_type'] = 'path'
        params['path'] = fullPath
      }
      router.replace({ name: REDIRECT_NAME, params, query }).then(() => resolve(true))
    })
  }

  return redo
}
