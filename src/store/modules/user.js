import { defineStore } from 'pinia'
import { store } from '..'

import { getInfo, login } from '@/api'
import { Cache, ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '@/utils/cache'
import { resetRouter } from '@/router'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    token: undefined,
    userInfo: null,
    roleList: [],
    sessionTimeout: false,
    lastUpdateTime: 0
  }),
  getters: {
    getToken() {
      return this.token || Cache.getItem(TOKEN_KEY)
    },
    getUserInfo() {
      return this.userInfo || Cache.getItem(USER_INFO_KEY)
    },
    getRoleList() {
      return this.roleList.length > 0 ? this.roleList : Cache.getItem(ROLES_KEY)
    },
    getSessionTimeout() {
      return !!this.sessionTimeout
    },
    getLastUpdateTime() {
      return this.lastUpdateTime
    }
  },
  actions: {
    setToken(token) {
      this.token = token ? token : ''
      Cache.setItem(TOKEN_KEY, token)
    },
    setRoleList(roleList) {
      this.roleList = roleList
      Cache.setItem(ROLES_KEY, roleList)
    },
    setUserInfo(info) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
      Cache.setItem(USER_INFO_KEY, info)
    },
    setSessionTimeout(flag) {
      this.sessionTimeout = flag
    },
    resetState() {
      this.token = ''
      this.userInfo = null
      this.roleList = []
      this.sessionTimeout = false
      this.lastUpdateTime = 0
    },
    async login(params) {
      try {
        const { username, password } = params
        const {
          data: { token }
        } = await login({ username: username.trim(), password: password })
        this.setToken(token)
        return Promise.resolve()
      } catch (e) {
        return Promise.reject(e)
      }
    },

    async getUserInfoAction() {
      try {
        const token = this.getToken
        const { data } = await getInfo(token)
        const { roles = [] } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          data.roles = []
          this.setRoleList([])
        } else {
          this.setRoleList(roles)
        }

        this.setUserInfo(data)
        return Promise.resolve(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    logout() {
      this.setToken(undefined)
      this.setSessionTimeout(false)
      this.setUserInfo(null)
      resetRouter()
    }
  }
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
