<template>
  <div class="container">
    <olMap>
    </olMap>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import olMap from '@/components/map/index'
import { addInfoLayers, startGISWork } from '@/utils/mapConfig/gisLib/HMap.js'
// import {  } from '@/utils/mapConfig/gisLib/HTool.js'
// import HShipLayer from '@/utils/mapConfig/gisLib/HShipLayer'
// import { GIS_SHIPWMS, GIS_SHIPWFS } from '@/utils/mapConfig/gisLib/HConfig.js'

export default {
  computed: {
    ...mapGetters([
      'app'
    ])
  },
  components: {
    olMap
  },
  mounted () {
    addInfoLayers(this.app) // 增加业务图层
    startGISWork()
    this.initShip()
  },
  methods: {
    initShip () {
      // const HShipLayers = new HShipLayer()
      // HShipLayers.init(this.app.map, GIS_SHIPWMS, GIS_SHIPWFS) // 船舶图层初始化
      // HShipLayers.refresh() // 船舶图层刷新
    }
  }
}
</script>

<style scoped lang="scss">
</style>
