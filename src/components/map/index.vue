<template>
  <div class="container">
    <div id="map" ref="map"></div>
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
  }
}
</script>

<style>
#map {
  position: fixed;
  width: 100%;
  height: 100%;
}

/*隐藏ol的一些自带元素*/
.ol-attribution, .ol-zoom {
  display: none;
}

.maplevel {
  position: fixed;
  bottom: 20px;
  right: 10px;
}
</style>
