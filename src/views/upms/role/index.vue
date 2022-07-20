<template>
  <div>
    <div class="app-container">
      <div class="btn-tools">
        <el-button type="primary" icon="el-icon-plus">添加角色</el-button>
        <el-button type="danger" icon="el-icon-delete" disabled>删除</el-button>
        <el-button type="default" icon="el-icon-upload2">导入</el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="code" label="唯一识别码"/>
        <el-table-column prop="name" label="角色名称"/>
        <el-table-column label="状态" min-width="80">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.status ? '启用' : '禁用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" min-width="140"/>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-button type="text" @click="navigateTo(`/ums/role/assign-menu/${scope.row.id}`)">分配菜单</el-button>
            <el-divider direction="vertical"/>
            <el-button type="text" @click="navigateTo(`/ums/role/assign-btn/${scope.row.id}`)">分配权限</el-button>
            <el-divider direction="vertical"/>
            <el-button type="text">编辑</el-button>
            <el-divider direction="vertical"/>
            <v-confirm title="是否要进行该删除操作?" icon="el-icon-info" iconColor="red">
              <el-button type="text">删除</el-button>
            </v-confirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-container">
        <el-pagination
          class="fr"
          background
          :small="small"
          :current-page="p"
          :page-size="ps"
          :page-sizes="[15, 20, 30, 50]"
          :layout="layout"
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
import { roleList } from '@/api/ums'
// vuex
import { mapGetters } from 'vuex'
// directives
import action from '@/directive/action'

export default {
  name: 'Role',
  directives: {
    action
  },
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
      select: '',
      options: [
        { value: '选项1', label: '批量删除' },
      ],
    }
  },
  computed: {
    small() {
      return ['screen-md', 'screen-xs', 'screen-sm'].includes(this.mediaQuery)
    },
    layout() {
      return ['screen-md', 'screen-xs', 'screen-sm'].includes(this.mediaQuery) ? 'total, prev, pager, next' : 'total, sizes, prev, pager, next, jumper'
    },
    ...mapGetters([
      'mediaQuery'
    ])
  },
  created() {
    this._roleList()
  },
  methods: {
    navigateTo(path) {
      this.$router.push({ path })
    },
    async _roleList() {
      this.loading = true
      const res = await roleList({ p: this.p, ps: this.ps })
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

<style lang="scss">

</style>