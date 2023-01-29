<script lang="jsx">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Overlay',
  props: {
    mask: {
      type: Boolean,
      default: true
    },
    overlayClass: {
      type: [String, Array, Object]
    },
    zIndex: {
      type: [String, Number]
    }
  },
  emits: ['click'],
  setup(props, { slots, emit }) {

    function onMaskClick(e) {
      emit('click', e)
    }

    return () => {

      return props.mask
        ? (<div
          class={['overlay', props.overlayClass]}
          style={{ zIndex: props.zIndex }}
          onClick={onMaskClick}
        >
          {slots.default}
        </div>)
        : (<div
          class={props.overlayClass}
          style={{
            zIndex: props.zIndex,
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px'
          }}
          onClick={onMaskClick}
        >
          {slots.default}
        </div>)
    }
  }
})
</script>

<style lang="scss">
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
}
</style>