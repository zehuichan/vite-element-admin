import { isFunction } from '@/utils/is'

/**
 * @description:  Get slot to prevent empty error
 */
export function getSlot(slots, slot = 'default', data) {
  if (!slots || !Reflect.has(slots, slot)) {
    return null
  }
  if (!isFunction(slots[slot])) {
    console.error(`${slot} is not a function!`)
    return null
  }
  const slotFn = slots[slot]
  if (!slotFn) return null
  return slotFn(data)
}

/**
 * extends slots
 * @param slots
 * @param excludeKeys
 */
export function extendSlots(slots, excludeKeys = []) {
  const slotKeys = Object.keys(slots)
  const ret = {}
  slotKeys.map((key) => {
    if (excludeKeys.includes(key)) {
      return null
    }
    ret[key] = (data) => getSlot(slots, key, data)
  })
  return ret
}
