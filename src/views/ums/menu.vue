<template>
  <div>
    <div class="app-container">
      <div class="page-header-heading">
        <span class="page-header-heading-title">{{$route.meta.title}}</span>
      </div>
    </div>
    <div class="app-container">
      <el-table
          v-loading="loading"
          :data="tableData"
          row-key="id"
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          style="width: 100%"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="title" label="菜单名称"/>
        <el-table-column prop="url" label="URL"/>
        <el-table-column prop="key" label="前端资源"/>
        <el-table-column prop="icon" label="前端图标">
          <template slot-scope="scope">
            <i v-if="scope.row.icon" class="ico" :class="scope.row.icon"/>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="hidden" label="是否显示">
          <template slot-scope="scope">
            <el-tag>{{scope.row.hidden}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="meta" label="路由元信息"/>
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
        total: 0,
        p: 1,
        ps: 15
      }
    },
    created() {
      this._menuList()
    },
    methods: {
      async _menuList() {
        this.loading = true
        const res = await menuList({p: this.p, ps: this.ps})
        this.tableData = res.data.items
        this.total = res.data.total
        this.loading = false
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