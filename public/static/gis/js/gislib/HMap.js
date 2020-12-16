/**
 * 地图初始化方法【浙江智慧海事GIS监管用】
 * created by zj on 2018.7.30
 */

// 定义一个地图应用全局变量
var app = {}

$(function() {
  initPage(GIS_HOST)
})

// 初始化页面
function initPage(serverIP) {
  if (serverIP.length > 0) {
    app.baseUrl = serverIP + '/geowebcache/service/wms'
  }
  initMap()
}

// 初始化地图
function initMap() {
  // 投影坐标Web Mercator
  var projection = ol.proj.get('EPSG:3857')
  // 全球范围
  var fullExtent = [-20037508.342787, -20037508.342781033, 20037508.342781033, 20037508.342787]
  // 浙江范围
  var zjExtent = [12266461.42492, 2459896.44427, 15086223.39814, 4351865.76839]
  // 切片方案信息(每一级的切片信息，可选择显示级别)
  var resolutions = [156543.0339, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562,
    1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033,
    9.554628534317016, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135]
  var tileGrid = new ol.tilegrid.TileGrid({
    tileSize: 256,
    extent: fullExtent,
    resolutions: resolutions
  })

  app.vecLayer = new ol.layer.Tile({
    title: '电子地图',
    type: 'DZDT',
    source: new ol.source.TileWMS({
      url: app.baseUrl,
      params: { 'LAYERS': 'zjdt', format: 'image/png', SRS: 'EPSG:3857' },
      tileGrid: tileGrid
    })
  })

  app.imgLayer = new ol.layer.Tile({
    title: '卫星影像图',
    type: 'YXT',
    source: new ol.source.TileWMS({
      url: app.baseUrl,
      params: { 'LAYERS': 'zjimg', format: 'image/png', SRS: 'EPSG:3857' },
      tileGrid: tileGrid
    }),
    visible: false
  })

  app.hzhdLayer = new ol.layer.Tile({
    title: '电子航道图',
    type: 'DZHDT',
    source: new ol.source.TileWMS({
      url: app.baseUrl,
      params: { 'LAYERS': '1226hzjt', format: 'image/png', SRS: 'EPSG:3857' },
      tileGrid: tileGrid
    })
  })

  app.hzssdLayer = new ol.layer.Tile({
    title: '水深点',
    type: 'SSDDT',
    source: new ol.source.TileWMS({
      url: app.baseUrl,
      params: { 'LAYERS': '0110hzssd', format: 'image/png', SRS: 'EPSG:3857' },
      tileGrid: tileGrid
    }),
    visible: false
  })
  // 大连海事航道要素集
  // 2020.2.19 要求改回图标
  // app.zhhsfeatureLayer = new ol.layer.Image({
  //   title: '标指标牌',
  //   type: 'zhhsfeature',
  //   source: new ol.source.ImageWMS({
  //     url: 'http://10.100.70.138:8080/geoserver/ZJ360/wms',
  //     params: {
  //       'LAYERS': 'ZJ360:ZHHS',
  //       'FORMAT': 'image/png'
  //     }
  //   }),
  //   maxResolution: 14,
  //   visible: false
  // })

  app.mapCenterCoor = ol.proj.transform([120.1, 30.86], 'EPSG:4326', 'EPSG:3857')
  app.map = new ol.Map({
    target: 'map',
    layers: [app.imgLayer, app.vecLayer, app.hzhdLayer, app.hzssdLayer],
    view: new ol.View({
      center: app.mapCenterCoor,
      zoom: 14,
      minZoom: 9,
      maxZoom: 18,
      projection: projection,
      extent: zjExtent
    }),
    controls: ol.control.defaults().extend([
      new ol.control.ScaleLine({}),
      new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(6),
        projection: 'EPSG:4326',
        target: document.getElementById('coor')
      })
    ]),
    // 取消双击地图放大事件
    interactions: ol.interaction.defaults({
      doubleClickZoom: false
    }),
    logo: false
  })
  HNavSecurityLayer.init(app.map, GIS_SERVERIP)// 通航指数图层初始化
  addInfoLayers(app.map)// 业务图层初始化
  HShipLayer.init(app.map, GIS_SHIPWMS, GIS_SHIPWFS) // 船舶图层初始化
  HShipLayer.refresh() // 船舶图层刷新
  initMapEvent(app.map) // 地图事件
  startGISWork(app.map)
}

/**
 * 增加业务图层方法
 * @param {ol.Map} map
 * @description 页面取用图层时需要添加定时器函数
 */
