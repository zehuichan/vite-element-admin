import { login, logout, getInfo } from '@/api/user'
import cache, { TOKEN_KEY } from '@/utils/cache'
import { resetRouter } from '@/router'

const state = {
  token: cache.getItem(TOKEN_KEY),
  userInfo: null,
  roleList: [],
  lastUpdateTime: 0
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    cache.setItem(TOKEN_KEY, token)
  },
  SET_USER_INFO: (state, info) => {
    state.userInfo = info
    state.lastUpdateTime = new Date().getTime()
  },
  SET_ROLE_LIST: (state, roleList) => {
    state.roleList = roleList
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
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_USER_INFO', data)
        commit('SET_ROLE_LIST', roles)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', undefined)
        commit('SET_ROLE_LIST', [])
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', undefined)
      commit('SET_ROLE_LIST', [])
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

