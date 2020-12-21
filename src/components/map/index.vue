<template>
  <div class="container">
    <div id="map" ref="map"></div>
    <div class="computed" id="coor"></div>
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

.computed {
  position: fixed;
  bottom: 45px;
  right: 90px;
  width: 200px;
}

/*层级和坐标颜色*/
.ol-mouse-position {
  width: 200px;
  text-align: center;
  background: rgba(255, 255, 255, 0.65);
}

.maplevel {
  position: fixed;
  bottom: 20px;
  right: 18px;
  width: 80px;
  text-align: center;
  background: rgba(255, 255, 255, 0.65);
}
</style>
