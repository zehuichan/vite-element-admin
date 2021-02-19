<template>
  <div class="v-components">
    <!--v-image-viewer-->
    <demo-section>
      <demo-card title="v-image-viewer">
        <el-button type="primary" @click="showViewer = true">大图展示</el-button>
        <demo-block>
          <p>el-image预览大图的功能抽离出来，可单独使用。</p>
          <p>相同api，方便使用。</p>
        </demo-block>
      </demo-card>
      <demo-card style="width: 1200px;">
        <demo-block title="template">
          <highlightjs language="html" :code="vimageviewer.template"/>
        </demo-block>
        <demo-block title="javascript">
          <highlightjs language="javascript" :code="vimageviewer.javascript"/>
        </demo-block>
      </demo-card>
    </demo-section>

    <v-image-viewer v-model="showViewer" :urlList="urlList"/>
  </div>
</template>

<script>
  // mixins
  import comp from './comp'
  // code
  import {vimageviewer} from './code'

  export default {
    name: 'vimageviewer',
    mixins: [comp],
    data() {
      return {
        vimageviewer,

        showViewer: false,
        urlList: [
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
        ],
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "./index.scss";
</style>