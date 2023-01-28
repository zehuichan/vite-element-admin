/**
 * 数组转树形结构
 * @param list 源数组
 * @param pkey 树
 * @param pid 父ID
 */
export default function listToTree(list, pkey, pid) {
  const tmp = []
  list.forEach(item => {
    if (item[pkey] === pid) {
      const child = {
        ...item,
        children: []
      }

      // 迭代 list
      child.children = listToTree(list, pkey, item.id)

      // 删掉不存在 children 值的属性
      if (child.children.length <= 0) {
        delete child.children
      }

      tmp.push(child)
    }
  })

  return tmp
}