// store
import store from '@/store'

// 文档
const { body } = document

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
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
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
    const mediaQuery = this.$_mediaQuery()
    store.dispatch('app/setMediaQuery', mediaQuery)
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        const mediaQuery = this.$_mediaQuery()
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')
        store.dispatch('app/setMediaQuery', mediaQuery)

        if (!this.sidebar.opened && isMobile) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        } else if (this.sidebar.opened) {
          if (['screen-md'].indexOf(mediaQuery) > -1) {
            store.dispatch('app/toggleSideBar')
          } else if (['screen-lg', 'screen-xl', 'screen-xll'].indexOf(mediaQuery) > -1) {
            store.dispatch('app/openSideBar', { withoutAnimation: true })
          }
        } else if (['screen-lg', 'screen-xl', 'screen-xll'].indexOf(mediaQuery) > -1) {
          store.dispatch('app/toggleSideBar')
        }
      }
    },
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < MEDIA_QUERY['screen-sm'].maxWidth
    },
    $_mediaQuery() {
      const rect = body.getBoundingClientRect()
      const _width = rect.width - 1
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