function addInfoLayers(map) {
  app.countyLayer = new HInfoLayer('zjcounty', true, 1000, 0) // 浙江区县图层

  app.manageareaLayer = new HInfoLayer('managearea', false, 77, 19)// 辖区 虚线 紫
  app.anchorageareaLayer = new HInfoLayer('anchorage', true, 30, 0)// 锚地 蓝
  app.anchoragePointLayer = new HInfoLayer('anchoragepoint', true, 30, 0)// 锚地标注图层
  app.safeworkareaLayer = new HInfoLayer('safework', true, 30, 0)// 安全作业区 绿
  app.limitsailingareaLayer = new HInfoLayer('limitarea', true, 30, 0)// 禁限航区域 红
  app.limitsailingpointLayer = new HInfoLayer('limitpoint', true, 30, 0)// 禁限航区标注图层
  app.monitorareaLayer = new HInfoLayer('marea', false, 30, 0)// 重点区间图层
  app.segmentLayer = new HInfoLayer('segment', false, 30, 0)// 航段图层
  app.segmentPointLayer = new HInfoLayer('segmentpoint', false, 30, 0)// 航段标注图层
  app.matouLayer = new HInfoLayer('matou', false, 10, 0)// 码头图层(目前只有点);
  app.videoLayer = new HInfoLayer('video', false, 160, 0) // 视频监控图层 ps:聚合图层设置图层显示分辨率失效;
  app.aisBasestationLayer = new HInfoLayer('aisBase', false, 10, 0)// AIS基站图层
  app.vhfBasestationLayer = new HInfoLayer('vhfBase', false, 10, 0)// VHF基站图层
  app.rfidBasestationLayer = new HInfoLayer('rifdBase', true, 10, 0)// RFID基站图层
  app.portEnterpriseLayer = new HInfoLayer('portEnterprise', true, 10, 0)// 港口企业图层
  app.hydrologyLayer = new HInfoLayer('hydrology', false, 160, 0) // 水文图层;
  app.ferryLayer = new HInfoLayer('ferry', false, 10, 0)// 渡口图层
  app.dangerstoreLayer = new HInfoLayer('dangerstore', true, 10, 0) // 危化存储
  app.emergentSourceLayer = new HInfoLayer('support', false, 10, 0)// 应急物资图层
  app.hszsStationLayer = new HInfoLayer('hszs', false, 10, 0)// 海事站所图层
  app.kakouLayer = new HInfoLayer('kakou', false, 10, 0)// 卡口图层
  app.collectionPointLayer = new HInfoLayer('collection', true, 10, 0)// 船员信息采集点  没有经纬度 经纬度格式未确认
  app.bridgeLayer = new HInfoLayer('bridge', false, 10, 0)// 桥梁
  app.contaminatedLayer = new HInfoLayer('contaminated', false, 10, 0)// 污染物
  app.airqualityLayer = new HInfoLayer('airquality', false, 10, 0)// 空气质量
  // 合作方要素
  app.emergencyTeamLayer = new HInfoLayer('emergencyteam', true, 10, 0)// 三防队伍
  app.materialReservePointLayer = new HInfoLayer('materialreservepoint', true, 10, 0)// 物资站点 仓库
  // 暂时将大连海事要素按照图例分为三大类：助航标志 标志标牌 涉水要素
  app.DLHSMarkerAssistLayer = new HInfoLayer('dmarkerassist', false, 10000, 0)// 大连海事助航标志图层
  app.DLHSMarkersLayer = new HInfoLayer('dmarker', false, 10000, 0)// 大连海事标志标牌图层
  app.DLHSFeaturesLayer = new HInfoLayer('dfeature', false, 10000, 0)// 大连海事涉水要素图层

  app.testFeatureLayer = new HInfoLayer('testfea', true, 100000, 0)// 测试要素显示图层

  app.flashLayer = new HInfoLayer('flash', true, 20, 0)// 闪烁专用图层
  app.chosenCircle = HSymbol.getCircleSymbol({'type': 'chc'}, app.mapCenterCoor, 20, [255, 255, 255, 0], [255, 255, 0], 3, true)
  app.chosenLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [app.chosenCircle]
    }),
    type: 'draw',
    visible: false
  }) // 船舶要素选中图层

  map.addLayer(app.countyLayer.layer)
  map.addLayer(app.manageareaLayer.layer)
  map.addLayer(app.anchorageareaLayer.layer)
  map.addLayer(app.anchoragePointLayer.layer)
  map.addLayer(app.safeworkareaLayer.layer)
  map.addLayer(app.limitsailingareaLayer.layer)
  map.addLayer(app.limitsailingpointLayer.layer)
  map.addLayer(app.monitorareaLayer.layer)
  map.addLayer(app.segmentLayer.layer)
  map.addLayer(app.matouLayer.layer)
  map.addLayer(app.videoLayer.layer)
  map.addLayer(app.aisBasestationLayer.layer)
  map.addLayer(app.vhfBasestationLayer.layer)
  map.addLayer(app.rfidBasestationLayer.layer)
  map.addLayer(app.portEnterpriseLayer.layer)
  map.addLayer(app.hydrologyLayer.layer)
  map.addLayer(app.ferryLayer.layer)
  map.addLayer(app.dangerstoreLayer.layer)
  map.addLayer(app.emergentSourceLayer.layer)
  map.addLayer(app.hszsStationLayer.layer)
  map.addLayer(app.kakouLayer.layer)
  map.addLayer(app.collectionPointLayer.layer)
  map.addLayer(app.bridgeLayer.layer)
  map.addLayer(app.contaminatedLayer.layer)
  map.addLayer(app.airqualityLayer.layer)
  map.addLayer(app.segmentPointLayer.layer)
  // 合作方要素
  map.addLayer(app.emergencyTeamLayer.layer)
  map.addLayer(app.materialReservePointLayer.layer)

  // 大连海事标识标牌
  map.addLayer(app.DLHSMarkerAssistLayer.layer)
  map.addLayer(app.DLHSMarkersLayer.layer)
  map.addLayer(app.DLHSFeaturesLayer.layer)
  map.addLayer(app.testFeatureLayer.layer)

  map.addLayer(app.flashLayer.layer)
  map.addLayer(app.chosenLayer)
}

