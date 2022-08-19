<template>
  <div class="navbar">
    <div class="navbar-left">
      <hamburger />
      <breadcrumb />
    </div>
    <div class="navbar-action">
      <search />
      <screenfull />
      <notify />
      <userinfo />
      <settings />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Breadcrumb from '../Breadcrumb/index.vue'
import Hamburger from '../Hamburger/index.vue'
import Notify from '../Notify/index.vue'
import Screenfull from '../Screenfull/index.vue'
import Userinfo from '../Userinfo/index.vue'
import Settings from '../Settings/index.vue'
import Search from '../Search/index.vue'

export default defineComponent({
  components: {
    Breadcrumb,
    Hamburger,
    Notify,
    Screenfull,
    Userinfo,
    Settings,
    Search
  }
})
</script>

<style lang="scss">
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background-color: #fff;
  border-bottom: 1px solid #eee;

  &-left {
    display: flex;
    height: 100%;
    align-items: center;
  }

  &-action {
    display: flex;
    align-items: center;

    &__item {
      color: #000000d9;
      display: flex;
      height: 48px;
      padding: 0 10px;
      cursor: pointer;
      align-items: center;

      &:hover {
        background-color: #f6f6f6;
      }
    }
  }
}
</style>
