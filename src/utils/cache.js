// token key
export const TOKEN_KEY = 'TOKEN__'
// user info key
export const USER_INFO_KEY = 'USER__INFO__'
// role info key
export const ROLES_KEY = 'ROLES__KEY__'
// tags view key
export const TAGS_ROUTES_KEY = 'TAGS__ROUTES__KEY__'

class Cache {
  setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.log(e)
    }
  }

  getItem(key) {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (e) {
      return ''
    }
  }

  removeItem(key) {
    return localStorage.removeItem(key)
  }

  setSession(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.log(e)
    }
  }

  getSession(key) {
    try {
      return JSON.parse(sessionStorage.getItem(key))
    } catch (e) {
      return ''
    }
  }

  removeSession(key) {
    return sessionStorage.removeItem(key)
  }
}

export default new Cache()
