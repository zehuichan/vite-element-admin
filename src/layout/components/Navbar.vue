<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar"/>
    <breadcrumb class="breadcrumb-container"/>

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <lang-select class="right-menu-item hover-effect"/>
      </template>

      <el-dropdown class="avatar-container" size="medium" trigger="hover">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar" alt="">
          <span class="user-name">{{name}}</span>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
          </router-link>
          <el-dropdown-item icon="el-icon-switch-button" divided @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  // vuex
  import {mapGetters} from 'vuex'
  // components
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import LangSelect from '@/components/LangSelect'

  export default {
    components: {
      Breadcrumb,
      Hamburger,
      LangSelect
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar',
        'name',
        'device'
      ])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar', !this.sidebar.opened)
      },
      toggleSideBar2() {
        this.$store.dispatch('app/openSideBar', {withoutAnimation: true})
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      float: right;
      height: 100%;
      display: flex;
      align-items: center;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 16px;
        height: 100%;
        line-height: 50px;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;
        cursor: pointer;

        .avatar-wrapper {
          position: relative;
          display: flex;
          align-items: center;

          .user-avatar {
            width: 24px;
            height: 24px;
            border-radius: 2px;
            margin-right: 8px;
            margin-left: 8px;
          }

          .user-name {

          }
        }
      }
    }
  }
</style>
