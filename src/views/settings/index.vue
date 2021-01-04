<template>
  <div class="settings-container">
    <el-card class="filter-card">
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col :span="14">
          <el-form :model="user" label-width="80px">
            <el-form-item label="编号:">
              {{user.id}}
            </el-form-item>
            <el-form-item label="手机号码:">
              {{user.mobile}}
            </el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input type="textarea" v-model="user.desc"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
          </el-form>
          <el-button 
            type="primary" 
            @click="onUploadinfo"
          >
          保存
          </el-button>
        </el-col>
        <el-col :span="6" :offset="2">
          <label for="pic">
            <el-avatar 
              shape="square" 
              :size="150" 
              fit="cover" 
              :src="previewURL"
            >
            </el-avatar>
            <p>点击上传图片</p>
          </label>
          <input type="file" ref="file" id="pic" hidden @change="onChange">
        </el-col>
      </el-row>
    </el-card>
    <el-dialog
      title="上传图片"
      :visible.sync="dialogVisible"
      append-to-body
      @opened="onDailogOpend"
      @closed="onDailogClosed"
    >
      <div class="preview-container">
        <img 
          class="preview-im g"
          :src="previewURL"
          ref="preview-img"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button 
          type="primary" 
          @click="onUploadphoto"
        >
        确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import GlobalBus from '@/utils/global-bus'

  export default {
    name : 'SettingsIndex',
    data() {
      return {
        user: {
          id: '',
          mobile: '',
          name: '',
          desc: 'have fun !!!',
          email: '2400000@qq.com'
        },
        dialogVisible: false, //控制图片弹出层
        previewURL: '',  // 预览图片
        cropper: null
      }
    },
    methods: {
      loadUserinfo () {
        getUserProfile().then( data => {
          this.user = data.data.data
          // console.log(this.user)
        })
      },
      onChange () {
        // 展示弹出层，预览图片
        this.dialogVisible = true
        
        // console.log(this.$refs.file.files[0])
        //处于图片预览
        const file = this.$refs.file
        const blobdata = window.URL.createObjectURL(file.files[0])
        // console.log(blobdata)
        this.previewURL = blobdata

        // 解决选择相同文件不触发 change 事件的问题
        this.$refs.file.value = ''
      },
      onDailogOpend () {
        const image = this.$refs['preview-img']
        // const image = document.getElementById('image');

        // 第一次初始化 裁剪器 后，裁剪器 内部的裁剪图片不会自动更新，必须手动更新
        // 方法一：定义全局 data，有 croppper 实例就使用 replace 方法进行替换
        if (this.cropper) {
          this.cropper.replace(this.previewURL)
          return
        }
        this.cropper = new Cropper(image, {
          aspectRatio: 1,
          dragMode: 'none'
        })
      },
      onDailogClosed () {
        // 方法二：对话框关闭，销毁裁剪器，防止出现同文件无法加载的问题
        // this.cropper.destroy()
      },
      onUploadphoto () {
        // 获取裁剪对象
        this.cropper.getCroppedCanvas().toBlob( file => {
          // console.log(file)

          const formData = new FormData()
          // Pass the image file name as the third parameter if necessary.
          formData.append('croppedImage', file/*, 'example.png' */)

          this.previewURL = window.URL.createObjectURL(file)
          console.log(this.previewURL);

          this.dialogVisible = false

          GlobalBus.$emit('UploadUserP', this.previewURL )
          // Use `jQuery.ajax` method for example
          // $.ajax('/path/to/upload', {
          //   method: 'POST',
          //   data: formData,
          //   processData: false,
          //   contentType: false,
          //   success() {
          //     console.log('Upload success');
          //   },
          //   error() {
          //     console.log('Upload error');
          //   }
          // })

        }/*, 'image/png' */)
      },
      onUploadinfo () {
        console.log('保存信息')
        GlobalBus.$emit('UploadUserN', this.user.name )
      }
    },
    created() {
      this.loadUserinfo()
    },
  }
</script>

<style scoped lang="less">
.preview-container {
  .preview-img {
    display: block;
    /* This rule is very important, please don't ignore this */
    max-width: 100%;
    height: 200px;
  }
}
</style>