/**
 * 地图事件
 * @param {ol.Map} map
 */
function initMapEvent(map) {
  // 地图移动事件(含地图加载完毕后触发事件,不含图层)
  map.on('moveend', function(e) {
    // 显示当前地图层级
    var currentLevel = getMapLevel()
    document.getElementById('maplevel').innerHTML = currentLevel
    // 获取中心点
    var MapCenter = getMapCenter()
    parent.postMessage({
      act: 'dingwei',
      msg: {
        name: MapCenter
      }
    }, '*')
    app.currentExtent = map.getView().calculateExtent(map.getSize())

    // 在页面显示当前范围内船舶名称
    showShipNameIntable(HShipLayer.queryShipFeatures(app.currentExtent))
    // 在页面显示当前范围内的持续关注船舶名称
    showStickConcernedShipname(HShipLayer.queryShipFeatures(app.currentExtent))
    // 在页面显示当前范围内海事站所名称
    getFeatureInExtent(app.currentExtent, app.hszsStationLayer.layer, showHszsNameIntable)
    // 在页面显示当前范围内监控视频名称
    if (app.videoSource) {
      var videofeatures = app.videoSource.getFeaturesInExtent(app.currentExtent)
      showVideoNameIntable(videofeatures)
    }
    // 在页面显示当前范围内救援物资名称
    getFeatureInExtent(app.currentExtent, app.emergentSourceLayer.layer, showSupportNameIntable)

    // 加载大连海事要素标志
    if (currentLevel > 15) {
      var minCoor = webMctToWGS84(app.currentExtent[0], app.currentExtent[1])
      var maxCoor = webMctToWGS84(app.currentExtent[2], app.currentExtent[3])
      var minlon = minCoor[0]
      var minlat = minCoor[1]
      var maxlon = maxCoor[0]
      var maxlat = maxCoor[1]
      loadDLHSFeatures(minlon, minlat, maxlon, maxlat)
    } else {
      app.DLHSMarkerAssistLayer.clear()
      app.DLHSMarkersLayer.clear()
      app.DLHSFeaturesLayer.clear()
    }
  })

  // 鼠标移动事件
  map.on('pointermove', function(e) {
    // 判定为要素时鼠标指针变为手形
    var pixel = map.getEventPixel(e.originalEvent)
    var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
      return feature
    })
    if (feature) {
      var featureType = feature.getProperties()['datatype']
      if (feature || featureType == undefined) {
        map.getTargetElement().style.cursor = 'pointer'
      }
    } else {
      map.getTargetElement().style.cursor = 'auto'
    }
  })
}

/**
 * 所有地图资源加载完毕后执行的GIS操作
 */
let startGISWork = (map) => {
  setTimeout(() => {
    showPopup(map)				// 显示弹出框
  }, 3000)

  setTimeout(() => {
    // 在页面显示当前范围内船舶名称
    showShipNameIntable(HShipLayer.queryShipFeatures(app.currentExtent))
    loadInfoLayer() // 分图层加载要素
  }, 1200)
}
