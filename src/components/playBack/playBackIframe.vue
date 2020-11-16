<template>
  <div class="iframes">
    <iframe scrolling="no" id="iframe" name="playback" ref="iframe" src="/static/areatrack/index.html">
      <p>您的浏览器不支持 iframe 标签。</p>
    </iframe>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
  #iframe {
    height: 100%;
    width: 100%;
  }
</style>
