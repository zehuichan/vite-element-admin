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
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,

  // permission
  permission_routes: state => state.permission.routes,

  // errorLog
  errorLogs: state => state.errorLog.logs
}

export default getters
