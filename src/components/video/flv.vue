<template>
  <div class="app">
    <video
      :id="videoId"
      controls = "true"
      class="video-class">
    </video>
  </div>
</template>
<script>
import flvjs from 'flv.js'
export default {
  props: ['url'],
  data () {
    return {
      videoId: 'videoId'
    }
  },
  methods: {
    play () {
      const url = this.url
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById(this.videoId)
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
  .video-class{
    width: 100%;
    height: 100%;
    object-fit:fill;
  }
}
</style>
