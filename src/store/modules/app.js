import { Cache } from '@/utils/cache'

const state = {
  sidebar: {
    opened: Cache.getItem('sidebarStatus') ? !!+Cache.getItem('sidebarStatus') : true,
    withoutAnimation: false
  },
  // 设备
  device: 'desktop',
  // 媒体查询
  mediaQuery: undefined
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cache.setItem('sidebarStatus', 1)
    } else {
      Cache.setItem('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cache.setItem('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  OPEN_SIDEBAR: (state, withoutAnimation) => {
    Cache.setItem('sidebarStatus', 1)
    state.sidebar.opened = true
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_MEDIA_QUERY: (state, mediaQuery) => {
    state.mediaQuery = mediaQuery
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  openSideBar({ commit }, { withoutAnimation }) {
    commit('OPEN_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setMediaQuery({ commit }, query) {
    commit('SET_MEDIA_QUERY', query)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
