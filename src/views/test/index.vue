<template>
  <div class="app-container">
    <code>permissions: {{$store.getters.permissions}}</code>
    <code>path: {{$route.path}}</code>
    <code>{{$route.meta}}</code>
  </div>
</template>

<script>
  export default {
  }
</script>

<style scoped>

</style>