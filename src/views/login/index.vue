<template>
  <div class="login-container">
    <div class="fff" />
    <div class="juxing">
      <img src="../../assets/img/backgroundblue.png" alt="">
    </div>
    <el-form
      ref="loginForm"
      class="login-form"
      auto-complete="on"
      :model="loginForm"
      label-position="left"
    >
      <h3 class="title">
        用户登录
      </h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="on"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          v-model="loginForm.password"
          name="password"
          :type="pwdType"
          auto-complete="on"
          placeholder="请输入密码"
          @keyup.enter.native="handleLogin"
        />
        <span
          class="show-pwd"
          @click="showPwd"
        ><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <div class="clearfix">
        <el-checkbox v-model="checked">
          记住密码
        </el-checkbox>
        <el-button
          type="primary"
          style="width:250px;margin-left: 114px;"
          :loading="loading"
          @click.native.prevent="handleLogin"
        >
          登录
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
import { setToken } from '@/utils/cache'

export default {
  name: 'Login',
  data () {
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('请输入正确的用户名'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePass = (rule, value, callback) => {
    //   if (value.length < 5) {
    //     callback(new Error('密码不能小于5位'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      checked: false,
      loginForm: {
        username: '',
        password: '',
        loginType: 0,
        loginSource: 1
      },
      // loginRules: {
      //   username: [{ required: true, trigger: 'blur', validator: validateUsername }],
      //   password: [{ required: true, trigger: 'blur', validator: validatePass }]
      // },
      loading: false,
      pwdType: 'password'
    }
  },
  mounted () {
    // if (getuser()) {
    //   this.loginForm.username = getuser()
    //   this.loginForm.password = getpassword()
    // }
  },
  methods: {
    showPwd () {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then((response) => {
            setToken(response.data)
            // if (this.checked) {
            //   setuser(this.loginForm.username)
            //   setpassword(this.loginForm.password)
            // } else {
            //   removeuser()
            //   removepassword()
            // }
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
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
  .login-container {
    .clearfix {
      display: flex;
      align-items: center; /*垂直居中*/
      justify-content: flex-end; /*水平居中*/
    }

    position: fixed;
    height: 100%;
    width: 100%;
    background: url("../../assets/img/background.jpg") no-repeat;
    background-size: 100% 100%;

    .fff {
      position: fixed;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.8);
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
      position: absolute;
      right: 40px;
      width: 520px;
      padding: 35px 35px 15px 35px;
      margin: 238px auto;
      z-index: 11;
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
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;

      &_login {
        font-size: 20px;
      }
    }

    .title {
      font-size: 30px;
      font-weight: bold;
      color: #01579B;
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

    .juxing {
      position: fixed;
      height: 100%;
      z-index: 10;
      opacity: 0.8;
      filter: alpha(opacity=80); /* IE8 及其更早版本 */
      background-size: 100% 100%;

      img {
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
  }

</style>
