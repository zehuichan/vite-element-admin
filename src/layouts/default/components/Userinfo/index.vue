<template>
  <el-dropdown class="navbar-action__item avatar-container" size="default" trigger="click">
    <div class="avatar-wrapper">
      <img :src="userInfo?.avatar" class="user-avatar" alt="">
      <span class="user-name">{{ userInfo?.username }}</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu class="user-dropdown">
        <el-dropdown-item icon="el-icon-warning">帮助</el-dropdown-item>
        <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
        <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
        <el-dropdown-item icon="el-icon-switch-button" divided @click.native="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { computed, defineComponent } from 'vue'

import { useStore } from '@/store'
import { useRoute, useRouter } from '@/router'

export default defineComponent({
  name: 'Userinfo',
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const userInfo = computed(() => store.getters.userInfo)

    function logout() {
      store.dispatch('user/logout')
      router.push(`/login?redirect=${route.fullPath}`)
    }

    return {
      userInfo,
      logout
    }
  }
})
</script>

<style lang="scss">
.avatar-container {
  overflow: hidden;
  font-size: 12px;
  cursor: pointer;

  .avatar-wrapper {
    display: flex;
    align-items: center;
  }

  .user-avatar {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }

  .user-name {
    font-size: 14px;
  }
}
</style>
