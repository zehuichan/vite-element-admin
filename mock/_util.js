export function resultSuccess(data, { msg = 'ok' } = {}) {
  return {
    code: 200,
    data,
    msg,
    type: 'success'
  }
}

export function resultError(msg = 'Request failed', { code = -1, data = null } = {}) {
  return {
    code,
    data,
    msg,
    type: 'error'
  }
}
