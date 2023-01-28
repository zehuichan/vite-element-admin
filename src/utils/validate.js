/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * 判断类型
 * @param val
 * @param type
 * @returns {boolean}
 */
export function is(val, type) {
  const typeArr = Array.isArray(type) ? type : [type]
  const valType = Object.prototype.toString.call(val)
  return typeArr.some(type => `[object ${type}]` === valType)
}