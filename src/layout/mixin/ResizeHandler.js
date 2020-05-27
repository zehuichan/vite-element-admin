// store
import store from '@/store'

// 文档
const {body} = document

// 媒体查询
const MEDIA_QUERY = {
  'screen-xs': {
    maxWidth: 575
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599
  },
  'screen-xxl': {
    minWidth: 1600
  }
}

export default {
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('app/closeSideBar', {withoutAnimation: false})
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    const isMobile = this.$_isMobile()
    const query = this.$_mediaQuery()
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', {withoutAnimation: true})
    }
    store.dispatch('app/setMediaQuery', query)
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width < MEDIA_QUERY['screen-sm'].maxWidth
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        const query = this.$_mediaQuery()
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')
        store.dispatch('app/setMediaQuery', query)

        // this.sidebar.opened  false=关闭 true=开启
        if (!this.sidebar.opened && query === 'screen-sm') {
          store.dispatch('app/closeSideBar', {withoutAnimation: true})
        }
        if (query === 'screen-md') {
          if (!this.sidebar.opened) {
            store.dispatch('app/closeSideBar', {withoutAnimation: true})
          } else {
            store.dispatch('app/toggleSideBar')
          }
        }
        if (['screen-lg', 'screen-xl', 'screen-xll'].includes(query)) {
          if (!this.sidebar.opened) {
            store.dispatch('app/openSideBar')
          }
        }
      }
    },
    $_mediaQuery() {
      const rect = body.getBoundingClientRect()
      const _width = rect.width
      // screen-xs
      if (_width < MEDIA_QUERY['screen-xs'].maxWidth) {
        return 'screen-xs'
      }
      // screen-sm
      if (_width > MEDIA_QUERY['screen-sm'].minWidth && _width < MEDIA_QUERY['screen-sm'].maxWidth) {
        return 'screen-sm'
      }
      // screen-md
      if (_width > MEDIA_QUERY['screen-md'].minWidth && _width < MEDIA_QUERY['screen-md'].maxWidth) {
        return 'screen-md'
      }
      // screen-lg
      if (_width > MEDIA_QUERY['screen-lg'].minWidth && _width < MEDIA_QUERY['screen-lg'].maxWidth) {
        return 'screen-lg'
      }
      // screen-xl
      if (_width > MEDIA_QUERY['screen-xl'].minWidth && _width < MEDIA_QUERY['screen-xl'].maxWidth) {
        return 'screen-xl'
      }
      // screen-xxl
      if (_width > MEDIA_QUERY['screen-xxl'].minWidth) {
        return 'screen-xxl'
      }
    }
  }
}
