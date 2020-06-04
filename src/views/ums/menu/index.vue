<template>
  <div>
    <div class="app-container">
      <div class="page-header-heading">
        <span class="page-header-heading-title">{{$route.meta.title}}</span>
      </div>
    </div>
    <div class="app-container">

    </div>

    <footer-tool-bar>
      <el-button type="primary">保存</el-button>
    </footer-tool-bar>
  </div>
</template>

<script>
  // api
  import {menuList} from '@/api/ums'
  // components
  import FooterToolBar from '@/components/FooterToolBar/index'

  export default {
    name: 'Menu',
    data() {
      return {
        loading: false,
        tableData: []
      }
    },
    created() {
      this._menuList()
    },
    methods: {
      async _menuList() {
        const res = await menuList()
        this.tableData = res.data
      },
    },
    components: {
      FooterToolBar
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .ico {
    display: block;
    font-size: 18px;
    color: #409EFF;
    transition: color .15s linear;
  }
</style>