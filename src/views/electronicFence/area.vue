<template>
<div class="area">
  <iframe :src="url" frameborder="0"></iframe>
</div>
</template>

<script>
export default {
  props: ['url']
}
</script>

<style scoped lang="scss">
.area{
  height: 500px;
}
iframe{
  height: 100%;
  width: 100%;
}
</style>
