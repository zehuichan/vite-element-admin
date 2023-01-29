<template>
  <div class="basic-layout-navbar">
    <div class="basic-layout-navbar-left">
      <trigger />
      <breadcrumb v-if="getShowBreadCrumb" />
    </div>
    <div class="basic-layout-navbar-action">
      <search v-if="getShowSearch" />
      <screenfull v-if="getShowFullScreen" />
      <notify v-if="getShowNotice" />
      <userinfo />
      <settings v-if="getShowSetting" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import { useRootSetting } from '@/hooks/useRootSetting'
import { useHeaderSetting } from '@/hooks/useHeaderSetting'

import Breadcrumb from './breadcrumb.vue'
import Notify from './notify.vue'
import Screenfull from './screenfull.vue'
import Userinfo from './userinfo.vue'
import Settings from './settings.vue'
import Search from './search.vue'
import Trigger from './trigger.vue'


export default defineComponent({
  name: 'Navbar',
  components: {
    Breadcrumb,
    Notify,
    Screenfull,
    Userinfo,
    Settings,
    Search,
    Trigger
  },
  setup() {
    const { getShowBreadCrumb } = useRootSetting()
    const { getShowSearch, getShowFullScreen, getShowNotice, getShowSetting } = useHeaderSetting()

    return {
      getShowBreadCrumb,
      getShowSearch,
      getShowFullScreen,
      getShowNotice,
      getShowSetting
    }
  }
})
</script>

<style lang="scss">
.basic-layout-navbar {
  overflow: hidden;
  height: 48px;
  background-color: #fff;
  border-bottom: 1px solid #eee;

  &-left {
    float: left;
    display: flex;
    height: 100%;
    align-items: center;
  }

  &-action {
    float: right;
    display: flex;
    align-items: center;

    &__item {
      color: #000000d9;
      display: flex;
      height: 48px;
      padding: 0 10px;
      cursor: pointer;
      align-items: center;

      .el-icon {
        font-size: 16px;
      }

      &:hover {
        background-color: #f6f6f6;
      }
    }
  }
}
</style>
