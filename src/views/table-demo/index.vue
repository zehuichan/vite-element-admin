<template>
  <div>
    <div class="app-header">
      <el-page-header @back="goBack" :content="$route.meta.title"/>
    </div>
    <v-search v-model.sync="dataForm" :options="options" @search="onSearch">
      <template #tools>
        <excel-upload type="warning" icon="el-icon-upload2" :on-success="onSuccess"/>
        <excel-export type="success" icon="el-icon-download"/>
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

  export default {
    name: 'TableDemo',
    data() {
      return {
        tempRoute: {},
        tableLoading: false,
        tableData: [],
        columns: [
          {
            label: '日期',
            key: 'date',
          },
          {
            label: '推广员',
            key: 'name',
          },
          {
            label: '渠道',
            key: 'channel',
          },
        ],
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
        upload_data: []
      }
    },
    created() {
      this.tempRoute = Object.assign({}, this.$route)
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
          { date: '2020-10-28 09:52:41', name: '陈泽辉', channel: '回归测试方案' }
        ]
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