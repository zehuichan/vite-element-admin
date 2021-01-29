<template>
  <div class="error-page">
    <div class="cont">
      <div class="title">401</div>
      <div class="info">抱歉，你没有权限访问该页面</div>
      <div class="button-wrapper">
        <el-button type="primary" size="mini" @click="$router.push('/')">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Page401'
  }
</script>
