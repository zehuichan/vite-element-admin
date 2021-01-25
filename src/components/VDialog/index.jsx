import './index.scss'
import popup from '@/components/utils/popup'

const VDialog = {
  name: 'VDialog',
  mixins: [popup],
  render() {
    const renderFooter = () => {
      return (
        <div slot="footer" class="dialog-footer">
          <el-button type="default" onClick={this.onClose}>{this.cancelButtonText}</el-button>
          <el-button {...{ props: this.$attrs }} type="primary" onClick={this.onConfirm}>
            {this.confirmButtonText}
          </el-button>
        </div>
      )
    }

    return (
      <el-dialog
        {...{ props: this.$attrs, on: this.$listeners }}
        custom-class={'v-dialog'}
        visible={this.value}
        onClose={this.onClose}
      >
        {this.$slots.default}
        {this.$slots.footer ? this.$slots.footer : renderFooter()}
      </el-dialog>
    )
  }
}


export default VDialog