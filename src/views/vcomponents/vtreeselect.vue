<template>
  <demo-wrapper title="业务组件">
    <demo-card title="v-tree-select">
      <v-tree-select :options="options"/>
    </demo-card>
  </demo-wrapper>
</template>

<script>
  // mixins
  import comp from './comp'
  // utils
  import listToTree from '@/utils/listToTree'
  // code
  import { vaction } from './code'

  export default {
    name: 'vaction',
    mixins: [comp],
    data() {
      return {
        // 选项列表（必选）
        list: [
          { id: 1, parentId: 0, name: '一级菜单A', rank: 1 },
          { id: 2, parentId: 0, name: '一级菜单B', rank: 1 },
          { id: 3, parentId: 0, name: '一级菜单C', rank: 1 },
          { id: 4, parentId: 1, name: '二级菜单A-A', rank: 2 },
          { id: 5, parentId: 1, name: '二级菜单A-B', rank: 2 },
          { id: 6, parentId: 2, name: '二级菜单B-A', rank: 2 },
          { id: 7, parentId: 4, name: '三级菜单A-A-A', rank: 3 },
          { id: 8, parentId: 7, name: '四级菜单A-A-A-A', rank: 4 },
          { id: 9, parentId: 8, name: '五级菜单A-A-A-A-A', rank: 5 },
          { id: 10, parentId: 9, name: '六级菜单A-A-A-A-A-A', rank: 6 },
          { id: 11, parentId: 10, name: '七级菜单A-A-A-A-A-A-A', rank: 7 },
          { id: 12, parentId: 11, name: '八级菜单A-A-A-A-A-A-A-A', rank: 8 },
          { id: 13, parentId: 12, name: '九级菜单A-A-A-A-A-A-A-A-A', rank: 9 },
          { id: 14, parentId: 13, name: '十级菜单A-A-A-A-A-A-A-A-A-A', rank: 10 },
          { id: 15, parentId: 0, name: '一级菜单C', rank: 1 },
          { id: 16, parentId: 0, name: '一级菜单C', rank: 1 },
          { id: 17, parentId: 0, name: '一级菜单C', rank: 1 },
          { id: 18, parentId: 0, name: '一级菜单C', rank: 1 },
          { id: 19, parentId: 0, name: '一级菜单C', rank: 1 },
          { id: 20, parentId: 0, name: '一级菜单C', rank: 1 },
          { id: 21, parentId: 0, name: '一级菜单C', rank: 1 },
          { id: 22, parentId: 0, name: '一级菜单C', rank: 1 },
          { id: 23, parentId: 0, name: '一级菜单C', rank: 1 },
          { id: 24, parentId: 0, name: '一级菜单C', rank: 1 },
          { id: 25, parentId: 0, name: '一级菜单C', rank: 1 },
          { id: 26, parentId: 0, name: '一级菜单C', rank: 1 },
          { id: 27, parentId: 0, name: '一级菜单C', rank: 1 },
          { id: 28, parentId: 0, name: '一级菜单C', rank: 1 },
          { id: 29, parentId: 0, name: '一级菜单C', rank: 1 },
          { id: 30, parentId: 0, name: '一级菜单C', rank: 1 },
          { id: 31, parentId: 0, name: '一级菜单C', rank: 1 },
          { id: 32, parentId: 0, name: '一级菜单C', rank: 1 },
          { id: 33, parentId: 0, name: '一级菜单C', rank: 1 },
          { id: 34, parentId: 0, name: '一级菜单C', rank: 1 },
          { id: 35, parentId: 0, name: '一级菜单C', rank: 1 },
          { id: 36, parentId: 0, name: '一级菜单C', rank: 1 },
          { id: 37, parentId: 0, name: '一级菜单C', rank: 1 },
          { id: 38, parentId: 0, name: '一级菜单C', rank: 1 },
          { id: 39, parentId: 0, name: '一级菜单C', rank: 1 },
          { id: 40, parentId: 0, name: '一级菜单end', rank: 1 }
        ]
      }
    },
    computed: {
      options() {
        return listToTree(this.list, 'parentId', 0)
      }
    },
  }
</script>