<template>
  <div>
    <div class="basic-layout-navbar-action__item" @click="visible = true">
      <i class="el-icon-setting" />
    </div>
    <el-drawer size="260px" :withHeader="false" :append-to-body="true" :visible.sync="visible">
      <div class="drawer-container">
        <h3 class="drawer-title">布局配置</h3>
        <div class="drawer-item">
          <span>开启 Tags-View</span>
          <el-switch v-model="tagsView" class="drawer-switch" />
        </div>
        <div class="drawer-item">
          <span>固定 Header</span>
          <el-switch v-model="fixedHeader" class="drawer-switch" />
        </div>
        <h3 class="drawer-title">界面功能</h3>
        <div class="drawer-item">
          <span>搜索</span>
          <el-switch v-model="search" class="drawer-switch" />
        </div>
        <div class="drawer-item">
          <span>全屏</span>
          <el-switch v-model="fullscreen" class="drawer-switch" />
        </div>
        <div class="drawer-item">
          <span>消息</span>
          <el-switch v-model="notice" class="drawer-switch" />
        </div>
        <div class="drawer-item">
          <span>设置</span>
          <el-switch v-model="setting" class="drawer-switch" />
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'

import { useHeaderSetting } from '@/hooks/useHeaderSetting'
import { useMultipleTabSetting } from '@/hooks/useMultipleTabSetting'

export default defineComponent({
  name: 'Settings',
  setup() {
    const {
      setHeaderSetting,
      getFixed,
      getShowSearch,
      getShowFullScreen,
      getShowNotice,
      getShowSetting
    } = useHeaderSetting()
    const { setMultipleTabSetting, getShowMultipleTab } = useMultipleTabSetting()

    const visible = ref(false)

    const fixedHeader = computed({
      get() {
        return getFixed.value
      },
      set(val) {
        setHeaderSetting({
          fixed: val
        })
      }
    })

    const tagsView = computed({
      get() {
        return getShowMultipleTab.value
      },
      set(val) {
        setMultipleTabSetting({
          show: val
        })
      }
    })

    const search = computed({
      get() {
        return getShowSearch.value
      },
      set(val) {
        setHeaderSetting({
          showSearch: val
        })
      }
    })

    const fullscreen = computed({
      get() {
        return getShowFullScreen.value
      },
      set(val) {
        setHeaderSetting({
          showFullScreen: val
        })
      }
    })

    const notice = computed({
      get() {
        return getShowNotice.value
      },
      set(val) {
        setHeaderSetting({
          showNotice: val
        })
      }
    })

    const setting = computed({
      get() {
        return getShowSetting.value
      },
      set(val) {
        setHeaderSetting({
          showSetting: val
        })
      }
    })

    return {
      visible,
      fixedHeader,
      tagsView,
      search,
      fullscreen,
      notice,
      setting
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
