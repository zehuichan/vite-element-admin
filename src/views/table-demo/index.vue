<template>
  <div>
    <div class="app-header">
      <el-page-header @back="goBack" :content="$route.meta.title"/>
    </div>
    <v-search v-model="dataForm" :options="options" @search="onSearch">
      <template #tools>
        <v-excel-upload type="warning" icon="el-icon-upload2" :on-success="onSuccess">前端导入</v-excel-upload>
        <v-excel-export
          type="success"
          icon="el-icon-download"
          :can-export="canExport"
          :t-header="tHeader"
          :t-body="tBody"
        >
          前端导出
        </v-excel-export>
        <v-uploader type="info" icon="el-icon-upload" :on-success="onSuccess2">原生上传</v-uploader>
      </template>
    </v-search>
    <div class="app-container">
      <v-table
        :loading="tableLoading"
        :data="tableData"
        :columns="columns"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
        @selection-change="handleSelectionChange"
      >
        <template #selection>
          <el-table-column type="selection" width="55"/>
        </template>
        <template #date="{scope}">
          {{scope.row.date}}
        </template>
        <template #actions="{scope}">
          <el-button type="text" @click="onAction('delivery', scope.row)">发货</el-button>
        </template>
      </v-table>
    </div>

    <v-drawer
      v-model="show"
      title="订单发货"
      :loading="loading"
      confirm-button-text="确定发货"
      size="500px"
      @confirm="onConfirm"
      @cancel="onCancel"
    >
      <v-form ref="form" v-model="form" :options="formOptions"/>
      <code>{{form}}</code>
    </v-drawer>
  </div>
</template>

<script>
  // mapping
  import {options, columns, formOptions} from './mapping'

  export default {
    name: 'TableDemo',
    data() {
      return {
        tempRoute: {},
        tableLoading: false,
        tableData: [],
        columns: [],
        total: 0,
        listQuery: {
          page: 1,
          limit: 10
        },
        dataForm: {
          id: '773503440538783744'
        },
        options: [],
        upload_data: [],
        // 导出相关
        canExport: false,
        tHeader: ['发行方', '车辆类型', '售后订单号', '车牌号', '收件人姓名', '收货人电话', '收货地址', '模式', '快递公司', '快递单号'],
        tFilters: ['supplierId', 'vehicleTypeDesc', 'id', 'plateNumber', 'consignee', 'consigneePhone', 'receivingAddress', 'patternDesc', 'expressCompany', 'deliveryNumber'],

        // drawer相关
        show: false,
        loading: false,
        formOptions: [],
        form: {}
      }
    },
    computed: {
      tBody() {
        return this.tableData.map(v => this.tFilters.map(j => {
          if (j === 'supplierId') {
            return this.$options.filters.supplierFilter(v[j])
          }
          return v[j]
        }))
      },
    },
    created() {
      this.tempRoute = Object.assign({}, this.$route)

      this.options = options
      this.columns = columns
      this.formOptions = formOptions
      this.getList()
    },
    methods: {
      async goBack() {
        await this.$store.dispatch('tagsView/delView', this.tempRoute)
        this.$router.back()
      },
      handleSelectionChange(val) {
        console.log(val)
      },
      getList() {
        console.log('获取数据')
        const data = Object.assign({}, this.listQuery, this.dataForm)
        console.log(data)
        this.tableData = [
          {
            'obj': {
              'id': 123,
              'text': 'chenzehui'
            },
            'id': '773503440538783744',
            'supplierId': '1',
            'usersCardId': '735519894377598976',
            'uid': '732526851519553536',
            'plateNumber': '川AQ3L10',
            'plateColor': 1,
            'afterSaleState': 1,
            'afterSaleStateDesc': '新建',
            'vehicleType': 1,
            'vehicleTypeDesc': '货车',
            'pattern': 1,
            'patternDesc': '仅更换ETC卡片',
            'deliveryState': 1,
            'deliveryStateDesc': '待寄回',
            'userReturnTime': '2020-11-06 10:52:00'
          },
        ]
        this.total = 1
        this.canExport = true
      },
      onSearch() {
        console.log('search')
        this.getList()
      },
      onSuccess({ results, header }) {
        for (let i = 0; i < results.length; i++) {
          let each = results[i]
          each = this.transExcelRow(each)

          this.upload_data.push({
            phone: each['手机号码'],
            name: each['人员名称']
          })
        }
        console.log(this.upload_data)
      },
      transExcelRow(row) {
        const ret = {}
        for (const i in row) {
          ret[i.trim()] = row[i]
        }
        return ret
      },
      onSuccess2(rawFile) {
        console.log(rawFile)
      },
      onAction(type, row) {
        switch (type) {
          case 'delivery':
            this.form.orderId = row.id
            this.show = true
            break
          case 'cancel':
            break
        }
      },
      onConfirm() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.loading = true
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      onCancel() {
        this.$refs.form.resetFields()
        this.loading = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>