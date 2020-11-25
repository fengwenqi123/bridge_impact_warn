<template>
<div class="app">
  <video
    :id="ids"
    controls = "true"
    height="100%"
    width="100%">
  </video>
</div>
</template>
<script>
import flvjs from 'flv.js'
export default {
  props: ['url', 'ids'],
  methods: {
    play () {
      const url = this.url
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById(this.ids)
        var flvPlayer = flvjs.createPlayer({
          type: 'flv',
          url: url
        })
        flvPlayer.attachMediaElement(videoElement)
        flvPlayer.load()
        flvPlayer.play()
      }
    }
  },
  watch: {
    url: { //  深度监听，可监听到对象、数组的变化
      handler (val, oldVal) {
        if (val) {
          setTimeout(() => {
            this.play()
          })
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.app{
  height: 100%;
}
</style>
