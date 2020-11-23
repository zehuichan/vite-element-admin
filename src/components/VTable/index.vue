<template>
  <div class="v-table">
    <el-table v-loading="loading" :data="data" v-bind="$attrs" v-on="$listeners" style="width: 100%;">
      <slot name="selection"/>
      <slot name="pre-column"/>
      <el-table-column
        v-for="(column, index) in columns"
        :key="column.key"
        :prop="column.key"
        :label="column.label"
        :width="column.width"
        :min-width="column.minWidth"
        :align="column.align || 'left'"
        :header-align="column.headerAlign || 'left'"
        :sortable="column.sortable"
        v-if="column.hidden === undefined && !column.hidden"
      >
        <template slot-scope="scope">
          <slot :scope="scope" :name="column.key">
            {{scope.row[column.key]}}
          </slot>
        </template>
      </el-table-column>
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
  import {scrollTo} from '@/utils/scrollTo'

  export default {
    name: 'VTable',
    props: {
      // table
      loading: Boolean,
      data: {
        type: Array,
        required: true,
        default: () => []
      },
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
        default: 10
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
      autoScroll: {
        type: Boolean,
        default: false
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
        this.$emit('pagination', { page: this.currentPage, limit: val })
        if (this.autoScroll) {
          scrollTo(0, 800)
        }
      },
      handleCurrentChange(val) {
        this.$emit('pagination', { page: val, limit: this.pageSize })
        if (this.autoScroll) {
          scrollTo(0, 800)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .v-table {

    .pagination-container {
      background: #fff;
      padding: 16px;
    }
  }
</style>