<template>
  <div class="login-container">
    <!-- ref用于表单验证的功能(rules 属性、ref、$refs) -->
    <div class="login-head">
      <div class="login-logo"></div>
    </div>
    <el-form class="login-form" ref="loginForm" :model="user" :rules="loginrules">
      <el-form-item prop="mobile">
        <el-input 
          v-model="user.mobile"
          placeholder="please enter your mobile number">
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input 
          v-model="user.code" 
          placeholder="please enter validate code"
          >
        </el-input>
      </el-form-item>
      <el-form-item prop="loginchecked">
        <el-checkbox v-model="user.loginchecked">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item >
        <el-button class="login-btn" type="primary" @click="onLogin()" :loading="loginloading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/user'

  export default {
    name : 'LoginIndex',
    data() {
      return {
        user : {
          mobile : '13060032380',
          code : '246810',
          loginchecked : false
        },
        loginloading : false,
        loginrules: {
          mobile: [
            {required: true, message: '手机号码不能为空', trigger: 'blur'},
            {pattern: /^1\d{10}$/, message: '手机号码格式有误', trigger: 'change'}
          ],
          code: [
            {required: true, message: '验证码不能为空', trigger: 'blur'},
            {pattern: /^\d{6}$/, message: '验证码格式有误', trigger: 'change'}
          ],
          loginchecked: [
            { 
              validator: (rule, value, callback) => {
                if (value) {
                  callback()
                } else {
                  callback(new Error('请同意用户协议'))
                }
              }, 
              trigger: 'change' 
            }
          ]
        }
      }
    },
    methods : {
      onLogin() {
        this.$refs['loginForm'].validate( valid => {
          if (valid) {
            this.login()
          } else {
            return
          }
        })
      },
      login () {
        this.loginloading = true

        login(this.user).then( res => {
          // console.log(res)
          window.localStorage.setItem('user', JSON.stringify(res.data.data))
          // 关闭 loading
          this.loginloading = false

          this.$message({
            message: '登录成功',
            type: 'success'
          });

          // 跳转到首页
          this.$router.push({
            name : 'home'
          })
          // this.$router.push('/')
        }).catch( err => {
          console.log('error', err)

          this.loginloading = false
          this.$message.error('登录失败，手机号或验证码错误！')
        })
      }
    }
  }
</script>

<style scoped lang="less">
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  background: url('./login_bg.jpg') no-repeat;
  background-size: cover; 

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .login-head {
    background: white;
    min-width: 340px;
    padding-top: 20px;
    .login-logo {
      background: url(./login_index.png) no-repeat;
      height: 60px;
      width: 209px;
      margin: 0 auto;
    }
  }

  .login-form {
    background: white;
    padding: 30px;
    min-width: 280px;
    .login-btn{
      width: 100%;
    }
  }
}
</style>