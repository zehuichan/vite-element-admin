<template>
  <div>
    <div class="app-container">
      <el-form label-position="right" label-width="80px" :model="dataForm" class="base-form">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="8" :md="6">
            <el-form-item label="输入搜索">
              <el-input v-model="dataForm.name" clearable placeholder="账号/姓名"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="16" :md="18" class="text-right">
            <el-button>重置</el-button>
            <el-button type="primary">查询结果</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="app-container">
      <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
      >
        <el-table-column prop="name" label="角色名称"/>
        <el-table-column prop="desc" label="描述"/>
        <el-table-column prop="count" label="用户数"/>
        <el-table-column prop="create_time" label="添加时间"/>
        <el-table-column label="是否启用" width="150">
          <template slot-scope="scope">
            <el-switch
                v-model="scope.row.status"
                active-text="启用"
                inactive-text="禁用"
                :active-value="1"
                :inactive-value="0"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text">分配菜单</el-button>
            <el-divider direction="vertical"/>
            <el-button type="text">编辑</el-button>
            <el-divider direction="vertical"/>
            <el-popconfirm title="是否要进行该删除操作?" icon="el-icon-info" iconColor="red">
              <el-button slot="reference" type="text">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-container">
        <el-pagination
            class="fr"
            background
            :current-page="p"
            :page-size="ps"
            :page-sizes="[15, 20, 30, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="onSizeChange"
            @current-change="onCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
  // api
  import {roleList} from '@/api/ums'

  export default {
    name: 'Role',
    data() {
      return {
        loading: false,
        tableData: [],
        total: 0,
        p: 1,
        ps: 15,
        dataForm: {
          name: ''
        },
      }
    },
    created() {
      this._roleList()
    },
    methods: {
      async _roleList() {
        this.loading = true
        const res = await roleList({p: this.p, ps: this.ps})
        this.tableData = res.data.items
        this.total = res.data.total
        this.loading = false
      },
      onSizeChange(val) {
        this.ps = val
        this._roleList()
      },
      onCurrentChange(val) {
        this.p = val
        this._roleList()
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>