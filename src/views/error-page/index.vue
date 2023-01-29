<template>
  <div>ErrorPage</div>
</template>

<script>
export default {
  name: 'ErrorPage'
}
</script>

<style lang="scss">
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #fff;

  .cont {
    text-align: center;
  }

  .title {
    color: #434e59;
    font-size: 72px;
    font-weight: 600;
    line-height: 72px;
    margin-bottom: 24px;
  }

  .info {
    color: rgb(0 0 0 / 45%);
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 16px;
  }
}
</style>
