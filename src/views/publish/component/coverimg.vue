<template>
  <div>
    <div class="container" @click="openDialog">
      <p v-if="addpho">点击添加封面图片</p>
      <div v-if="preview">
        <img :src="value" alt="" class="cover-container">
      </div>
    </div>
    <el-dialog
      title="上传封面图片"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材管理" name="first">
          <img-list 
            :isAddOpr="false"
            isSelected
            ref="selectimg"
          />
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <input type="file" name="" ref="coverfile" @change="UploadCover">
          <div v-if="preview">
            <!-- <img :src="value" alt="" class="pre-img"> -->
            <img :src="preview" alt="" class="pre-img">
          </div>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="sendPhoto">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ImgList from '@/components/img-list'

export default {
  name: 'CoverImg',
  components: {
    ImgList
  },
  data() {
    return {
      dialogVisible: false,
      preview: '',
      addpho: true,
      activeName: 'second'
    }
  },
  props: ['value'],
  methods: {
    openDialog () {
      this.dialogVisible = true
      this.addpho = false
    },
    cancelDialog () {
      this.dialogVisible = false
      if (!this.preview) {
        this.addpho = true
      }
    },
    UploadCover () {
      const photo = this.$refs.coverfile.files[0]
      // console.log(photo)
      const blob = window.URL.createObjectURL(photo)
      this.preview = blob
    },
    sendPhoto () {
      if (this.activeName === 'second') {
        // const photo = this.$refs.coverfile.files[0]
        // if (!photo) {
        if (this.preview === '') {
          this.$message('请选择图片！')
          return
        }
        // 在这里发送图片请求
        this.dialogVisible = false

        // console.log(this.value)
        this.$emit('input', this.preview)
        // this.$emit('update-cover', this.preview)
      } else if (this.activeName === 'first') {
        const selectimg = this.$refs['selectimg']
        // console.log(selectimg.selected)
        if (selectimg.selected === null) {
          this.$message('请选择图片！')
          return
        }
        // 在这里发送图片请求
        this.preview = selectimg.images[selectimg.selected]
        // console.log(this.preview)
        
        this.dialogVisible = false
        this.$emit('input', this.preview)
      }

    }
  },
}
</script>

<style scoped lang="less">
.container {
  width: 182px;
  height: 182px;
  border: 1px solid #000;
}
.cover-container {
  width: 182px;
  height: 182px;
  // border: 1px solid #000;
}
.pre-img {
  width: 182px;
  height: 182px;
  // border: 1px solid #000;
}
</style>