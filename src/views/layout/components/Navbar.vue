<template>
  <div class="navbar">
    <div class="img">
      杭州绕城高速公路桥梁防撞与预警监测系统
    </div>
    <div class="tabs">
      <el-button round icon="el-icon-map-location" @click="toMap">地图</el-button>
      <el-popover placement="bottom" width="150" trigger="click">
        <ul class="ul1">
          <li>
            <div class="item" @click="updatePassword">
              <!-- <i class="el-icon-edit"></i> -->
              修改密码
            </div>
          </li>
          <li>
            <div class="item" @click="logout">
              <!-- <i class="el-icon-third-tuichudenglu"></i> -->
              退出登录
            </div>
          </li>
        </ul>
        <div slot="reference" class="avatar-wrapper">
          <svg-icon icon-class="avatar" class="user-avatar"></svg-icon>
          <div class="name">{{userInfo.name}}</div>
        </div>
      </el-popover>
    </div>
    <el-dialog title="修改密码" :visible.sync="addDialog" top="6vh" width="60%">
      <el-form ref="addForm" :model="form" status-icon :rules="rules" label-position="right" label-width="80px">
        <el-form-item label="原密码:" prop="password">
          <el-input v-model="form.password" show-password placeholder="请输入原密码" clearable type="password" />
        </el-form-item>
        <el-form-item label="新密码:" prop="newPassword">
          <el-input v-model="form.newPassword" show-password placeholder="请输入新密码" clearable type="password" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="information-foot">
        <el-button icon="el-icon-document" size="small" class="blueButton" @click="setPassword">
          保存
        </el-button>
        <el-button icon="el-icon-refresh-left" size="small" class="whiteButton" @click="cancel">
          返回
        </el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>

import { mapGetters } from 'vuex'
import title from '@/assets/img/zjzhhs.png'
import { updatePassword, updateACPassword } from '@/api/UserManagement'

export default {
  name: 'Navbar',
  data() {
    return {
      title,
      addDialog: false,
      // 表单验证
      rules: {
        password: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }]
      },
      form: {}
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    toMap() {
      this.$router.push({ path: '/' })
    },
    updatePassword() {
      console.log(this.userInfo)
      this.addDialog = true
    },
    setPassword() {
      this.form.id = this.userInfo.id
      if (this.userInfo.loginType === 1) {
        updateACPassword(this.form).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.cancel()
          this.$nextTick(() => {
            var that = this
            setTimeout(function() {
              that.logout()
            }, 1000)
          })
        }).catch(err => {
          this.$message({
            message: '请输入正确的原密码！',
            type: 'warning'
          })
        })
      } else {
        updatePassword(this.form).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.cancel()
          this.$nextTick(() => {
            var that = this
            setTimeout(function() {
              that.logout()
            }, 1000)
          })
        }).catch(err => {
          this.$message({
            message: '请输入正确的原密码！',
            type: 'warning'
          })
        })
      }
    },
    cancel() {
      this.form = {}
      this.addDialog = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  padding-right: 20px;
  height: 68px;
  border-radius: 0px !important;
  background: rgba(24, 144, 255, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .img {
    font-family: AdobeHeiti;
    font-size: 30px;
    color: #fff;
  }
  .title {
    width: 290px;
  }

  .tabs {
    display: flex;
    align-items: center;
    span {
      color: #ffff;
      display: flex;
      margin-left: 12px;
      cursor: pointer;

      a {
        display: inline-block;
        /* padding: 20px 20px; */
        height: 32px;
        background: #fff;
        line-height: 32px;
        width: 100px;
        border-radius: 15px;
        color: #1890ff;
        text-align: center;
      }
      .avatar-wrapper {
        width: auto;
        padding: 10px;
        border-radius: 20px;
        height: 32px;
        cursor: pointer;
        margin-right: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        .name {
          color: #1890ff;
          padding: 0 8px;
        }
        .user-avatar {
          font-size: 20px;
        }
      }
    }
  }
}
.ul1 {
  padding: 0 !important;
  margin: 0 !important;
  li {
    cursor: pointer;

    .item {
      display: flex;
      justify-content: center;
      height: 26px;
      align-items: center;
      background: rgba(232, 160, 16, 1);
      color: #fff;
      border-radius: 10px;

      i {
        margin-right: 20px;
      }
    }
  }

  li:nth-child(2) {
    .item {
      margin-top: 10px;
      background: rgba(220, 53, 69, 1);
    }
  }
}
</style>
