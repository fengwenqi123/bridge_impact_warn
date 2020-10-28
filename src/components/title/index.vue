<template>
  <div class="title-header">
    <div class="title-left">
      <page-header />
    </div>
    <div class="title-right">
      <breadcrumb />
    </div>
  </div>
</template>

<script>
import pageHeader from '@/components/pageHeader/index'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: {
    Breadcrumb,
    pageHeader
  }
}
</script>

<style scoped lang="scss">
  .title-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 46px;
  }

</style>
