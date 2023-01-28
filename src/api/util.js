// utils
import request, { transformRequest } from '@/api/request'
import { parseTime } from '@/utils'

const timeout = 5 * 60 * 1000

// 基础下载文件
export async function download(url, data = {}, filename, ext = '.xlsx') {
  const res = await request({
    url: url,
    method: 'post',
    transformRequest: [transformRequest],
    responseType: 'arraybuffer',
    timeout,
    data
  })

  const fn = ext ? filename + '_' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}') + ext : filename

  const blob = new Blob([res], { type: 'application/vnd.ms-excel; charset=UTF-8' })

  if (navigator.msSaveBlob) {
    window.navigator.msSaveOrOpenBlob(blob, fn)
  } else {
    // 创建URL
    const blobUrl = URL.createObjectURL(blob)

    const a = document.createElement('a')
    const event = new MouseEvent('click')
    a.download = fn
    a.href = blobUrl
    document.body.appendChild(a)
    a.dispatchEvent(event)
  }
}

// 基础上传文件
export function upload(url, data = {}) {
  return request({
    url: url,
    method: 'post',
    headers: {
      'Content-type': 'multipart/form-data'
    },
    timeout,
    data
  })
}