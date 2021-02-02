export const dialog = {
  template: `
    <el-button type="primary" @click="showDialog = true">打开dialog</el-button>
    
    <v-dialog v-model="showDialog" title="v-dialog">
      #默认插槽
    </v-dialog>
  `,
  javascript: `
  export default {
    data() {
      return {
        showDialog: false
      }
    },
  }
  `
}

export const drawer = {
  template: `
    <el-button type="primary" @click="showDrawer = true">打开drawer</el-button>
    
    <v-drawer v-model="showDrawer" title="v-drwaer" size="600px">
      #默认插槽
    </v-drawer>
  `,
  javascript: `
  export default {
    data() {
      return {
        showDrawer: false
      }
    },
  }
  `
}