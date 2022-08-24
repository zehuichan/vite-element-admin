<template>
  <div>
    <div class="navbar-action__item" @click="visible = true">
      <i class="el-icon-setting" />
    </div>
    <el-drawer size="260px" :withHeader="false" :append-to-body="true" :visible.sync="visible">
      <div class="drawer-container">
        <h3 class="drawer-title">系统布局配置</h3>
        <div class="drawer-item">
          <span>开启 Tags-View</span>
          <el-switch v-model="tagsView" class="drawer-switch" />
        </div>
        <div class="drawer-item">
          <span>固定 Header</span>
          <el-switch v-model="fixedHeader" class="drawer-switch" />
        </div>
        <div class="drawer-item">
          <span>侧边栏 Logo</span>
          <el-switch v-model="sidebarLogo" class="drawer-switch" />
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  name: 'Settings',
  setup() {
    const store = useStore()

    const visible = ref(false)

    const fixedHeader = computed({
      get() {
        return store.state.settings.fixedHeader
      },
      set(val) {
        store.dispatch('settings/changeSetting', {
          key: 'fixedHeader',
          value: val
        })
      }
    })

    const tagsView = computed({
      get() {
        return store.state.settings.tagsView
      },
      set(val) {
        store.dispatch('settings/changeSetting', {
          key: 'tagsView',
          value: val
        })
      }
    })

    const sidebarLogo = computed({
      get() {
        return store.state.settings.sidebarLogo
      },
      set(val) {
        store.dispatch('settings/changeSetting', {
          key: 'sidebarLogo',
          value: val
        })
      }
    })

    return {
      visible,
      fixedHeader,
      tagsView,
      sidebarLogo
    }
  }
})
</script>

<style lang="scss">
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }
}
</style>