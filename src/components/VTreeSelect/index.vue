<template>
  <el-select :value="value">
    <el-option value="" class="options"/>
    <el-tree
      id="tree-option"
      ref="tree"
      :data="options"
      :props="defaultProps"
      highlight-current
      :expand-on-click-node="false"
      default-expand-all
      node-key="id"
      @node-click="onNodeClick"
    />
  </el-select>
</template>

<script>
  export default {
    name: 'VTreeSelect',
    model: {
      prop: 'value',
      event: 'input'
    },
    props: {
      // 初始值
      value: {
        type: [String, Number],
        default: null
      },
      // 选项列表数据(树形结构的对象数组)
      options: {
        type: Array,
        default: () => [],
        required: true
      },
    },
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    methods: {
      onNodeClick(node) {
        console.log(node)
      }
    }
  }
</script>

<style scoped>
  .el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
    height: auto;
    max-height: 274px;
    padding: 0;
    overflow: hidden;
    overflow-y: auto;
  }

  .el-select-dropdown__item.selected {
    font-weight: normal;
  }

  ul li >>> .el-tree .el-tree-node__content {
    height: auto;
    padding: 0 20px;
  }

  .el-tree-node__label {
    font-weight: normal;
  }

  .el-tree >>> .is-current .el-tree-node__label {
    color: #409EFF;
    font-weight: 700;
  }

  .el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
    color: #606266;
    font-weight: normal;
  }
</style>