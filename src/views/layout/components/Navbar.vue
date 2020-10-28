<template>
  <div class="navbar">
         <div class="img">
           <img :src="title" class="title" alt="">
         </div>
    <div class="tabs">
      <el-popover placement="bottom" width="150" trigger="click">
        <ul class="ul1">
          <li>
            <div class="item"
                 @click="logout">
              <i class="el-icon-third-tuichudenglu"></i>
              退出登录
            </div>
          </li>
        </ul>
        <div slot="reference"
             class="avatar-wrapper">
          <svg-icon icon-class="avatar" class="user-avatar"></svg-icon>
          <div class="name">{{userInfo.name}}</div>
        </div>
      </el-popover>
    </div>
  </div>

</template>

<script>

import { mapGetters } from 'vuex'
import title from '@/assets/img/zjzhhs.png'

export default {
  name: 'Navbar',
  data () {
    return {
      title
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
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

    .title {
      width: 290px;
    }

    .tabs {
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
        .avatar-wrapper{
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
          .name{
            color: #1890ff;
            padding: 0 8px;
          }
          .user-avatar{
            font-size: 20px;
          }
        }
      }
    }
  }
</style>
