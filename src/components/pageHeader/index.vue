<template>
  <div class="page-header">
    <div
      class="svg-div"
      @click="goBack"
    >
      <svg-icon icon-class="back" />
      <div class="el-page-header__title">
        返回
      </div>
    </div>
    <div class="el-page-header__name">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    title () {
      return this.$route.meta.title
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
  .page-header {
    display: flex;
    align-items: center;
  }

  .svg-div {
    display: flex;
    align-items: center;
    cursor: pointer;

    .svg-icon {
      font-size: 16px;
      margin-right: 4px;
    }

    .el-page-header__title {
      padding-right: 10px;
      font-size: 16px;
      border-right: 1px solid #888;
    }

  }

  .el-page-header__name {
    padding-left: 10px;
    font-size: 20px;
  }

</style>
