const getters = {
  // app
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  mediaQuery: state => state.app.mediaQuery,

  // tagsView
  visitedViews: state => state.tagsView.visitedViews,

  // user
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,

  // permission
  getIsDynamicAddedRoute: state => state.permission.isDynamicAddedRoute,
  routes: state => state.permission.routes,
  menus: state => state.permission.menus
}

export default getters
