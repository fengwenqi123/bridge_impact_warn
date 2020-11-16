/* eslint-disable no-undef */
/**
 * 地图初始化方法【浙江省GIS监管用】
 * created by zj on 2018.7.30
 */

//定义一个地图应用全局变量
var coorapp = {}

$(function() {
  initPage(GIS_HOST)
})

//初始化页面
function initPage(serverIP) {
  if (serverIP.length > 0) {
    coorapp.baseUrl = serverIP + '/geowebcache/service/wms'
  }
  initMap()
}

//初始化地图
function initMap() {
  //投影坐标Web Mercator
  var projection = ol.proj.get('EPSG:3857')
  //全球范围
  var fullExtent = [-20037508.342787, -20037508.342781033, 20037508.342781033, 20037508.342787]
  //湖州范围
  var zjExtent = [13125838.183906829, 3161096.5383587102, 13687110.504637482, 3644009.050138296]
  //切片方案信息(每一级的切片信息，可选择显示级别)
  var resolutions = [156543.0339, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562,
    1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033,
    9.554628534317016, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135]
  var tileGrid = new ol.tilegrid.TileGrid({
    tileSize: 256,
    extent: fullExtent,
    resolutions: resolutions
  })

  coorapp.vecLayer = new ol.layer.Tile({
    title: '电子地图',
    type: 'DZDT',
    source: new ol.source.TileWMS({
      url: coorapp.baseUrl,
      params: { 'LAYERS': 'zjdt', format: 'image/png', SRS: 'EPSG:3857' },
      tileGrid: tileGrid
    })
  })

  coorapp.imgLayer = new ol.layer.Tile({
    title: '卫星影像图',
    type: 'YXT',
    source: new ol.source.TileWMS({
      url: coorapp.baseUrl,
      params: { 'LAYERS': 'zjimg', format: 'image/png', SRS: 'EPSG:3857' },
      tileGrid: tileGrid
    }),
    visible: false
  })

  coorapp.hzhdLayer = new ol.layer.Tile({
    title: '电子航道图',
    type: 'DZHDT',
    source: new ol.source.TileWMS({
      url: coorapp.baseUrl,
      params: { 'LAYERS': '1226hzjt', format: 'image/png', SRS: 'EPSG:3857' },
      tileGrid: tileGrid
    })
  })
  coorapp.blockplanLayer = new ol.layer.Image({
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

  // coorapp.cityblockplanLayer = new ol.layer.Image({
  //   title: '浙江区县级行政区',
  //   type: 'cityblockplan',
  //   source: new ol.source.ImageWMS({
  //     url: GIS_LAYERHOST + '/geoserver/geobase/wms',
  //     params: {
  //       'FORMAT': 'image/png',
  //       'VERSION': '1.1.0',
  //       'STYLES': '',
  //       'LAYERS': 'geobase:zj_county'
  //     }
  //   }),
  //   maxResolution: 152.87405654907226,
  //   minResolution: 0.55
  // })
  coorapp.mapCenterCoor = ol.proj.transform([120.1, 30.86], 'EPSG:4326', 'EPSG:3857')
  coorapp.map = new ol.Map({
    target: 'coorMap',
    layers: [coorapp.imgLayer, coorapp.vecLayer, coorapp.hzhdLayer, coorapp.blockplanLayer],
    view: new ol.View({
      center: coorapp.mapCenterCoor,
      zoom: 13,
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
    logo: false
  })
  addInfoLayer(coorapp.map)
  startGISWork()

}

/**
 * 增加业务图层方法
 * @param {ol.Map} map
 * @description 新增需求：要求在新增要素时，先定位到该用户所在辖区位置
 */
function addInfoLayer(map) {
  coorapp.manageareaLayer = new HInfoLayer('managearea', true, 77, 19)//辖区 虚线 紫
  map.addLayer(coorapp.manageareaLayer.layer)
}

/**
 * 所有地图资源加载完毕后执行的GIS操作
 */
function startGISWork() {
  setTimeout(function() {
    loadManageArea()
  }, 0)
}

/**
 * 加载辖区
 */
function loadManageArea() {
  try {
    $.ajax({
      url: GIS_SERVERIP + '/area/manageRange/?order=name&pageSize=100',
      type: 'get',
      dateType: 'json',
      success: function(d) {
        var areadata = d.data.dataList
        var polygonSymbol = []
        coorapp.manageareaLayer.clear()
        $.each(areadata, function(i, item) {
          var mareaAttr = {
            'type': 'managearea',
            'name': item.name
          }
          if (item.area != null && item.area != '') {
            var areaObj = JSON.parse(item.area)
            var areaPoints = areaObj.pointList
            var points = []
            for (i = 0; i < areaPoints.length; i++) {
              var lonlat = wgs84ToWebMct(areaPoints[i].x, areaPoints[i].y)
              points.push(lonlat)
            }
            var mareaSymbol = HSymbol.getPolygonSymbol(mareaAttr, [points], [255, 255, 255, 0], [147, 112, 219], 2, true, mareaAttr['name'], 16, [147, 112, 219])
            polygonSymbol.push(mareaSymbol)
          }
        })
        coorapp.manageareaLayer.addPolygonSymbol(polygonSymbol)
      }
    })
  } catch (e) {
    console.log(e.name + ':' + e.message)
  }
}
