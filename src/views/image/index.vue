<template>
  <div class="image-container">
    <el-card class="filter-card">
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="opr-button">
        <el-radio-group 
          v-model="collection" 
          size="mini" 
          @change="onChangeCollection(collection)"
        >
          <el-radio-button label=false>全部</el-radio-button>
          <el-radio-button label=true>收藏</el-radio-button>
        </el-radio-group>  
        <el-button 
          size="mini" 
          type="success"
          @click="onUploadimage"
        >
          上传素材
        </el-button>
      </div>
      <img-list />
    </el-card>
    <el-dialog
      title="上传素材"
      :visible.sync="centerDialogVisible"
      :append-to-body="true"
      width="40%"
      center>
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import ImgList from '@/components/img-list'

  export default {
  name : 'ImageIndex',
  components: {
    ImgList
  },
  data() {
    return {
      collection: false,
      centerDialogVisible: false,
    }
  },
  methods: {
    onChangeCollection ( collection ) {
      console.log(collection);
      // 需要注意radio 的lable 加引号 绑定的值 是文本 。。。。，不加引号绑定的是 布尔值
      // if (collection === "true") {
      if (collection ) {
        console.log('null!!!');
      }
    },
    onUploadimage () {
      this.centerDialogVisible = true
    },
  },
  }
</script>

<style scoped lang="less">
.opr-button {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
</style>