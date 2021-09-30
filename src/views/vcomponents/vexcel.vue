<template>
  <demo-wrapper title="业务组件">
    <!--上传下载Excel-->
    <demo-section>
      <demo-card title="上传下载Excel">
        <demo-block title="v-excel-export前端导出excel">
          <v-excel-export
            type="warning"
            icon="el-icon-download"
            :filename="filename"
            :can-export="canExport"
            :t-header="tHeader"
            :t-body="tBody">前端导出excel
          </v-excel-export>
        </demo-block>
        <demo-block title="v-excel-upload前端上传excel数据转json">
          <v-excel-upload type="success" icon="el-icon-upload2" @success="onSuccess">上传Excel</v-excel-upload>
        </demo-block>
        <demo-block title="v-uploader前端原生上传">
          <v-uploader type="info" icon="el-icon-upload">原生上传</v-uploader>
        </demo-block>
      </demo-card>
      <demo-card style="width: 60%;">
        <demo-block title="template">
          <highlightjs language="html" :code="vexcel.template"/>
        </demo-block>
        <demo-block title="javascript">
          <highlightjs language="javascript" :code="vexcel.javascript"/>
        </demo-block>
      </demo-card>
    </demo-section>
  </demo-wrapper>
</template>

<script>
// mixins
import comp from './comp'
// code
import { vexcel } from './code'

export default {
  name: 'vexcel',
  mixins: [comp],
  data() {
    return {
      vexcel,
      tableData: [
        { name: 'John Brown', age: '32', address: 'New York No. 1 Lake Park', tags: ['NICE', 'DEVELOPER'] },
        { name: 'Jim Green', age: '42', address: 'London No. 1 Lake Park', tags: ['LOSER'] },
        { name: 'Joe Black', age: '32', address: 'Sidney No. 1 Lake Park', tags: ['COOL', 'TEACHER'] },
      ],

      filename: 'vtable',
      canExport: true,
      tHeader: ['Name', 'Age', 'Address', 'Tags'],
      tFilters: ['name', 'age', 'address', 'tags'],
      upload_data: []
    }
  },
  computed: {
    tBody() {
      return this.tableData.map(v => this.tFilters.map(j => {
        return v[j]
      }))
    }
  },
  methods: {
    onSuccess({ results, header }) {
      for (let i = 0; i < results.length; i++) {
        let each = results[i]
        each = this.transExcelRow(each)
        this.upload_data.push({
          name: each['Name'],
          age: each['Age'],
          address: each['Address'],
        })
      }
      console.log(this.upload_data)
    },
    transExcelRow(row) {
      const ret = {}
      for (const i in row) {
        ret[i.trim()] = row[i]
      }
      return ret
    },
  }
}
</script>