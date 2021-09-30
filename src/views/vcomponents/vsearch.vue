<template>
  <demo-wrapper title="业务组件">
    <!--v-search-->
    <demo-card title="v-search">
      <v-search v-model="searchForm" :options="search.options" @search="onSearch" @reset="onReset">
        <template #tools>
          自定义额外插槽 #tools
        </template>
        <template #name-label="{scope}">
          {{ scope.label }}
          <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
            <i class="el-icon-warning" style="color: #f44;"></i>
          </el-tooltip>
        </template>
      </v-search>
      <demo-block title="result">
        <highlightjs language="html" :code="JSON.stringify(searchForm)"/>
      </demo-block>
      <demo-block title="template">
        <highlightjs language="html" :code="vsearch.template"/>
      </demo-block>
      <demo-block title="javascript">
        <highlightjs language="javascript" :code="vsearch.javascript"/>
      </demo-block>
    </demo-card>
  </demo-wrapper>
</template>

<script>
// mixins
import comp from './comp'
// mapping
import { search } from './mapping'
// code
import { vsearch } from './code'

const defaultForm = {
  name: 'chenzehui',
  age: null,
  address: null,
  tags: null,
  tags1: null,
  digit: null,
  number: null,
  select: null,
  daterange: [],
}

export default {
  name: 'vsearch',
  mixins: [comp],
  data() {
    return {
      search,
      vsearch,

      searchForm: Object.assign({}, defaultForm),
    }
  },
  methods: {
    onSearch(form) {
      const messageArr = Object.keys(this.searchForm).reduce((acc, key) => {
        acc.push(`${key}: ${this.searchForm[key]}`)
        return acc
      }, [])
      this.showData(messageArr)
    },
    onReset(form) {
    },
    showData(messageArr) {
      if (messageArr.length) {
        const h = this.$createElement
        messageArr = messageArr.map(msg => {
          return h('div', { style: { marginBottom: '8px' } }, msg)
        })
        this.$notify({
          title: '提交的表单数据',
          message: h('div', { style: { marginTop: '12px' } }, messageArr)
        })
      }
    }
  }
}
</script>