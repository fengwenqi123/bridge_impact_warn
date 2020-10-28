<template>
  <div class="sidebar">
    <div class="logo"><img src="@/assets/img/logo.png" alt=""></div>
    <div class="scrollbar-wrapper">
      <el-scrollbar class="scrolls">
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
        <el-menu
          :show-timeout="200"
          :default-active="$route.path"
          :collapse="isCollapse"
          :unique-opened="true"
          mode="vertical"
          background-color="#fff"
          text-color="#778899"
          active-text-color="#fff"
        >
          <sidebar-item v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path"/>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    SidebarItem,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .scrollbar-wrapper{
    height: calc(100% - 78px);
  }
  .hamburger-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    background: #f5f5f5;
    width: 180px;
  }

  .logo {
    width: 180px;
    height: 68px;
    background: rgba(24, 144, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 56px;
      height: 56px;
    }
  }
</style>
