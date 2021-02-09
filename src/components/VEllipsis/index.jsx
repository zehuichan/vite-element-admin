const VEllipsis = {
  name: 'VEllipsis',
  props: {
    clamp: {
      type: Number,
      default: 1
    },
    content: String
  },
  data() {
    return {
      ellipsis: false
    }
  },
  computed: {
    className() {
      return this.ellipsis && this.clamp > 1 ? `multi-ellipsis--l${this.clamp}` : 'ellipsis'
    }
  },
  methods: {
    onClick() {
      this.ellipsis = !this.ellipsis
    }
  },
  render() {
    const { content } = this
    const renderBtn = () => (
      <el-button type="text" onClick={this.onClick}>{this.ellipsis ? '展开' : '收起'}</el-button>
    )
    return (
        <div class="ellipsis">
          {content}
          {renderBtn()}
        </div>
    )
  }
}

export default VEllipsis