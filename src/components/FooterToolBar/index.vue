<template>
  <div class="footer-tool-bar-placeholder">
    <div class="footer-tool-bar" :style="{ width: barWidth }">
      <div style="float: left">
        <slot name="extra">{{ extra }}</slot>
      </div>
      <div style="float: right">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  // styles
  import variables from '@/styles/variables.scss'

  export default {
    name: 'FooterToolBar',
    props: {
      isMobile: {
        type: Boolean,
        default: false
      },
      siderWidth: {
        type: Number,
        default: undefined
      },
      extra: {
        type: [String, Object],
        default: ''
      }
    },
    computed: {
      variables() {
        return variables
      },
      barWidth() {
        return this.isMobile ? undefined : `calc(100% - ${this.collapsed ? 80 : this.siderWidth || this.variables.sideBarWidth}px)`
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .footer-tool-bar-placeholder {
    height: 56px;
  }

  .footer-tool-bar {
    position: fixed;
    width: 100%;
    bottom: 0;
    right: 0;
    height: 56px;
    line-height: 56px;
    box-shadow: 0 -1px 2px rgba(0, 0, 0, .03);
    background: #fff;
    border-top: 1px solid #e8e8e8;
    padding: 0 24px;
    z-index: 9;

    &:after {
      content: "";
      display: block;
      clear: both;
    }
  }
</style>