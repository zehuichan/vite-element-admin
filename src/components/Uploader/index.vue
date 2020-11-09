<template>
  <div class="uploader">
    <input ref="upload-input" class="upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">
    <el-button type="warning" icon="el-icon-upload2" @click="handleUpload">
      <slot>导入人员</slot>
    </el-button>
  </div>
</template>

<script>
  export default {
    name: 'Uploader',
    props: {
      beforeUpload: Function,
      onSuccess: Function,
    },
    methods: {
      handleUpload() {
        this.$refs['upload-input'].click()
      },
      handleClick(e) {
        const files = e.target.files
        const rawFile = files[0] // only use files[0]
        if (!rawFile) return
        this.upload(rawFile)
      },
      upload(rawFile) {
        this.$refs['upload-input'].value = null // fix can't select the same excel
        if (!this.beforeUpload) {
          this.readerData(rawFile)
          return
        }
        const before = this.beforeUpload(rawFile)
        if (before) {
          this.readerData(rawFile)
        }
      },
      readerData(rawFile) {
        return new Promise((resolve, reject) => {
          this.onSuccess && this.onSuccess(rawFile)
          resolve()
        })
      },
    }
  }
</script>

<style scoped>
  .uploader {
    display: inline-block;
    margin: 0 10px;
  }

  .upload-input {
    display: none;
    z-index: -9999;
  }
</style>