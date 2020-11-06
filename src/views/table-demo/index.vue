<template>
  <div>
    <div class="app-header">
      <el-page-header @back="goBack" :content="$route.meta.title"/>
    </div>
    <v-search v-model.sync="dataForm" :options="options" @search="onSearch">
      <template #tools>
        <excel-upload type="warning" icon="el-icon-upload2" @success="onSuccess"/>
        <excel-export
          type="success"
          icon="el-icon-download"
          :t-header="tHeader"
          :t-body="tBody"
        />
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
      </v-table>
    </div>
  </div>
</template>

<script>
  // components
  import VSearch from '@/components/VSearch'
  import VTable from '@/components/VTable'
  import ExcelUpload from '@/components/ExcelUpload'
  import ExcelExport from '@/components/ExcelExport'
  // mapping
  import {columns} from './mapping'

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
        dataForm: {},
        options: [
          { label: '渠道', key: 'channel_name', value: '', placeholder: '渠道', type: 'input' },
          { label: '推广员', key: 'promoter_name', value: '', placeholder: '推广员', type: 'input' },
          { label: '日期', key: 'count_date', value: [], placeholder: '日期', type: 'daterange' },
        ],
        upload_data: [],
        // 导出相关
        loading: false,
        tHeader: ['发行方', '车辆类型', '售后订单号', '车牌号', '收件人姓名', '收货人电话', '收货地址', '模式', '快递公司', '快递单号'],
        tFilters: ['supplierId', 'vehicleTypeDesc', 'id', 'plateNumber', 'consignee', 'consigneePhone', 'receivingAddress', 'patternDesc', 'expressCompany', 'deliveryNumber']
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

      this.columns = columns
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
          }, {
            'id': '773907776538759168',
            'supplierId': '1',
            'usersCardId': '727115169764880384',
            'uid': '725374275825049600',
            'plateNumber': '豫A999RA',
            'plateColor': 1,
            'afterSaleState': 1,
            'afterSaleStateDesc': '新建',
            'vehicleType': 1,
            'vehicleTypeDesc': '货车',
            'pattern': 3,
            'patternDesc': '更换ETC卡片和ETC设备',
            'deliveryState': 2,
            'deliveryStateDesc': '待签收',
            'consigneePhone': '123456'
          }, {
            'id': '773907785304854528',
            'supplierId': '1',
            'usersCardId': '729792163518492672',
            'uid': '729787520035987456',
            'plateNumber': '苏AJS923',
            'plateColor': 1,
            'afterSaleState': 1,
            'afterSaleStateDesc': '新建',
            'vehicleType': 1,
            'vehicleTypeDesc': '货车',
            'pattern': 1,
            'patternDesc': '仅更换ETC卡片',
            'deliveryState': 3,
            'deliveryStateDesc': '待发货',
            'consigneePhone': '123456'
          }, {
            'id': '773907789083922432',
            'supplierId': '1',
            'usersCardId': '730084611715137536',
            'uid': '729787520035987456',
            'plateNumber': '苏AJS92A',
            'plateColor': 1,
            'afterSaleState': 1,
            'afterSaleStateDesc': '新建',
            'vehicleType': 1,
            'vehicleTypeDesc': '货车',
            'pattern': 2,
            'patternDesc': '仅更换ETC设备',
            'deliveryState': 1,
            'deliveryStateDesc': '待寄回',
            'consigneePhone': '123456'
          }, {
            'id': '773948896324964352',
            'supplierId': '1',
            'usersCardId': '773863039853813760',
            'uid': '108',
            'plateNumber': '粤ATKT77',
            'plateColor': 1,
            'afterSaleState': 1,
            'afterSaleStateDesc': '新建',
            'vehicleType': 2,
            'vehicleTypeDesc': '客车'
          }, {
            'id': '773503465847214080',
            'supplierId': '1',
            'usersCardId': '735572009561100288',
            'uid': '734416496691912704',
            'plateNumber': '湘EFC396',
            'plateColor': 1,
            'cancelState': 2,
            'cancelStateDesc': '取消成功',
            'afterSaleState': 4,
            'afterSaleStateDesc': '已取消',
            'vehicleType': 2,
            'vehicleTypeDesc': '客车',
            'pattern': 2,
            'patternDesc': '仅更换ETC设备',
            'deliveryState': 1,
            'deliveryStateDesc': '待寄回',
            'consigneePhone': '123456'
          }]
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
      },
      transExcelRow(row) {
        const ret = {}
        for (const i in row) {
          ret[i.trim()] = row[i]
        }
        return ret
      },
    },
    components: {
      VSearch,
      VTable,
      ExcelUpload,
      ExcelExport
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>