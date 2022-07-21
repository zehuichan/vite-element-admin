<template>
  <div>
    <div class="app-container">
      <code>Dashboard</code>
    </div>
    <div class="app-container">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      input: ''
    }
  }
}
</script>

<style lang="scss">

</style>
