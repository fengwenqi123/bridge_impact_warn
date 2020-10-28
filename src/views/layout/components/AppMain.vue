<template>
  <section class="app-main">
    <el-scrollbar class="scrolls">
      <transition name="fade-transform" mode="out-in">
        <router-view></router-view>
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
