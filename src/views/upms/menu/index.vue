<template>
  <div>
    <el-container class="app-container">
      <el-aside>
        <div style="margin-bottom: 16px;">
          <el-button v-if="!state" type="primary" plain icon="el-icon-s-unfold" @click="toggle(true)">全部展开</el-button>
          <el-button v-else type="primary" plain icon="el-icon-s-fold" @click="toggle(false)">全部收起</el-button>
        </div>
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText"
          suffix-icon="el-icon-search"
        />
        <el-tree
          class="filter-tree"
          ref="tree"
          :data="data"
          node-key="id"
          :props="defaultProps"
          highlight-current
          default-expand-all
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          @node-click="nodeClick"
        />
      </el-aside>
      <el-main class="menu-card">
        <div class="menu-card__header">
          <i class="el-icon-edit"></i> 编辑菜单
        </div>
        <div class="menu-card__body">
          <el-alert
            title="从菜单列表选择一项后，进行编辑"
            type="info"
            show-icon
          />
          <el-form ref="form" :model="form" label-position="right" label-width="80px">
            <el-form-item label="类型">侧边栏菜单</el-form-item>
            <el-form-item label="标题" required>
              <el-input v-model="form.title" placeholder="标题" />
            </el-form-item>
            <el-form-item label="副标题">
              <el-input v-model="form.name" placeholder="副标题" />
            </el-form-item>
            <el-form-item label="路径" required>
              <el-input v-model="form.path" placeholder="路径" />
            </el-form-item>
            <el-form-item label="前端资源" required>
              <el-input v-model="form.component" placeholder="前端资源" />
            </el-form-item>
            <el-form-item label="图标">
              <el-input v-model="form.icon" placeholder="图标" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary">保存修改</el-button>
              <el-button>重置</el-button>
              <el-button>删除</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// api
import { menus } from '@/api/upms'
import { listToTree } from '@/utils/treeHelper'

export default {
  name: 'Menu',
  data() {
    return {
      filterText: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      state: false,
      form: {
        title: '',
        name: '',
        path: '',
        component: '',
        icon: ''
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      try {
        const res = await menus({ pageNumber: 1, pageSize: 99999 })
        this.data = listToTree(res.data.list, { pid: 'upid' })
      } catch (e) {

      }
    },
    toggle(state) {
      this.state = state
      this.$refs.tree.store._getAllNodes().forEach(item => {
        item.expanded = state
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.title.indexOf(value) !== -1
    },
    nodeClick(data) {
      console.log(data)
      this.form.title = data.title
      this.form.name = data.name
      this.form.path = data.path
      this.form.component = data.component
      this.form.icon = data.icon
    }
  }
}
</script>

<style lang="scss">
.filter-tree {
  margin-top: 16px;
}

.menu-card {
  padding: 0 0 0 16px;
}

.menu-card__header {
  height: 33px;
  line-height: 33px;
  font-size: 14px;
  margin-bottom: 16px;
}

.menu-card__body {
  .el-alert {
    font-size: 12px;
    line-height: 1;
    padding: 7px 16px;
    margin-bottom: 16px;
  }
}
</style>
