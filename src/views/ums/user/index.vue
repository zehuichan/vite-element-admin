<template>
  <div>
    <div class="app-container">
      <el-form label-position="right" label-width="80px" :model="dataForm">
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
      <div class="btn-tools">
        <el-button type="primary" icon="el-icon-plus" v-action:add>新增</el-button>
        <el-button type="danger" icon="el-icon-download" v-action:export>导出</el-button>
      </div>
      <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="account" label="账号" min-width="120"/>
        <el-table-column prop="name" label="姓名"/>
        <el-table-column prop="org" label="所属机构"/>
        <el-table-column prop="mobile" label="手机号" min-width="120"/>
        <el-table-column prop="email" label="邮箱" min-width="200"/>
        <el-table-column prop="create_time" label="添加时间" min-width="140"/>
        <el-table-column prop="login_time" label="最后登录" min-width="140"/>
        <el-table-column label="状态" width="60">
          <template slot-scope="scope">
            <el-tag>{{scope.row.status ? '启用' : '禁用'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-button type="text" @click="navigateTo(`/ums/user/assign-role/${scope.row.id}`)">分配角色</el-button>
            <el-divider direction="vertical"/>
            <el-button type="text" @click="onClick">修改密码</el-button>
            <el-divider direction="vertical"/>
            <el-button type="text" v-action:edit>编辑</el-button>
            <el-divider direction="vertical"/>
            <el-popconfirm title="此操作将永久删除选择的用户, 是否继续?" icon="el-icon-info" iconColor="red">
              <el-button slot="reference" type="text" v-action:delete>删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-container">
        <div class="fl">
          <el-select v-model="select" clearable placeholder="批量操作">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary">确定</el-button>
        </div>
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

    <pass-word-dialog v-model="show"/>
  </div>
</template>

<script>
  // api
  import {adminList} from '@/api/ums'
  // vuex
  import {mapGetters} from 'vuex'
  // directives
  import action from '@/directive/action'
  // components
  import PassWordDialog from './components/PassWordDialog'

  export default {
    name: 'User',
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
          {value: '选项1', label: '批量删除'},
        ],
        show: false
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
      this._adminList()
    },
    methods: {
      navigateTo(path) {
        this.$router.push({path})
      },
      async _adminList() {
        this.loading = true
        const res = await adminList({p: this.p, ps: this.ps})
        this.tableData = res.data.items
        this.total = res.data.total
        this.loading = false
      },
      onSizeChange(val) {
        this.ps = val
        this._adminList()
      },
      onCurrentChange(val) {
        this.p = val
        this._adminList()
      },
      onClick(){
        this.show = true
      },
    },
    components: {
      PassWordDialog
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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