<template>
  <demo-wrapper title="业务组件">
    <!--v-search-->
    <demo-card title="v-search">
      <v-search v-model="searchForm" :options="search.options" @search="onSearch" @reset="onReset">
        <template #tools>
          自定义额外插槽 #tools
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
  import {search} from './mapping'
  // code
  import {vsearch} from './code'

  export default {
    name: 'vsearch',
    mixins: [comp],
    data() {
      return {
        search,
        vsearch,

        searchForm: {
          name: 'chenzehui'
        },
      }
    },
    methods: {
      onSearch(form) {
      },
      onReset(form) {
      },
    }
  }
</script>