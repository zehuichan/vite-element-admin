const getters = {
  // app
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  mediaQuery: state => state.app.mediaQuery,

  // tagsView
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,

  // user
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  roleList: state => state.user.roleList,

  // permission
  menus: state => state.permission.menus,

  // errorLog
  errorLogs: state => state.errorLog.logs
}

export default getters
