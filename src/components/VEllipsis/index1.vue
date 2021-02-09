<template>
  <div class="v-ellipsis">
    <div v-if="ellipsis" :class="className">
      <slot/>
    </div>
    <div v-else>
      <slot/>
    </div>
    <el-button type="text" @click="ellipsis = !ellipsis">{{ellipsis ? '展开' : '收起'}}</el-button>
  </div>
</template>

<script>
  export default {
    name: 'VEllipsis',
    props: {
      clamp: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        ellipsis: true
      }
    },
    computed: {
      className() {
        return this.ellipsis && this.clamp > 1 ? `multi-ellipsis--l${this.clamp}` : 'ellipsis'
      }
    },
  }
</script>

<style scoped>
  .v-ellipsis {
    display: flex;
    align-items: center;
  }
</style>