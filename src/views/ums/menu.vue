<template>
  <div>
    <div class="app-container">
      <div class="page-header-heading">
        <span class="page-header-heading-title">{{$route.meta.title}}</span>
      </div>
    </div>
    <div class="app-container">
      <el-table
          ref="table"
          v-loading="loading"
          :data="tableData"
          row-key="id"
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          @select="selectChange"
          @select-all="selectAllChange"
          style="width: 100%"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="meta.title" label="菜单名称"/>
        <el-table-column prop="meta.icon" label="前端图标">
          <template slot-scope="scope">
            <span v-if="scope.row.meta.icon" class="ico" :class="scope.row.meta.icon"/>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="path" label="路由地址"/>
        <el-table-column prop="meta.role" label="权限标识"/>
        <el-table-column prop="component" label="组件映射"/>
        <el-table-column prop="hidden" label="是否显示">
          <template slot-scope="scope">
            <el-tag v-if="!scope.row.hidden">可见</el-tag>
            <el-tag type="danger" v-else>隐藏</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>
            <el-divider direction="vertical"/>
            <el-popconfirm title="是否要进行该删除操作?" icon="el-icon-info" iconColor="red">
              <el-button slot="reference" type="text">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  // api
  import {menuList} from '@/api/ums'

  export default {
    name: 'Menu',
    data() {
      return {
        loading: false,
        tableData: [],
      }
    },
    created() {
      this._menuList()
    },
    methods: {
      async _menuList() {
        this.loading = true
        const res = await menuList()
        this.tableData = res.data
        this.loading = false
      },
      toggleSelection(rows, selected) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.table.toggleRowSelection(row, selected)
          })
        } else {
          this.$refs.table.clearSelection()
        }
      },
      selectChange(selection, row) {
        const hasChildren = row.children
        console.log('hasChildren', hasChildren)

      },
      selectAllChange(selection) {
        if (selection.length === this.tableData.length) {
          selection.forEach(rows => {
            if (rows.children) {
              this.toggleSelection(rows.children, true)
            }
          })
        } else {
          this.toggleSelection()
        }
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .ico {
    display: block;
    font-size: 18px;
    color: #409EFF;
    transition: color .15s linear;
  }
</style>