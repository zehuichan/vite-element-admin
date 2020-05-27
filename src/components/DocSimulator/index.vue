<template>
  <div class="doc-simulator">
    <iframe :src="src" frameborder="0" style="height: 700px;"></iframe>
  </div>
</template>

<script>
  export default {
    name: 'DocSimulator',
    props: {
      src: String
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .doc-simulator {
    box-sizing: border-box;
    width: 360px;
    min-width: 360px;
    overflow: hidden;
    background: #fafafa;
    border-radius: 8px;
    box-shadow:  0 4px 12px rgba(0, 0, 0, .19);

    iframe {
      display: block;
      width: 100%;
    }
  }
</style>