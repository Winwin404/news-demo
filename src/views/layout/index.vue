<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
      <app-aside 
        class="nav-aside"
        :is-collapse="isCollapse"
      />
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i 
            :class="{
              'el-icon-s-fold' : isCollapse,
              'el-icon-s-unfold' : !isCollapse
            }"
            @click="isCollapse = !isCollapse"
          > </i>
          <span>News Publish 后台发布系统</span>  
        </div>
        <el-dropdown>
          <div class="avatar-div">
            <img 
            class="avatar"
            :src="user.photo" alt="">
            <span>{{ user.name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-s-tools">settings</el-dropdown-item>
            <el-dropdown-item 
              icon="el-icon-circle-close"
              @click.native="onLogout">
              logout
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './aside'
import { getUserProfile } from '@/api/user' //接口已弃用，使用静态数据代替
import GlobalBus from '@/utils/global-bus'

  export default {
    name : 'LayoutIndex',
    data() {
      return {
        // 存储接口请求到的用户数据
        user : {},
        isCollapse : true
      }
    },
    components:{
      AppAside
    },
    created() {
      this.getUserInfo(),
      GlobalBus.$on('UploadUserP', data => {
        this.user.photo = data
      })
       GlobalBus.$on('UploadUserN', data => {
        this.user.name = data
      })
    },
    methods: {
      getUserInfo(){
        getUserProfile().then( res => {
          // console.log(res);
          this.user = res.data.data
        }).catch( err => {
          console.log(err);
        })
        // this.user = {
        //   name : 'rainbow',
        //   photo : 'https://i1.hdslb.com/bfs/face/d3fcf91a8988285fe19b47e8cd29bfe9d06cf27b.jpg@140w_140h_1c.webp'
        // }
      },
      onLogout () {
        this.$confirm('此操作将退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.localStorage.removeItem('user')
          this.$router.push('login')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出登录'
          })
        })
      }
    }
  }
</script>

<style scoped lang="less">
.layout-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.aside {
  background-color: rgb(172, 171, 171);
  .nav-aside {
    height: 100%;
  }
}
.header {
  border-bottom: 1px solid rgb(216, 211, 211);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .avatar-div {
    display: flex;
    align-items: center;
    .avatar{
      height: 40px;
      width: 40px;
      border-radius: 50%;
      margin-right: 8px;
    }
  }
  i{
    font-size: 20px;
    margin-right: 8px;
  }
}
// .main {
//   // background-color: rgb(231, 227, 227);
// }
</style>