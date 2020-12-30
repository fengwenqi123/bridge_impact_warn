import { View, Map } from 'ol'
import { defaults } from 'ol/control/util.js'
import mapconfig from '@/utils/mapConfig/config.js'
import { ScaleLine, MousePosition } from 'ol/control'
import { createStringXY } from 'ol/coordinate'
import { defaults as Idefaults } from 'ol/interaction'
import store from '@/store'
import { getMapLevel } from './HTool'
import HInfoLayer from './HInfoLayer'
import { loadInfoLayer, loadCheckArea} from './loadgisdata'
import { showPopup,checkareaAlarm } from './gis'
import { Vector } from 'ol/layer'
import { Vector as SVector } from 'ol/source'
import HSymbol from './HSymbol'

export function init (mapContainer) {
  const map = new Map({
    target: mapContainer,
    layers: mapconfig.basemap(),
    view: new View({
      center: mapconfig.mapCenterCoor,
      zoom: mapconfig.zoom,
      minZoom: mapconfig.minZoom,
      maxZoom: mapconfig.maxZoom,
      projection: mapconfig.projection,
      extent: mapconfig.extent
    }),
    controls: defaults().extend([
      new ScaleLine({}), // 显示比例尺
      new MousePosition({
        coordinateFormat: createStringXY(6),
        projection: 'EPSG:4326',
        target: document.getElementById('coor')
      })
    ]),
    // 取消双击地图放大事件
    interactions: Idefaults({
      doubleClickZoom: false
    }),
    logo: false
  })
  store.commit('addMap', map)
  initMapEvent(map)
}

/**
 * 地图事件
 * @param {ol.Map} map
 */
function initMapEvent (map) {
  // 地图移动事件(含地图加载完毕后触发事件,不含图层)
  map.on('moveend', (e) => {
    // 显示当前地图层级
    var currentLevel = getMapLevel()
    document.getElementById('maplevel').innerHTML = currentLevel
  })

  // 鼠标移动事件
  map.on('pointermove', function (e) {
    // 判定为要素时鼠标指针变为手形
    var pixel = map.getEventPixel(e.originalEvent)
    var feature = map.forEachFeatureAtPixel(pixel, (feature) => {
      return feature
    })
    if (feature) {
      var featureType = feature.getProperties().type
      if (feature || featureType === undefined) {
        map.getTargetElement().style.cursor = 'pointer'
      }
    } else {
      map.getTargetElement().style.cursor = 'auto'
    }
  })
}

/**
 * 增加业务图层方法
 * @param {ol.Map} map
 * @description 页面取用图层时需要添加定时器函数
 */
export function addInfoLayers (app) {
  app.videoLayer = new HInfoLayer('video', true, 160, 0) // 视频监控图层 ps:聚合图层设置图层显示分辨率失效;
  app.checkAreaLayer = new HInfoLayer('checkarea', true, 300, 0)// 提醒区域
  app.monitoringAreaLayer = new HInfoLayer('monitorarea', true, 300, 0)// 视频可视区域
  app.chosenCircle = HSymbol.getCircleSymbol({ type: 'chc' }, mapconfig.mapCenterCoor, 20, [255, 255, 255, 0], [255, 255, 0], 3, true)
  app.chosenLayer = new Vector({
    source: new SVector({
      features: [app.chosenCircle]
    }),
    type: 'draw',
    visible: false
  }) // 船舶要素选中图层
  app.map.addLayer(app.checkAreaLayer.layer)
  app.map.addLayer(app.monitoringAreaLayer.layer)
  app.map.addLayer(app.videoLayer.layer)
}
/**
 * 所有地图资源加载完毕后执行的GIS操作
 */
export function startGISWork () {
  setTimeout(() => {
    loadInfoLayer()// 分图层加载要素
    showPopup(store.getters.app)// 显示弹出框
  }, 0)
  setTimeout(() => {
    checkareaAlarm()
    // setInterval('loadCheckArea()', 10000)
  }, 1000)
}
