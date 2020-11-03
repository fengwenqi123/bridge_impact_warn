<template>
  <div class="container">
    <olMap @coordinate="coordinate">
    </olMap>
    <div v-if="flag" class='selector' :style="{left:(x1)+'px',top:(y1+6)+'px'}">
      <ul>
        <li v-for="(item,index) in videoList" :key="item.id">
          <input :id='index' type='checkbox'>
          <label :for='index'>{{ item.name }}</label>
        </li>
      </ul>
      <button></button>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */

import { mapGetters } from 'vuex'
import olMap from '@/components/map/index'
import { addInfoLayers, startGISWork } from '@/utils/mapConfig/gisLib/HMap.js'
import bus from '@/components/bus'

var angleStart = -360

// jquery rotate animation
function rotate (li, d) {
  $({ d: angleStart }).animate({ d: d }, {
    step: function (now) {
      $(li)
        .css({ transform: 'rotate(' + now + 'deg)' })
        .find('label')
        .css({ transform: 'rotate(' + (-now) + 'deg)' })
    },
    duration: 0
  })
}

// show / hide the options
function addOptions (s) {
  $(s).addClass('open')
  var li = $(s).find('li')
  var deg = $(s).hasClass('half') ? 180 / (li.length - 1) : 360 / li.length
  for (var i = 0; i < li.length; i++) {
    var d = $(s).hasClass('half') ? (i * deg) - 90 : i * deg
    $(s).hasClass('open') ? rotate(li[i], d) : rotate(li[i], angleStart)
  }
}

// show / hide the options
function removeOptions (s) {
  $(s).removeClass('open')
  var li = $(s).find('li')
  var deg = $(s).hasClass('half') ? 180 / (li.length - 1) : 360 / li.length
  for (var i = 0; i < li.length; i++) {
    var d = $(s).hasClass('half') ? (i * deg) - 90 : i * deg
    $(s).hasClass('open') ? rotate(li[i], d) : rotate(li[i], angleStart)
  }
}

export default {
  computed: {
    ...mapGetters([
      'app'
    ])
  },
  data () {
    return {
      x: null,
      y: null,
      x1: null,
      y1: null,
      videoList: null,
      flag: null
    }
  },
  components: {
    olMap
  },
  mounted () {
    addInfoLayers(this.app) // 增加业务图层
    startGISWork()
    this.onBus()
  },
  methods: {
    // 获取鼠标点击坐标
    coordinate (x, y) {
      this.x = x
      this.y = y
      removeOptions($('.selector'))
      this.flag = false
    },
    // 点击要素触发事件
    onBus () {
      bus.$on('video', (obj) => {
        this.flag = true
        this.x1 = this.x
        this.y1 = this.y
        this.videoList = obj
        setTimeout(() => {
          addOptions($('.selector'))
        }, 0)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.selector {
  position: absolute;
  top: 300px;
  left: 200px;
}
</style>
