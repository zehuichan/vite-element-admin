export default {
  // AppHeader configuration
  headerSetting: {
    // Fixed at the top
    fixed: true,
    // Whether to show top
    show: true,
    // Whether to display the menu search
    showSearch: true,
    // Whether to show the full screen button
    showFullScreen: true,
    // Whether to show the notification button
    showNotice: true,
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

    animation: true,
    backgroundColor: '#001529',
    textColor: '#ffffffb3',
    activeTextColor: '#1890ff',
    width: '210px',
    collapsedWidth: '64px'
  },

  // Multi-label
  multiTabsSetting: {
    cache: true,
    // Turn on
    show: true,
    // Is it possible to drag and drop sorting tabs
    canDrag: true
  },

  // Whether to cancel the menu, the top, the multi-tab page display, for possible embedded in other systems
  fullContent: false,

  // Whether to display the logo
  showLogo: true,

  // Whether to show footer
  showFooter: false,

  // Whether to enable KeepAlive cache is best to close during development, otherwise the cache needs to be cleared every time
  openKeepAlive: true,

  // Whether to show breadcrumbs
  showBreadCrumb: true,

  // Use error-handler-plugin
  useErrorHandle: true,

  // Whether to open back to top
  useOpenBackTop: true
}
