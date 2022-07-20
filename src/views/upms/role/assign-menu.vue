<template>
  <div>
    <div class="app-container">
      {{id}}
    </div>

    <div class="app-container">
      {{id}}
    </div>

    <v-footer-tool-bar>
      <el-button type="default" @click="navigateBack">取消</el-button>
      <el-button type="primary">保存</el-button>
    </v-footer-tool-bar>
  </div>
</template>

<script>
  // components
  import FooterToolBar from '@/vcomponents/VFooterToolBar/index'

  export default {
    name: 'AssignMenu',
    props: ['id'],
    data() {
      return {
        tempRoute: {}
      }
    },
    created() {
      this.id = this.$route.params && this.$route.params.id
      this.tempRoute = Object.assign({}, this.$route)

      // set tagsview title
      this.setTagsViewTitle()

      // set page title
      this.setPageTitle()
    },
    methods: {
      async navigateBack() {
        await this.$store.dispatch('tagsView/delView', this.tempRoute)
        this.$router.back()
      },
      setTagsViewTitle() {
        const title = '分配菜单'
        const route = Object.assign({}, this.tempRoute, { title: `${title} - ${this.id}` })
        this.$store.dispatch('tagsView/updateVisitedView', route)
      },
      setPageTitle() {
        const title = '分配菜单'
        document.title = `${title} - ${this.id}`
      },
    },
    components: {
      FooterToolBar
    }
  }
</script>

<style lang="scss">

</style>