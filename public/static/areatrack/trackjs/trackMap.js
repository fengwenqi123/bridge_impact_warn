/**
 * 地图初始化方法【轨迹移动用】
 * created by zj on 2019.10.10
 */
// 定义一个地图应用全局变量
var trackapp = {}

$(function() {
  initPage(GIS_HOST)
})

// 初始化页面
function initPage(serverIP) {
  if (serverIP.length > 0) {
    trackapp.baseUrl = serverIP + '/geowebcache/service/wms'
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
  var zjExtent = [13125838.183906829, 3161096.5383587102, 13687110.504637482, 3644009.050138296]
  // 切片方案信息(每一级的切片信息，可选择显示级别)
  var resolutions = [156543.0339, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562,
    1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033,
    9.554628534317016, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135]
  var tileGrid = new ol.tilegrid.TileGrid({
    tileSize: 256,
    extent: fullExtent,
    resolutions: resolutions
  })

  trackapp.vecLayer = new ol.layer.Tile({
    title: '电子地图',
    type: 'DZDT',
    source: new ol.source.TileWMS({
      url: trackapp.baseUrl,
      params: { 'LAYERS': 'zjdt', format: 'image/png', SRS: 'EPSG:3857' },
      tileGrid: tileGrid
    })
  })

  trackapp.imgLayer = new ol.layer.Tile({
    title: '卫星影像图',
    type: 'YXT',
    source: new ol.source.TileWMS({
      url: trackapp.baseUrl,
      params: { 'LAYERS': 'zjimg', format: 'image/png', SRS: 'EPSG:3857' },
      tileGrid: tileGrid
    }),
    visible: false
  })

  trackapp.hzhdLayer = new ol.layer.Tile({
    title: '电子航道图',
    type: 'DZHDT',
    source: new ol.source.TileWMS({
      url: trackapp.baseUrl,
      params: { 'LAYERS': '1226hzjt', format: 'image/png', SRS: 'EPSG:3857' },
      tileGrid: tileGrid
    }),
    visible: false
  })

  trackapp.hzssdLayer = new ol.layer.Tile({
    title: '水深点',
    type: 'SSDDT',
    source: new ol.source.TileWMS({
      url: trackapp.baseUrl,
      params: { 'LAYERS': '0110hzssd', format: 'image/png', SRS: 'EPSG:3857' },
      tileGrid: tileGrid
    }),
    visible: false
  })
  trackapp.blockplanLayer = new ol.layer.Image({
    title: '浙江市级行政区',
    type: 'blockplan',
    source: new ol.source.ImageWMS({
      url: GIS_LAYERHOST + '/geoserver/geobase/wms',
      params: {
        'FORMAT': 'image/png',
        'VERSION': '1.1.0',
        'STYLES': '',
        'LAYERS': 'geobase:zj_city'
      }
    })
  })

  trackapp.cityblockplanLayer = new ol.layer.Image({
    title: '浙江区县级行政区',
    type: 'cityblockplan',
    source: new ol.source.ImageWMS({
      url: GIS_LAYERHOST + '/geoserver/geobase/wms',
      params: {
        'FORMAT': 'image/png',
        'VERSION': '1.1.0',
        'STYLES': '',
        'LAYERS': 'geobase:zj_county'
      }
    }),
    maxResolution: 152.87405654907226,
    minResolution: 0.55
  })

  // 地图中心点
  trackapp.mapCenterCoor = ol.proj.transform([120.1, 30.86], 'EPSG:4326', 'EPSG:3857')

  trackapp.map = new ol.Map({
    target: 'map',
    layers: [trackapp.imgLayer, trackapp.vecLayer, trackapp.hzhdLayer, trackapp.hzssdLayer, trackapp.blockplanLayer, trackapp.cityblockplanLayer],
    view: new ol.View({
      center: trackapp.mapCenterCoor,
      zoom: 14,
      minZoom: 9,
      maxZoom: 18,
      projection: projection,
      extent: zjExtent
    }),
    controls: ol.control.defaults().extend([
      new ol.control.ScaleLine({}),
      new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(4),
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

  addInfoLayers(trackapp.map)// 增加业务图层
  initMapEvent(trackapp.map) // 地图事件
  startGISWork(trackapp.map)
}

/**
 * 增加业务图层方法
 * @param {ol.Map} map
 * @description 页面取用图层时需要添加定时器函数
 */
function addInfoLayers(map) {
  // 区域轨迹回放图层（默认数据不加载）
  trackapp.areaTrackLayer = new HInfoLayerExt('areaTrack', 100, false, [], 9, 18, 0)
  //历史轨迹图层
  trackapp.historyTrackLayer = new HInfoLayer('historytrack', true, 100, 0)

  map.addLayer(trackapp.areaTrackLayer.layer)
  map.addLayer(trackapp.historyTrackLayer.layer)
}

/**
 * 地图事件
 * @param {ol.Map} map
 */
function initMapEvent(map) {
  map.on('moveend', function(e) {
    trackapp.currentExtent = trackapp.map.getView().calculateExtent(trackapp.map.getSize())
  })
  var container = document.getElementById('popup')
  var content = document.getElementById('popup-content')
  var popupCloser = document.getElementById('popup-closer')
  map.on('click', function(e) {
    var pixel = map.getEventPixel(e.originalEvent)
    map.forEachFeatureAtPixel(pixel, function(feature) {
      var property = feature.getProperties()
      var propertyType = property['type']
      switch (propertyType) {
        case 'trackPoint':
          var shipName = property['name']
          var time = property['receiveTime']
          var shipSpeed = property['speed']
          var coodinate = e.coordinate
          content.innerHTML =
            '船名:' + shipName + '</br>' +
            '航速:' + shipSpeed + '节</br>' +
            '接收时间:' + time + '</br>'

          trackapp.trackoverlay = new ol.Overlay({
            element: container,
            autoPan: true
          })
          trackapp.trackoverlay.setPosition(coodinate)
          map.addOverlay(trackapp.trackoverlay) // 不会出现多个弹出图层叠加(即切换点击时只有一个弹出层)
          break
        default:
          break
      }
    })
  })

  map.on('pointermove', function(e) {
    // 判定为要素是鼠标指针变为手形
    var pixel = map.getEventPixel(e.originalEvent)
    map.forEachFeatureAtPixel(pixel, function(feature) {
      var property = feature.getProperties()
      var propertyType = property['type']
      switch (propertyType) {
        case 'trackPoint':
          map.getTargetElement().style.cursor = 'pointer'
          break
        default:
          map.getTargetElement().style.cursor = 'auto'
          break
      }
    })
  })
  popupCloser.addEventListener('click', function() {
    trackapp.trackoverlay.setPosition(undefined)
  })

  //鼠标移动事件
  map.on('pointermove', function(e) {
    //判定为要素是鼠标指针变为手形
    var pixel = map.getEventPixel(e.originalEvent)
    var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
      return feature
    })
    if (feature == undefined) {
      map.getTargetElement().style.cursor = 'auto'
    } else {
      map.getTargetElement().style.cursor = 'pointer'
    }
  })
}

/**
 * 加载船舶数据
 */
function startGISWork() {
  trackapp.dataLoadingInterval = setInterval('dataLoading()', 100) // 加载数据
  trackapp.dataShowInterval = setInterval('dataShow()', 200) // 显示图层
}
