<template>
  <div class="video" :id="id"></div>
</template>

<script>
export default {
  props: ['rtmp', 'id'],
  mounted () {
    this.getRtmp()
  },
  methods: {
    getRtmp () {
      var videoObject = {
        container: '#' + this.id, // 容器的ID或className
        variable: 'player', // 播放函数名称
        autoplay: true,
        live: true,
        video: this.rtmp
      }
      // eslint-disable-next-line no-new,new-cap,no-undef
      new ckplayer(videoObject)
    }
  },
  watch: {
    rtmp: { //  深度监听，可监听到对象、数组的变化
      handler (val, oldVal) {
        if (val) {
          this.getRtmp()
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
.video{
  width: 100%;
  height: 100%;
}
</style>
