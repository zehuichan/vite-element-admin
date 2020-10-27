<template>
  <div class="v-table">
    <el-table :data="data" v-bind="$attrs">
      <el-table-column
          v-for="(column, index) in columns"
          :key="column.value"
          :label="column.text"
          :width="column.width"
      >
        <template slot-scope="scope">
          {{scope.row[column.value]}}
        </template>
      </el-table-column>
      <slot/>
    </el-table>
    <div class="pagination-container">
      <el-pagination
          :background="background"
          :current-page.sync="currentPage"
          :page-size.sync="pageSize"
          :layout="layout"
          :page-sizes="pageSizes"
          :total="total"
          v-bind="$attrs"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VTable',
    props: {
      // table
      data: {
        type: [Array, Object],
        required: true
      },
      labelName: String,
      columns: {
        type: Array,
        default: () => []
      },
      // pagination
      total: {
        required: true,
        type: Number
      },
      page: {
        type: Number,
        default: 1
      },
      limit: {
        type: Number,
        default: 20
      },
      pageSizes: {
        type: Array,
        default() {
          return [10, 20, 30, 50]
        }
      },
      layout: {
        type: String,
        default: 'total, sizes, prev, pager, next, jumper'
      },
      background: {
        type: Boolean,
        default: true
      },
    },
    computed: {
      currentPage: {
        get() {
          return this.page
        },
        set(val) {
          this.$emit('update:page', val)
        }
      },
      pageSize: {
        get() {
          return this.limit
        },
        set(val) {
          this.$emit('update:limit', val)
        }
      }
    },
    methods: {
      handleSizeChange(val) {
        this.$emit('pagination', {page: this.currentPage, limit: val})
      },
      handleCurrentChange(val) {
        this.$emit('pagination', {page: val, limit: this.pageSize})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .v-table {

    .pagination-container {
      background: #fff;
      padding: 32px 16px;
    }
  }
</style>