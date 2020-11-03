<template>
  <div class="container">
    <div id="map" ref="map" @click="coordinate"></div>
    <div id="coor"></div>
    <div class="maplevel">
      级别：<span id="maplevel"></span>
    </div>
  </div>
</template>

<script>
import 'ol/ol.css'
import { init } from '@/utils/mapConfig/gisLib/HMap'
export default {
  data () {
    return {
      map: null
    }
  },
  mounted () {
    var mapcontainer = this.$refs.map
    init(mapcontainer)
  },
  methods: {
    coordinate (e) {
      this.$emit('coordinate', e.clientX, e.clientY)
    }
  }
}
</script>

<style>
  #map{height:100%;}
  /*隐藏ol的一些自带元素*/
  .ol-attribution,.ol-zoom { display: none;}

</style>
