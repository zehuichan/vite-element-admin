<template>
  <div>
    <div class="app-container">
      <div class="page-header-heading">
        <span class="page-header-heading-title">{{$route.meta.title}}</span>
      </div>
    </div>
    <div class="app-container">
      <v-table
          v-loading="tableLoading"
          :data="tableData"
          :columns="columns"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getList"
      >
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
        columns: [],
        total: 0,
        listQuery: {
          page: 1,
          limit: 20
        }
      }
    },
    methods: {
      getList() {
        console.log('获取数据')
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