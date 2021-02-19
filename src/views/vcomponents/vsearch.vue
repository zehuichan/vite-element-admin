<template>
  <div class="v-components">
    <h1>业务组件</h1>
    <!--v-search-->
    <demo-card title="v-search">
      <v-search v-model="searchForm" :options="search.options">
        <template #tools>
          自定义额外插槽 #tools
        </template>
      </v-search>
      <demo-block title="template">
        <highlightjs language="html" :code="vsearch.template"/>
      </demo-block>
      <demo-block title="javascript">
        <highlightjs language="javascript" :code="vsearch.javascript"/>
      </demo-block>
    </demo-card>

    <demo-affix/>
  </div>
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

        searchForm: {},
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "./index.scss";
</style>