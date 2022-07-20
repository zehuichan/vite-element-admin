<template>
  <div>
    <v-search v-model="dataForm" :options="options" :span="6" @search="onSearch">
      <template #tools>
        <el-button type="primary" icon="el-icon-plus">新建</el-button>
        <el-button type="danger" icon="el-icon-delete" disabled>删除</el-button>
        <el-button type="default" icon="el-icon-upload2">导入</el-button>
      </template>
    </v-search>
    <div class="app-container">
      <v-table
        :loading="loading"
        :data="tableData"
        :columns="columns"
        :total="total"
        :page.sync="listQuery.p"
        :limit.sync="listQuery.ps"
        @pagination="_adminList"
      >
        <template #selection>
          <el-table-column type="selection" width="55"/>
        </template>
        <template #status="{scope}">
          <el-tag>{{ scope.row.status ? '启用' : '禁用' }}</el-tag>
        </template>
        <template #actions="{scope}">
          <el-button type="text" @click="navigateTo(`/ums/user/assign-role/${scope.row.id}`)">分配角色</el-button>
          <el-divider direction="vertical"/>
          <el-button type="text" @click="onClick">修改密码</el-button>
          <el-divider direction="vertical"/>
          <el-button type="text">编辑</el-button>
          <el-divider direction="vertical"/>
          <v-confirm title="此操作将永久删除选择的用户, 是否继续?" icon="el-icon-info" iconColor="red">
            <el-button type="text">删除</el-button>
          </v-confirm>
        </template>
      </v-table>
    </div>
    <pass-word-dialog v-model="show"/>
  </div>
</template>

<script>
// api
import { adminList } from '@/api/ums'
// directives
import action from '@/directive/action'
// components
import PassWordDialog from './components/PassWordDialog'
// mapping
import { options, columns } from './mapping'

export default {
  name: 'User',
  directives: {
    action
  },
  data() {
    return {
      options: [],
      total: 0,
      listQuery: {
        p: 1,
        ps: 10
      },
      dataForm: {},
      loading: false,
      tableData: [],
      columns: [],
      show: false
    }
  },
  created() {
    this.options = options
    this.columns = columns

    this._adminList()
  },
  methods: {
    navigateTo(path) {
      this.$router.push({ path })
    },
    async _adminList() {
      this.loading = true
      const data = Object.assign({}, this.listQuery, this.dataForm)
      const res = await adminList(data)
      this.tableData = res.data.items
      this.total = res.data.total
      this.loading = false
    },
    onSearch() {
      this.listQuery.p = 1
      this._adminList()
    },
    onClick() {
      this.show = true
    },
  },
  components: {
    PassWordDialog
  }
}
</script>

<style lang="scss">
.drawer-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.drawer-cont {
  flex: 1;
}

.drawer-footer {

  flex-direction: row;
}
</style>