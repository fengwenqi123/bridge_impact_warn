/* eslint-disable no-undef */
/**
 * 地图初始化方法【浙江省GIS监管用】
 * created by zj on 2018.7.30
 */

//定义一个地图应用全局变量
var coorapp = {}

$(function() {
  initPage('http://192.168.1.209:8090')
  // initPage('http://172.20.20.15:8080')
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
  var projection = ol.proj.get('EPSG:3857')
  var fullExtent = [-20037508.342787, -20037508.342781033, 20037508.342781033, 20037508.342787]
  var ypExtent = [13354372.33097, 3496494.21754, 13399393.74063, 3537388.02767]
  var resolutions = [156543.0339, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562,
    1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033,
    9.554628534317016, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135]
  var tileGrid = new ol.tilegrid.TileGrid({
    tileSize: 256,
    extent: fullExtent,
    resolutions: resolutions
  })

  coorapp.imgLayer = new ol.layer.Tile({
    title: '卫星影像图',
    type: 'YXT',
    source: new ol.source.TileWMS({
      url: coorapp.baseUrl,
      params: { 'LAYERS': 'yp_image', format: 'image/jpeg', SRS: 'EPSG:3857' },
      tileGrid: tileGrid
    })
  })

  coorapp.mapCenterCoor = ol.proj.transform([120.172378, 30.102054], 'EPSG:4326', 'EPSG:3857')
  coorapp.map = new ol.Map({
    target: 'coorMap',
    layers: [coorapp.imgLayer],
    view: new ol.View({
      center: coorapp.mapCenterCoor,
      zoom: 13,
      minZoom: 9,
      maxZoom: 18,
      projection: projection,
      extent: ypExtent
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
}

