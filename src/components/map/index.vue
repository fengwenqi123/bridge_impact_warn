<template>
  <div class="container">
    <div class="transfer">
      <input type="button" value="二维图" @click="openDZDT()">
      <input type="button" value="影像图" @click="openYXT()">
    </div>
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
import { openDZDT, openYXT } from '../../utils/mapConfig/gisLib/gis'

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
    openYXT,
    openDZDT
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

.transfer {
  position: absolute;
  z-index: 99;
  left: 50px;
  margin-right: 10px;
  top: 25px;
}


input[type='button'] {
  border: none;
  background: #4169E1;
  padding: 4px 14px;
  color: #fff;
  border-radius: 20px;
  cursor: pointer;
  height: 35px;
}
</style>
