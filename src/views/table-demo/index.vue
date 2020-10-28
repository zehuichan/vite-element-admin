<template>
  <div>
    <div class="app-container">
      <div class="page-header-heading">
        <span class="page-header-heading-title">{{$route.meta.title}}</span>
      </div>
    </div>
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
  import VTable from '@/components/VTable'

  export default {
    name: 'TableDemo',
    data() {
      return {
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
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      handleSelectionChange(val) {
        console.log(val)
      },
      getList() {
        console.log('获取数据')
        this.tableData = [
          { date: '2020-10-28 09:52:41', name: '陈泽辉', channel: '回归测试方案' }
        ]
      }
    },
    components: {
      VTable
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>