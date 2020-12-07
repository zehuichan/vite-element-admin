import {Message, MessageBox} from 'element-ui'

export function judgeAlert(opt, cb) {
  const { type = 'success', title, content, offset, duration = 2000 } = opt
  Message({
    type,
    customClass: 'custom-alert judge-alert',
    dangerouslyUseHTMLString: true,
    message: `<div class="alert-success__title">${title}</div><div class="alert-success__info">${content}</div>`,
    offset,
    duration,
    onClose() {
      cb && cb()
    }
  })
}

export function judgeConfirm(opt, cb) {
  const { type = 'warning', message, title, confirmButtonText = '确定', cancelButtonText = '取消' } = opt
  MessageBox
    .confirm(message, title, {
      type,
      customClass: 'custom-confirm judge-confirm',
      confirmButtonText,
      cancelButtonText,
    })
    .then(() => {
      cb && cb()
    })
    .catch(() => {
    })
}