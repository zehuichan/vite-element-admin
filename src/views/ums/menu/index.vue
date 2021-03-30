<template>
  <div>
    <div class="app-header">
      <el-page-header @back="goBack" :content="$route.meta.title"/>
    </div>
    <div class="app-container">
      <el-form ref="dataForm" :model="dataForm" label-width="110px">
        <el-form-item label="菜单名称：" prop="name" required>
          <el-input v-model="dataForm.name"/>
        </el-form-item>
        <el-form-item label="父级菜单：" prop="name" required>
          <v-tree-select v-model="dataForm.name" :options="options" placeholder="父级菜单"/>
        </el-form-item>
        <el-form-item label="唯一识别码：" prop="name" required>
          <el-input v-model="dataForm.name"/>
          <div class="tips">
            <i class="el-icon-warning"></i>系统内部权限逻辑验证使用
          </div>
        </el-form-item>
        <el-form-item label="跳转路径：" prop="name" required>
          <el-input v-model="dataForm.name"/>
        </el-form-item>
        <el-form-item label="ICON：" prop="icon" required>
          <v-icon-select v-model="dataForm.icon" placeholder="请选择" clearable/>
          <div class="tips">
            <i class="el-icon-warning"></i>图标参考element-ui官网
          </div>
        </el-form-item>
        <el-form-item label="排序：" prop="name" required>
          <el-input v-model="dataForm.name"/>
        </el-form-item>
        <el-form-item label="状态：" prop="name" required>
          <el-radio-group v-model="dataForm.name">
            <el-radio :label="3">正常</el-radio>
            <el-radio :label="6">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单功能：" prop="name">
          <el-table border :data="functions" style="width: 100%">
            <el-table-column type="index" label="#" width="50"/>
            <el-table-column prop="code" label="标识码">
              <template slot-scope="scope">
                <el-input v-if="scope.row.edit" v-model="scope.row.code" placeholder="标识码" size="small" clearable/>
                <span v-else>{{ scope.row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="action" label="操作名称">
              <template slot-scope="scope">
                <el-input v-if="scope.row.edit" v-model="scope.row.action" placeholder="操作名称" size="small" clearable/>
                <span v-else>{{ scope.row.action }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="desc" label="描述">
              <template slot-scope="scope">
                <el-input v-if="scope.row.edit" v-model="scope.row.desc" placeholder="描述" size="small" clearable/>
                <span v-else>{{ scope.row.desc }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button v-if="!scope.row.edit" type="text" @click="onAction('edit', scope.row)">编辑</el-button>
                <el-button v-else type="text" @click="onAction('save', scope.row)">保存</el-button>
                <el-divider direction="vertical"/>
                <el-button type="text" @click="onAction('delete', scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="add-foundation">
            <el-button type="danger" @click="onAction('add')">添加菜单功能</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <v-footer-tool-bar>
      <el-button type="default">取消</el-button>
      <el-button type="primary">确认保存</el-button>
    </v-footer-tool-bar>
  </div>
</template>

<script>
  export default {
    name: 'Menu',
    data() {
      return {
        dataForm: {},
        functions: [
          { edit: false, code: 'YWRk', action: 'add', desc: '新增' },
          { edit: false, code: 'ZGVsZXRl', action: 'delete', desc: '删除' },
          { edit: false, code: 'ZWRpdA==', action: 'edit', desc: '修改' },
          { edit: false, code: 'cXVlcnk=', action: 'query', desc: '查询' },
          { edit: false, code: 'aW1wb3J0', action: 'import', desc: '导入' },
          { edit: false, code: 'ZXhwb3J0', action: 'export', desc: '导出' },
        ],
        options: [
          {
            id: 1,
            label: '一级 1',
            children: [
              {
                id: 4,
                label: '二级 1-1'
              }
            ]
          },
          {
            id: 2,
            label: '一级 2',
            children: [
              {
                id: 5,
                label: '二级 2-1'
              },
              {
                id: 6,
                label: '二级 2-2'
              }
            ]
          },
          {
            id: 3,
            label: '一级 3',
            children: [
              {
                id: 7,
                label: '二级 3-1'
              },
              {
                id: 8,
                label: '二级 3-2'
              }
            ]
          }
        ]
      }
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      onAction(type, row) {
        switch (type) {
          case 'add':
            this.functions.push({
              edit: true,
              code: '',
              action: '',
              desc: '',
            })
            break
          case 'edit':
            row.edit = !row.edit
            break
          case 'save':
            row.edit = false
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            break
          case 'delete':
            this.functions.splice(this.functions.indexOf(row), 1)
            break
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .tips {
    font-size: 13px;
    color: #999;

    .el-icon-warning {
      color: #409EFF;
      padding-right: 5px;
    }
  }

  .add-foundation {
    margin-top: 12px;
  }

  .ico {
    display: block;
    font-size: 18px;
    color: #409EFF;
    transition: color .15s linear;
  }
</style>
