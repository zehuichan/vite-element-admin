export default {
  // AppHeader configuration
  headerSetting: {
    // Fixed at the top
    fixed: true,
    // Whether to show top
    show: true,
    // Whether to show the full screen button
    showFullScreen: true,
    // Whether to show the notification button
    showNotice: true,
    // Whether to display the menu search
    showSearch: true,
    // Whether to show the configuration button
    showSetting: true
  },

  // AppMenu configuration
  menuSetting: {
    //  Whether to fix the left menu
    fixed: true,
    // AppMenu collapse
    collapsed: false,
    // Turn on accordion mode, only show a menu
    accordion: true,

    animation: false,
    backgroundColor: '#001529',
    textColor: 'hsla(0, 0%, 100%, .65)',
    activeTextColor: '#1890ff',
    width: '210px',
    collapsedWidth: '64px'
  },

  // Multi-label
  multiTabsSetting: {
    cache: false,
    // Turn on
    show: true,
    // Is it possible to drag and drop sorting tabs
    canDrag: true,
    // Turn on quick actions
    showQuick: true,
    // Whether to show the refresh button
    showRedo: true,
    // Whether to show the collapse button
    showFold: true
  },

  // Whether to enable KeepAlive cache is best to close during development, otherwise the cache needs to be cleared every time
  openKeepAlive: true,

  // Whether to show breadcrumbs
  showBreadCrumb: true,

  // Whether to show the breadcrumb icon
  showBreadCrumbIcon: false,

  // Use error-handler-plugin
  useErrorHandle: false,

  // Whether to open back to top
  useOpenBackTop: true
}
