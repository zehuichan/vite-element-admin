import { login } from '@/api/user'
import { Cache, TOKEN_KEY, USER_INFO_KEY } from '@/utils/cache'

const state = {
  token: Cache.getItem(TOKEN_KEY),
  userInfo: Cache.getItem(USER_INFO_KEY),
  lastUpdateTime: 0
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    Cache.setItem(TOKEN_KEY, token)
  },
  SET_USER_INFO: (state, info) => {
    state.userInfo = info
    Cache.setItem(USER_INFO_KEY, info)
    state.lastUpdateTime = new Date().getTime()
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        commit('SET_USER_INFO', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', undefined)
      commit('SET_USER_INFO', null)
      resolve()
    })
  },

  // remove token
  resetState({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', undefined)
      commit('SET_USER_INFO', null)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

