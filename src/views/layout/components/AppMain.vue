<template>
  <section class="app-main">
    <el-scrollbar class="scrolls">
      <transition name="fade-transform" mode="out-in">
        <keep-alive include="mapView1">
        <router-view></router-view>
        </keep-alive>
      </transition>
    </el-scrollbar>
  </section>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>
<style>
  .app-main {
    background: #ECF0F5;
    position: absolute;
    width: 100%;
    height: calc(100% - 68px);
  }
</style>
