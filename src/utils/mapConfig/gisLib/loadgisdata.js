/**
 * GIS要素数据加载js
 * created by zj on 2018.8.30
 */

/** *****************************************要素获取及展示方法开始****************************************/
/**
 * 分层加载要素数据
 * @param {String} type 加载业务要素类型
 * @description 除船舶图层外,其他要素初始化时顺次添加一次
 */
import store from '@/store'
import { wgs84ToWebMct } from './HTool'
import HSymbol from './HSymbol'
import { bridgeList } from '../api/data'
const bridgeImg = require('@/utils/mapConfig/img/bridge.png')

export function loadInfoLayer (type) {
  if ((type == null || type === 'bridge') && store.getters.app.bridgeLayer) loadBridgeLayer()
}

/**
 * 加载要素
 */
function loadBridgeLayer () {
  bridgeList().then(response => {
    const markerSymbol = []
    store.getters.app.bridgeLayer.clear()
    response.data.forEach(item => {
      const bridgeAttr = {
        datatype: 'bridge',
        name: item.name,
        id: item.id
      }
      if (item.longitude != null && item.latitude != null) {
        var lonlat = wgs84ToWebMct(item.longitude, item.latitude)
        var bridgeSymbol = HSymbol.getPictureMarkerSymbol(bridgeAttr, lonlat, bridgeImg, 0.5, bridgeAttr.name, 14, [0, 0, 0], -20, -20)
        markerSymbol.push(bridgeSymbol)
      }
    })
    store.getters.app.bridgeLayer.addMarkerSymbol(markerSymbol)
  })
}

/** *****************************************要素获取及展示方法结束****************************************/
