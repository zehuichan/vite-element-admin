<template>
  <div>
    <div class="app-container">
      <code>
        新增媒体查询，当前屏幕
        {{query}}
      </code>
    </div>

    <div class="app-container">
      <el-row :gutter="10">
        <el-col :xs="12" :sm="12" :md="8" v-for="(item,index) in media_query" :key="index">
          <div class="box">
            {{item.key}}
            <div class="value">{{item.label}}</div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="app-container">
      <code>
        新增按钮权限指令 v-action
        栗子：{{ex}}
        通过api获取路由权限（菜单），记录到vuex中，根据当前用户所挂载的角色所拥有的按钮权限进行控制
      </code>
    </div>

    <div class="app-container">
      <el-row :gutter="10">
        <el-col :xs="12" :sm="12" :md="8" v-for="(item,index) in permission_enum" :key="index">
          <div class="box">
            {{item.key}}
            <div class="value">{{item.label}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  // vuex
  import {mapGetters} from 'vuex'
  // directives
  import action from '@/directive/action/index'

  export default {
    name: 'Documentation',
    data() {
      return {
        media_query: [
          {key: 'screen-xs', label: 'maxWidth: 575'},
          {key: 'screen-sm', label: 'minWidth: 576, maxWidth: 767'},
          {key: 'screen-md', label: 'minWidth: 768, maxWidth: 991'},
          {key: 'screen-lg', label: 'minWidth: 992, maxWidth: 1199'},
          {key: 'screen-xl', label: 'minWidth: 1200, maxWidth: 1599'},
          {key: 'screen-xll', label: 'minWidth: 1600'},
        ],
        permission_enum: [
          {key: 'v-action:add', label: 'desc: 新增'},
          {key: 'v-action:delete', label: 'desc: 删除'},
          {key: 'v-action:edit', label: 'desc: 修改'},
          {key: 'v-action:query', label: 'desc: 查询'},
          {key: 'v-action:get', label: 'desc: 详情'},
          {key: 'v-action:enable', label: 'desc: 启用'},
          {key: 'v-action:disable', label: 'desc: 禁用'},
          {key: 'v-action:import', label: 'desc: 导入'},
          {key: 'v-action:export', label: 'desc: 导出'}
        ],
        ex: '<tag-name v-action:add>新增</tag-name>'
      }
    },
    computed: {
      ...mapGetters([
        'query'
      ])
    },
    directives: {
      action
    }
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
