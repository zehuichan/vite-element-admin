<template>
  <div class="error-page">
    <div class="title">500</div>
    <div class="info">抱歉，服务器出错了</div>
    <div class="button-wrapper">
      <el-button type="primary" size="mini" @click="$router.push('/')">返回首页</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Page500'
  }
</script>

<style lang="scss" scoped>

</style>
