import './index.scss'

const VDialog = {
  name: 'VDialog',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: Boolean,
    confirmButtonText: {
      type: String,
      default: '确认'
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
  },
  render() {
    const onClose = () => {
      this.$emit('input', false)
      this.$emit('cancel', false)
    }

    const onConfirm = () => {
      this.$emit('confirm')
    }

    const renderFooter = () => {
      return (
        <div slot="footer" class="dialog-footer">
          <el-button type="default" onClick={onClose}>{this.cancelButtonText}</el-button>
          <el-button {...{ props: this.$attrs }} type="primary" onClick={onConfirm}>{this.confirmButtonText}</el-button>
        </div>
      )
    }

    return (
      <el-dialog
        {...{ props: this.$attrs, on: this.$listeners }}
        custom-class={'v-dialog'}
        visible={this.value}
        onClose={onClose}
      >
        {this.$slots.default}
        {this.$slots.footer ? this.$slots.footer : renderFooter()}
      </el-dialog>
    )
  }
}


export default VDialog