<template>
  <div>
    <div class="app-container">
      <div class="page-header-heading">
        <span class="page-header-heading-title">{{$route.meta.title}}</span>
      </div>
      <el-form label-position="right" label-width="80px" :model="dataForm" class="base-form">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="8" :md="6">
            <el-form-item label="输入搜索">
              <el-input v-model="dataForm.name" clearable placeholder="商品名称"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :md="6">
            <el-form-item label="商品货号">
              <el-input v-model="dataForm.region" clearable placeholder="商品货号"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :md="6">
            <el-form-item label="商品品牌">
              <el-select v-model="dataForm.region" placeholder="请选择" style="width: 100%;">
                <el-option label="区域一" value="shanghai"/>
                <el-option label="区域二" value="beijing"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :md="6">
            <el-form-item label="上架状态">
              <el-select v-model="dataForm.region" placeholder="请选择" style="width: 100%;">
                <el-option label="上架" :value="1"/>
                <el-option label="下架" :value="0"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :md="6">
            <el-form-item label="审核状态">
              <el-select v-model="dataForm.region" placeholder="请选择" style="width: 100%;">
                <el-option label="审核通过" :value="1"/>
                <el-option label="未审核" :value="0"/>
              </el-select>
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
        <el-table-column prop="pic" label="商品图片">
          <template slot-scope="scope">
            <el-image :src="scope.row.pic" fit="cover"/>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称">
          <template slot-scope="scope">
            <p>{{scope.row.name}}</p>
            <p>品牌：{{scope.row.brand}}</p>
          </template>
        </el-table-column>
        <el-table-column label="价格/货号" width="240">
          <template slot-scope="scope">
            <p>价格：￥{{scope.row.price}}</p>
            <p>货号：{{scope.row.id}}</p>
          </template>
        </el-table-column>
        <el-table-column label="标签">
          <template slot-scope="scope">
            <p class="colors" v-for="(item, index) in scope.row.tags" :key="index">
              <span>{{item.title}}</span>
              <span class="color-block" :style="`background: ${item.color}`"/>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="60"/>
        <el-table-column label="SKU库存"/>
        <el-table-column prop="sale" label="销量"/>
        <el-table-column prop="on_off" label="上架/下架">
          <template slot-scope="scope">
            <el-switch
                v-model="scope.row.on_off"
                active-text="上架"
                inactive-text="下架"
                :active-value="1"
                :inactive-value="0"
            />
          </template>
        </el-table-column>
        <el-table-column prop="status" label="审核状态" width="100"/>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <p>
              <el-button size="mini">查看</el-button>
              <el-divider direction="vertical"/>
              <el-button size="mini">编辑</el-button>
            </p>
            <p>
              <el-button size="mini">日志</el-button>
              <el-divider direction="vertical"/>
              <el-popconfirm title="是否要进行该删除操作?" icon="el-icon-info" iconColor="red">
                <el-button slot="reference" size="mini" type="danger">删除</el-button>
              </el-popconfirm>
            </p>
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
  import {getList} from '@/api/pms'

  export default {
    name: 'Product',
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

  .colors {
    display: flex;

    span {
      display: inline-block;
      line-height: 24px;
    }

    .color-block {
      width: 24px;
      height: 24px;
      border-radius: 2px;
      margin-left: 8px;
    }
  }
</style>