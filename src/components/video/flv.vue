<template>
  <video
    :id="videoId"
    controls = "true"
    height="100%"
    width="100%">
  </video>
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
      // const url = '/ddata' + this.url.split('ddata')[1]
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

<style>
</style>
