<template>
  <svg
    :class="[prefix, spin && 'svg-icon-spin']"
    :style="getStyle"
    aria-hidden="true"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon'
    },
    name: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 16
    },
    spin: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`)
    const getStyle = computed(() => {
      const { size } = props
      let s = `${size}`
      s = `${s.replace('px', '')}px`
      return {
        width: s,
        height: s
      }
    })

    return { symbolId, getStyle }
  }
})
</script>

<style lang="scss">
.svg-icon {
  display: inline-block;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}

.svg-icon-spin {
  animation: rotating 2s linear infinite;
}
</style>
