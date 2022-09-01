<template>
  <div>
    <div class="app-container">
      <code>
        新增媒体查询，当前屏幕
      </code>
    </div>
    <div class="app-container">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </div>
    <div class="app-container">
      <el-row :gutter="10">
        <el-col :xs="12" :sm="12" :md="8" v-for="(item,index) in media_query" :key="index">
          <div class="box">
            {{ item.key }}
            <div class="value">{{ item.label }}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Documentation',
  data() {
    return {
      media_query: [
        { key: 'screen-xs', label: 'maxWidth: 575' },
        { key: 'screen-sm', label: 'minWidth: 576, maxWidth: 767' },
        { key: 'screen-md', label: 'minWidth: 768, maxWidth: 991' },
        { key: 'screen-lg', label: 'minWidth: 992, maxWidth: 1199' },
        { key: 'screen-xl', label: 'minWidth: 1200, maxWidth: 1599' },
        { key: 'screen-xll', label: 'minWidth: 1600' }
      ],
      input: ''
    }
  },
}
</script>

<style lang="scss">
.box {
  position: relative;
  border-radius: 2px;
  padding: 20px;
  margin-bottom: 10px;
  height: 74px;
  box-sizing: border-box;
  color: #fff;
  font-size: 14px;
  background-color: #141414;

  .value {
    font-size: 12px;
    opacity: .69;
    line-height: 24px;
  }
}
</style>
