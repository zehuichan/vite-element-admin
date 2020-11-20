<template>
  <div>
    <div class="app-container">
      <el-table :data="tableData">
        <el-table-column prop="meta.title" label="菜单名字"/>
      </el-table>
    </div>
  </div>
</template>

<script>
  // api
  import {menuList} from '@/api/ums'

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
        console.log(res)
        this.tableData = res.data
      },
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