<template>
  <div class="app-wrapper" :class="classObj">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
    <div class="auto" v-if="voicePlay">
      <audio controls autoplay="autoplay" id="bg-music" v-show="false">
        <source :src="voicePlay" type="audio/mpeg">
      </audio>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import { listsWithNoPage } from '@/api/electronicFence'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  data() {
    return {
      voicePlay: null
    }
  },
  created() {
    this.loops()
  },
  mounted() {
  },
  methods: {
    // 循环遍历接口
    loops() {
      this.getZoneList()
      const loop = setInterval(() => {
        this.getZoneList()
      }, 30000)
      this.$once('hook:beforeDestroy', () => {
        this.voicePlay = null
        clearInterval(loop)
      })
    },
    getZoneList() {
      const warnArray = []
      listsWithNoPage().then(response => {
        response.data.forEach(item => {
          // if (item.code === '1') {
          warnArray.push(item)
          // }
        })
        this.setNotify(warnArray)
      })
    },
    setNotify(warnArray) {
      const voiceArr = []
      warnArray.forEach((item, index) => {
        if (item.areaType === '3' || item.areaType === '4') {
          console.log(item)
          setTimeout(() => {
            this.$notify({
              title: '提示',
              message: `${item.cereaName}发生${item.areaType === '1' ? '预警' : item.areaType === '2' ? '危险' : '紧急'}告警`,
              type: 'warning',
              duration: 5000,
              offset: 100
            })
          }, index * 50)
          voiceArr.push(item.areaType)
        }
      })
      this.voiceFun(voiceArr)
    },
    voiceFun(voiceArr) {
      voiceArr.sort((a, b) => b - a)
      if (voiceArr.length > 0) {
        const voice = voiceArr[0]
        switch (voice) {
          case '1':
            // this.voicePlay = require('@/assets/voice/1.mp3')
            break
          case '2':
            // this.voicePlay = require('@/assets/voice/2.mp3')
            break
          case '3':
            this.voicePlay = require('@/assets/voice/3.mp3')
            break
          case '4':
            this.voicePlay = require('@/assets/voice/4.mp3')
            break
        }
        setTimeout(() => {
          this.voicePlay = null
        }, 10000)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/mixin.scss';

.app-wrapper {
  background: rgba(24, 144, 255, 1);
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;

  .sidebar-container {
    width: 180px;
  }

  .main-container {
    flex: 1;
  }
}
</style>
