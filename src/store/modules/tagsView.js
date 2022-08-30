const state = {
  visitedViews: []
}

const mutations = {
  // 添加标签页
  ADD_VIEW: (state, route) => {
    const isExists = state.visitedViews.some(
      (item) => item.fullPath == route.fullPath
    )
    if (isExists) return
    state.visitedViews.push(route)
  },
  // 关闭左侧
  CLOSE_LEFT_VIEWS: (state, route) => {
    const index = state.visitedViews.findIndex(
      (item) => item.fullPath == route.fullPath
    )
    state.visitedViews = state.visitedViews.filter(
      (item, i) => i >= index || (item?.meta?.affix ?? false)
    )
  },
  // 关闭右侧
  CLOSE_RIGHT_VIEWS: (state, route) => {
    const index = state.visitedViews.findIndex(
      (item) => item.fullPath == route.fullPath
    )
    state.visitedViews = state.visitedViews.filter(
      (item, i) => i <= index || (item?.meta?.affix ?? false)
    )
  },
  // 关闭其他
  CLOSE_OTHER_VIEWS: (state, route) => {
    state.visitedViews = state.visitedViews.filter(
      (item) =>
        item.fullPath == route.fullPath || (item?.meta?.affix ?? false)
    )
  },
  // 关闭当前页
  CLOSE_CURRENT_VIEW: (state, route) => {
    const index = state.visitedViews.findIndex(
      (item) => item.fullPath == route.fullPath
    )
    state.visitedViews.splice(index, 1)
  },
  // 关闭所有
  CLOSE_ALL_VIEWS: (state) => {
    const affixTags = state.visitedViews.filter(
      (tag) => tag?.meta?.affix ?? false
    )
    state.visitedViews = affixTags
  },
  RESET_STATE: (state) => {
    state.visitedViews = []
  }
}

const actions = {
  addView({ commit }, route) {
    commit('ADD_VIEW', route)
  },
  closeLeftTabs({ commit, state }, route) {
    return new Promise(resolve => {
      commit('CLOSE_LEFT_VIEWS', route)
      resolve([...state.visitedViews])
    })
  },
  closeRightTabs({ commit, state }, route) {
    return new Promise(resolve => {
      commit('CLOSE_RIGHT_VIEWS', route)
      resolve([...state.visitedViews])
    })
  },
  closeOtherTabs({ commit, state }, route) {
    return new Promise(resolve => {
      commit('CLOSE_OTHER_VIEWS', route)
      resolve([...state.visitedViews])
    })
  },
  closeCurrentTab({ commit, state }, route) {
    return new Promise(resolve => {
      commit('CLOSE_CURRENT_VIEW', route)
      resolve([...state.visitedViews])
    })
  },
  closeAllTabs({ commit, state }) {
    return new Promise(resolve => {
      commit('CLOSE_ALL_VIEWS')
      resolve([...state.visitedViews])
    })
  },
  resetState({ commit }) {
    return new Promise(resolve => {
      commit('RESET_STATE')
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
