<template>
  <div>
    <div class="app-container">
      <el-form label-position="right" label-width="80px" :model="dataForm" class="base-form">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="8" :md="6">
            <el-form-item label="时间">
              <el-date-picker
                  v-model="dataForm.name"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%;"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :md="6">
            <el-form-item label="输入搜索">
              <el-input v-model="dataForm.name" clearable placeholder="会员姓名"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :md="6">
            <el-form-item label="手机号">
              <el-input v-model="dataForm.region" clearable placeholder="手机号"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :md="6">
            <el-form-item label="地址">
              <el-input v-model="dataForm.region" clearable placeholder="地址"/>
            </el-form-item>
          </el-col>
          <el-col :span="24" class="text-right">
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
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="create_time" label="创建日期" width="140"/>
        <el-table-column prop="name" label="姓名"/>
        <el-table-column prop="gender" label="性别"/>
        <el-table-column prop="birthday" label="出生日期"/>
        <el-table-column prop="mobile" label="手机号"/>
        <el-table-column prop="address" label="地址"/>
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
  import {getList} from '@/api/mms'

  export default {
    name: 'Member',
    data() {
      return {
        loading: false,
        tableData: [],
        total: 0,
        p: 1,
        ps: 15,
        select: '',
        options: [
          {value: '选项1', label: '批量删除'},
        ],
        dataForm: {}
      }
    },
    created() {
      this._getList()
    },
    methods: {
      async _getList() {
        this.loading = true
        const res = await getList({p: this.p, ps: this.ps})
        this.tableData = res.data.items
        this.total = res.data.total
        this.loading = false
      },
      onSizeChange(val) {
        this.ps = val
        this._getList()

      },
      onCurrentChange(val) {
        this.p = val
        this._getList()
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>