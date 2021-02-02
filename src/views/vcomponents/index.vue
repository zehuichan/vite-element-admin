<template>
  <div class="v-components">
    <h1>业务组件</h1>
    <demo-card title="v-search">
      <v-search v-model="searchForm" :options="search.options">
        <template #tools>
          自定义额外插槽 #tools
        </template>
      </v-search>
    </demo-card>
    <demo-card title="v-table">
      <v-table
        :loading="loading"
        :data="table.data"
        :columns="table.columns"
        :total="total"
        :page.sync="query.page"
        :limit.sync="query.limit"
      >
        <template #toolbar-title>
          插槽#toolbar-title
        </template>
        <template #toolbar-space>
          插槽#toolbar-space
        </template>
        <template #selection>
          <el-table-column type="selection" width="55"/>
        </template>
        <template #tags="{scope}">
          <el-tag v-for="tag in scope.row.tags" :key="tag" :type="tag.length > 5 ? 'warning' : 'success'">
            {{tag}}
          </el-tag>
        </template>
        <template #action="{scope}">
          <el-button type="text">Invite</el-button>
          <el-button type="text">Delete</el-button>
        </template>
      </v-table>
    </demo-card>
    <demo-card title="v-form">
      <div class="clearfix">
        <v-form class="fl" v-model="dataForm" :options="form" label-position="right" label-width="80px">
          <template #custom="{scope}">
            <el-image lazy fit="contain" style="width: 100px; height: 100px">
              <div slot="placeholder" class="image-slot">
                <i class="el-icon-loading"></i>
              </div>
            </el-image>
            {{scope}}
          </template>
        </v-form>
        <code class="fl" style="width: 657px;height: 657px;margin-left: 20px;">
          {{dataForm}}
        </code>
      </div>
    </demo-card>
    <demo-card title="v-dialog">
      <el-button type="primary" @click="showDialog = true">打开dialog</el-button>
    </demo-card>
    <demo-card title="v-drawer">
      <el-button type="primary" @click="showDrawer = true">打开drawer</el-button>
    </demo-card>
    <demo-card title="上传下载Excel">
      <demo-block title="v-excel-export前端导出excel">
        <v-excel-export type="warning" icon="el-icon-upload2">前端导出excel</v-excel-export>
      </demo-block>
      <demo-block title="v-excel-upload前端上传excel数据转json">
        <v-excel-upload type="success" icon="el-icon-download" :on-success="onSuccess"/>
      </demo-block>
      <demo-block title="v-uploader前端原生上传">
        <v-uploader type="info" icon="el-icon-upload"/>
      </demo-block>
    </demo-card>
    <h1>展示组件</h1>
    <demo-card title="v-badge">
      <v-badge/>
      <v-badge status="error"/>
      <v-badge status="default"/>
      <v-badge status="processing"/>
      <v-badge status="warning"/>
      <br/>
      <v-badge>Success</v-badge>
      <br/>
      <v-badge status="error">Error</v-badge>
      <br/>
      <v-badge status="default">Default</v-badge>
      <br/>
      <v-badge status="processing">Processing</v-badge>
      <br/>
      <v-badge status="warning">Warning</v-badge>
      <br/>
      <v-badge color="#f50">Custom #f50</v-badge>
      <br/>
      <v-badge color="#2db7f5">Custom #2db7f5</v-badge>
      <br/>
      <v-badge color="#87d068">Custom #87d068</v-badge>
      <br/>
      <v-badge color="#108ee9">Custom #108ee9</v-badge>
    </demo-card>
    <demo-card title="v-count-down">
      <demo-block title="毫秒级渲染">
        <v-count-down millisecond :time="time" format="HH:mm:ss:SS"/>
      </demo-block>
      <demo-block title="自定义样式">
        <v-count-down :time="time">
          <template #default="{timeData}">
            <span class="block">{{ timeData.hours | padStart }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.minutes | padStart }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.seconds | padStart }}</span>
          </template>
        </v-count-down>
      </demo-block>
    </demo-card>
    <demo-card title="v-descriptions">
      <v-descriptions :data="descriptions.data" :columns="descriptions.columns">
        <template #custom>
          自定义插槽
        </template>
      </v-descriptions>
    </demo-card>
    <h1>未完待续...</h1>
    <v-footer-tool-bar>
      <template #extra>
        权限指令v-action
      </template>
      <el-button type="default" v-action:add>新增 v-action:add</el-button>
      <el-button type="primary" v-action:delete>删除 v-action:delete</el-button>
      <el-button type="success" v-action:edit>修改 v-action:edit</el-button>
      <el-button type="info" v-action:query>查询 v-action:query</el-button>
      <el-button type="warning" v-action:import>导入 v-action:import</el-button>
      <el-button type="danger" v-action:export>导出 v-action:export</el-button>
    </v-footer-tool-bar>
    <v-dialog v-model="showDialog" title="v-dialog">
      <demo-block title="template">
        <code>
          {{dialog.template}}
        </code>
      </demo-block>
      <demo-block title="javascript">
        <code>
          {{dialog.javascript}}
        </code>
      </demo-block>
    </v-dialog>
    <v-drawer v-model="showDrawer" title="v-drawer" size="600px">
      <demo-block title="template">
        <code>
          {{drawer.template}}
        </code>
      </demo-block>
      <demo-block title="javascript">
        <code>
          {{drawer.javascript}}
        </code>
      </demo-block>
    </v-drawer>
  </div>
</template>

<script>
  // components
  import DemoCard from './components/DemoCard'
  import DemoBlock from './components/DemoBlock'
  // mapping
  import {search, table, form, descriptions} from './mapping'
  // code
  import {dialog, drawer} from './code'

  export default {
    name: 'vcomponents',

    data() {
      return {
        time: 30 * 60 * 60 * 1000,
        search,
        table,
        form,
        descriptions,

        // code
        dialog,
        drawer,

        searchForm: {},
        dataForm: {},
        loading: false,
        total: 1,
        query: {
          page: 1,
          limit: 10
        },
        upload_data: [],
        showDialog: false,
        showDrawer: false,
      }
    },
    methods: {
      onSuccess({ results, header }) {
        for (let i = 0; i < results.length; i++) {
          let each = results[i]
          each = this.transExcelRow(each)
          this.upload_data.push({
            deliveryNumber: each['快递单号'],
            expressCompanyId: 1,
            orderId: each['订单号']
          })
        }
      },
      transExcelRow(row) {
        const ret = {}
        for (const i in row) {
          ret[i.trim()] = row[i]
        }
        return ret
      },
    },
    components: {
      DemoCard,
      DemoBlock,
    }
  }
</script>

<style lang="scss">
  body {
    background-color: #f5f5f5;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    color: #323233;
    font-weight: normal;
    line-height: 1.5;
  }

  h1 {
    margin: 0 0 30px;
    font-size: 30px;
    cursor: default;
  }

  h3 {
    margin-bottom: 16px;
    font-weight: 600;
    font-size: 18px;
  }

  .v-components {
    padding: 30px;
    overflow: hidden;

    .colon {
      display: inline-block;
      margin: 0 4px;
      color: #001529;
    }

    .block {
      display: inline-block;
      width: 22px;
      color: #fff;
      font-size: 12px;
      text-align: center;
      background-color: #001529;
    }

    .el-tag + .el-tag {
      margin-left: 8px;
    }
  }
</style>