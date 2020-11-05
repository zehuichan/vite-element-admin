<template>
  <!--v-bind="$attrs" v-on="$listeners"-->
  <el-button
    v-loading.fullscreen.lock="loading"
    :element-loading-text="loadingText"
    v-bind="$attrs"
    @click="handleDownload"
  >
    <slot>导出</slot>
  </el-button>
</template>

<script>
  export default {
    name: 'ExcelExport',
    props: {
      loading: Boolean,
      loadingText: {
        type: String,
        default: '正在导出所有需要发货的维修单（所有发行方）...'
      },
      tHeader: {
        type: Array,
        default: () => []
      },
      tBody: {
        type: Array,
        default: () => []
      },
      filters: {
        type: Array,
        default: () => []
      },
      filename: String
    },
    methods: {
      handleDownload() {
        import('./Export2Excel').then(excel => {
          const tHeader = this.tHeader
          const filters = this.filters
          const tBody = this.tBody
          const data = this.formatJson(filters, tBody)
          excel.export_json_to_excel({
            header: tHeader,
            data: data,
            filename: this.filename
          })
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          return v[j]
        }))
      }
    }
  }
</script>

<style scoped>

</style>
