<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Fragment',
  functional: true,
  render(h, ctx) {
    return ctx.children.length > 1 ? h('div', {}, ctx.children) : ctx.children
  }
})
</script>