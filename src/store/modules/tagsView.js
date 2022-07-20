const state = {
  visitedViews: [],
  cachedViews: []
}

const mutations = {
  ADD_VIEW: (state, route) => {
    // 添加标签页
    const isExists = state.visitedViews.some(
      (item) => item.fullPath == route.fullPath
    )
    if (isExists) return
    state.visitedViews.push(route)
  },
  CLOSE_LEFT_VIEWS: (state, route) => {
    // 关闭左侧
    const index = state.visitedViews.findIndex(
      (item) => item.fullPath == route.fullPath
    )
    state.visitedViews = state.visitedViews.filter(
      (item, i) => i >= index || (item?.meta?.affix ?? false)
    )
  },
  CLOSE_RIGHT_VIEWS: (state, route) => {
    // 关闭右侧
    const index = state.visitedViews.findIndex(
      (item) => item.fullPath == route.fullPath
    )
    state.visitedViews = state.visitedViews.filter(
      (item, i) => i <= index || (item?.meta?.affix ?? false)
    )
  },
  CLOSE_OTHER_VIEWS: (state, route) => {
    // 关闭其他
    state.visitedViews = state.visitedViews.filter(
      (item) =>
        item.fullPath == route.fullPath || (item?.meta?.affix ?? false)
    )
  },
  CLOSE_CURRENT_VIEW: (state, route) => {
    // 关闭当前页
    const index = state.visitedViews.findIndex(
      (item) => item.fullPath == route.fullPath
    )
    state.visitedViews.splice(index, 1)
  },
  CLOSE_ALL_VIEWS: (state) => {
    // keep affix tags
    const affixTags = state.visitedViews.filter(
      (tag) => tag?.meta?.affix ?? false
    )
    state.visitedViews = affixTags
  }
}

const actions = {
  addView({ commit }, route) {
    commit('ADD_VIEW', route)
  },
  closeLeftTabs({ commit }, route) {
    commit('CLOSE_LEFT_VIEWS', route)
  },
  closeRightTabs({ commit }, route) {
    commit('CLOSE_RIGHT_VIEWS', route)
  },
  closeOtherTabs({ commit }, route) {
    commit('CLOSE_OTHER_VIEWS', route)
  },
  closeCurrentTab({ commit }, route) {
    commit('CLOSE_CURRENT_VIEW', route)
  },
  closeAllTabs({ commit }, route) {
    commit('CLOSE_ALL_VIEWS', route)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
