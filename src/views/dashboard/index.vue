<template>
  <div>
    <div class="app-container">
      <code>
        Dashboard
      </code>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  dicts: ['order_status'],
  created() {
    console.log(this.dict)
  }
}
</script>

<style lang="scss">

</style>
