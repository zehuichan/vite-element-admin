<template>
  <el-select class="v-icon-select2" filterable v-bind="$attrs" v-on="$listeners">
    <el-option
      v-for="item in icon"
      :key="item"
      :value="item"
      :label="item"
    >
      <div class="v-icon-select2__item">
        <i :class="classPrefix + item"></i>
        <span class="icon-name">{{item}}</span>
      </div>
    </el-option>
  </el-select>
</template>

<script>
  // utils
  import {debounce} from '@/utils'
  // json
  import icon from './icon.js'

  export default {
    name: 'VIconSelect2',
    props: {
      classPrefix: {
        type: String,
        default: 'el-icon-'
      },
    },
    data() {
      return {
        icon
      }
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .v-icon-select2 {
    position: relative;

  }

  .v-icon-select2__item {
    display: flex;
    justify-content: space-between;

    [class^="el-icon-"] {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 22px;
      transition: color .15s linear;
    }

    .icon-name {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
</style>