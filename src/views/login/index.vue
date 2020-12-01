<template>
  <div class="container">
    <div class="tip">
      <img src="../../assets/img/tip.jpg" alt="">
<!--      <div class="p1">杭州绕城高速公路</div>-->
<!--      <div class="p2">桥梁防撞与预警监测系统</div>-->
      <div class="login-container">

        <el-form class="login-form"
                 auto-complete="on"
                 :model="loginForm"
                 ref="loginForm"
                 :rules="loginRules"
                 label-position="left">
          <img src="../../assets/img/login.png" alt="">
          <p>严格 规范 智能 科学</p>
          <el-form-item prop="username">
          <span class="svg-container svg-container_login">
            <svg-icon icon-class="user" />
          </span>
            <el-input type="text"
                      v-model="loginForm.username"
                      auto-complete="on"
                      placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password"></svg-icon>
          </span>
            <el-input name="password"
                      :type="pwdType"
                      @keyup.enter.native="handleLogin"
                      v-model="loginForm.password"
                      auto-complete="on"
                      placeholder="请输入密码"></el-input>
            <span class="show-pwd"
                  @click="showPwd">
            <svg-icon :icon-class="eye" />
          </span>
          </el-form-item>
          <div class="login-button">
            <el-checkbox v-model="checked">记住密码</el-checkbox>
            <el-button type="primary"
                       :loading="loading"
                       @click.native.prevent="handleLogin">登录</el-button>
          </div>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>

import {
  setuser,
  setpassword,
  getuser,
  getpassword,
  removeuser,
  removepassword
} from '@/utils/auth'
import { setToken } from '@/utils/cache'

export default {
  name: 'login',
  data () {
    return {
      eye: 'close',
      checked: false,
      loginForm: {
        username: '',
        password: '',
        loginType: 0,
        loginSource: 1
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    showPwd () {
      if (this.pwdType === 'password') {
        this.eye = 'open'
        this.pwdType = ''
      } else {
        this.eye = 'close'
        this.pwdType = 'password'
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        // console.log(valid)
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then((res) => {
            setToken(res.data)
            if (this.checked) {
              setuser(this.loginForm.username)
              setpassword(this.loginForm.password)
            } else {
              removeuser()
              removepassword()
            }
            this.loading = false
            this.$router.push({ path: '/' })
          })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted () {
    if (getuser()) {
      this.loginForm.username = getuser()
      console.log(getpassword())
      if (getpassword()) {
        this.checked = true
        this.loginForm.password = getpassword()
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #000;
      height: 47px;

      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }

  .el-form-item {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    color: #454545;
  }

  .el-button {
    span {
      font-size: 18px;
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.container{
  position: absolute;
  height: 100%;
  width: 100%;
  background: url("../../assets/img/background.png") no-repeat;
  background-size: 100% 100%;
  .tip{
   position: absolute;
    top: 140px;
    left: 50%;
    margin-left: -586px;
    .p1{
      font-family: AdobeHeiti;
      font-size: 50px;
      color: #255cae;
    }
    .p2{
      margin-top: 30px;
      font-family: AdobeHeiti;
      margin-left: 280px;
      font-size: 50px;
      color: #255cae;
    }
  }
}
.login-top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 18%;
  background: #fff;
  div {
    height: 80%;
    position: absolute;
    left: 60px;
    top: 10%;
  }
  img {
    height: 100%;
    float: left;
  }
  img:last-child {
    margin-left: 20px;
    margin-top: 7%;
    height: 45%;
  }
}

.login-bottom {
  padding-top: 30px;
  top: initial;
  bottom: 0;
  height: 17%;
  p {
    line-height: 30px;
    text-align: center;
    color: #888;
  }
}

.login-container {
  //position: fixed;
  //width: 100%;
  //// background: url("../../assets/img/login_background.png") no-repeat;
  //background: #f2f2f2;
  //background-size: 100% 100%;

  .clearfix {
    display: flex;
    align-items: center; /*垂直居中*/
    justify-content: flex-end; /*水平居中*/
  }

  .all {
    opacity: 1;
    filter: alpha(opacity=100); /* IE8 及其更早版本 */
    margin-top: 150px;
    width: 850px;

    .logo {
      width: 250px;
      margin: 0 auto;
    }

    .title1 {
      width: 90%;
      margin: 20px auto;
    }
  }

  .login-form {
    //position: absolute;
    margin-left: 623px;
    //margin: auto;
    margin-top: 20px;
    //margin-left: -105px;
    top: 60px;
    bottom: 0;
    width: 350px;
    height: 400px;
    padding: 35px 35px 15px 35px;
    z-index: 11;
    background: #fff;
    border-radius: 5px;
    img{
      width: 140px;
      margin-bottom: 10px;
    }
    p{
      text-align: right;
      margin-bottom: 10px;
      font-size: 12px;
      color: #888;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding-left: 12px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;

    &_login {
      font-size: 20px;
    }

    .svg-icon {
      font-size: 25px;
    }
  }

  .title {
    font-size: 30px;
    font-weight: normal;
    color: #409eff;
    margin: 0px auto 40px auto;
    text-align: center;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .banner {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    filter: alpha(opacity=80); /* IE8 及其更早版本 */
    background-size: 100% 100%;
    /deep/ .el-carousel {
      height: 100%;
      width: 100%;
    }
    /deep/ .el-carousel__container {
      height: 100%;
      width: 100%;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }

  .tishi {
    position: absolute;
    bottom: -50px;
    right: 35px;
    font-size: 15px;
    cursor: pointer;
    color: #01579b;
    font-weight: bold;
  }

  .login-button {
    .el-button {
      width: 100%;
      margin-top: 30px;
    }
  }
}
</style>
