/* eslint-disable */
/**
 * GIS基本操作工具集
 * created by zj on 2018.7.30
 * @description 按照规范逐步更正
 */

/**
 * wgs84坐标转webMercator
 * @param {Number} lon
 * @param {Number} lat
 * @return {Array[Number]}} Lonlat
 */
import store from '@/store'
import HSymbol from './HSymbol'
import Overlay from 'ol/Overlay'
import { fromLonLat, toLonLat } from 'ol/proj'
import { Vector as SVector } from 'ol/source'
import { Vector, Heatmap } from 'ol/layer'
import { GeoJSON } from 'ol/format'
import Draw from 'ol/interaction/Draw'
import { Style, Fill, Stroke, Circle } from 'ol/style'
import { Polygon, LineString } from 'ol/geom'

export function wgs84ToWebMct (lon, lat) {
  var Lonlat = fromLonLat([lon, lat])
  return Lonlat
}

/**
 * WebMercator转WGS84
 * @param {Number} lon
 * @param {Number} lat
 * @return {Array[Number]} Lonlat
 */
export function webMctToWGS84 (lon, lat) {
  var Lonlat = toLonLat([lon, lat])
  return Lonlat
}

/**
 * WGS-84转GCJ-02
 * @param {Number} lon
 * @param {Number} lat
 * @return {Array[Number]} Lonlat
 */

export function WGS84ToGCJ02 (lon, lat) {
  var Lonlat = []
  // 参数转换
  var tlon = lon - 105.0
  var tlat = lat - 35.0

  // 转经度
  var relon = 300.0 + tlon + 2.0 * tlat + 0.1 * tlon * tlon + 0.1 * tlon * tlat + 0.1 * Math.sqrt(Math.abs(tlon)) +
    (20.0 * Math.sin(6.0 * tlon * Math.PI) + 20.0 * Math.sin(2.0 * tlon * Math.PI)) * 2.0 / 3.0 +
    (20.0 * Math.sin(tlon * Math.PI) + 40.0 * Math.sin(tlon / 3.0 * Math.PI)) * 2.0 / 3.0 +
    (150.0 * Math.sin(tlon / 12.0 * Math.PI) + 300.0 * Math.sin(tlon / 30.0 * Math.PI)) * 2.0 / 3.0
  // 转纬度
  var relat = -100.0 + 2.0 * tlon + 3.0 * tlat + 0.2 * tlat * tlat + 0.1 * tlon * tlat + 0.2 * Math.sqrt(Math.abs(tlon)) +
    (20.0 * Math.sin(6.0 * tlon * Math.PI) + 20.0 * Math.sin(2.0 * tlon * Math.PI)) * 2.0 / 3.0 +
    (20.0 * Math.sin(tlat * Math.PI) + 40.0 * Math.sin(tlat / 3.0 * Math.PI)) * 2.0 / 3.0 +
    (160.0 * Math.sin(tlat / 12.0 * Math.PI) + 320 * Math.sin(tlat * Math.PI / 30.0)) * 2.0 / 3.0

  var radLat = lat / 180.0 * Math.PI
  var magic = Math.sin(radLat)
  var magics = 1 - 0.00669342162296594323 * magic * magic
  var sqrtMagic = Math.sqrt(magics)
  var dlon = (relon * 180.0) / (6378245.0 / sqrtMagic * Math.cos(radLat) * Math.PI)
  var dLat = (relat * 180.0) / ((6378245.0 * (1 - 0.00669342162296594323)) / (magics * sqrtMagic) * Math.PI)

  Lonlat[0] = lon + dlon
  Lonlat[0] = Lonlat[0].toFixed(4)
  Lonlat[1] = lat + dLat
  Lonlat[1] = Lonlat[1].toFixed(4)
  return Lonlat
}

/**
 * GCJ-02转WGS-84
 * @param {Number} lon
 * @param {Number} lat
 * @return {Array[Number,Number]} Lonlat
 */
export function GCJ02ToWGS84 (lon, lat) {
  var Lonlat = []
  // 参数转换
  var tlon = lon - 105.0
  var tlat = lat - 35.0

  // 转经度
  var relon = 300.0 + tlon + 2.0 * tlat + 0.1 * tlon * tlon + 0.1 * tlon * tlat + 0.1 * Math.sqrt(Math.abs(tlon)) +
    (20.0 * Math.sin(6.0 * tlon * Math.PI) + 20.0 * Math.sin(2.0 * tlon * Math.PI)) * 2.0 / 3.0 +
    (20.0 * Math.sin(tlon * Math.PI) + 40.0 * Math.sin(tlon / 3.0 * Math.PI)) * 2.0 / 3.0 +
    (150.0 * Math.sin(tlon / 12.0 * Math.PI) + 300.0 * Math.sin(tlon / 30.0 * Math.PI)) * 2.0 / 3.0
  // 转维度
  var relat = -100.0 + 2.0 * tlon + 3.0 * tlat + 0.2 * tlat * tlat + 0.1 * tlon * tlat + 0.2 * Math.sqrt(Math.abs(tlon)) +
    (20.0 * Math.sin(6.0 * tlon * Math.PI) + 20.0 * Math.sin(2.0 * tlon * Math.PI)) * 2.0 / 3.0 +
    (20.0 * Math.sin(tlat * Math.PI) + 40.0 * Math.sin(tlat / 3.0 * Math.PI)) * 2.0 / 3.0 +
    (160.0 * Math.sin(tlat / 12.0 * Math.PI) + 320 * Math.sin(tlat * Math.PI / 30.0)) * 2.0 / 3.0

  var radLat = lat / 180.0 * Math.PI
  var magic = Math.sin(radLat)
  var magics = 1 - 0.00669342162296594323 * magic * magic
  var sqrtMagic = Math.sqrt(magics)
  var dlon = (relon * 180.0) / (6378245.0 / sqrtMagic * Math.cos(radLat) * Math.PI)
  var dLat = (relat * 180.0) / ((6378245.0 * (1 - 0.00669342162296594323)) / (magics * sqrtMagic) * Math.PI)

  Lonlat[0] = lon - dlon
  Lonlat[1] = lat - dLat
  return Lonlat
}

/**
 * 两点之间的距离 wgs84(球体距离)
 * @param {Number} plon1
 * @param {Number} plat1
 * @param {Number} plon2
 * @param {Number} plat2
 * @return {Number} distance(单位为千米)
 */
export function getDistance (plon1, plat1, plon2, plat2) {
  var radLat1 = plat1 * Math.PI / 180.0
  var radLat2 = plat2 * Math.PI / 180.0
  var radLon1 = plon1 * Math.PI / 180.0
  var radLon2 = plon2 * Math.PI / 180.0

  var a = radLat1 - radLat2
  var b = radLon1 - radLon2

  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))

  // 6378137为地球半径
  var distance = (Math.round(s * 6378137 * 10000) / 10000) / 1000
  return distance
}

/**
 * 判断点是否在圆内
 * @param {Array} point 判断点的坐标 wgs84
 * @param {Array} circleCenter 圆心坐标 wgs84
 * @param {Number} circleRadius 圆半径 单位 km
 * @return {Boolean} true 在  false 不在
 */
export function isPointInCircle (point, circleCenter, circleRadius) {
  var distanceBetweenPoints = getDistance(point[0], point[1], circleCenter[0], circleCenter[1])

  return distanceBetweenPoints < circleRadius
}

/**
 * 求给定距离和速度的时间
 * @param {Number} distance km
 * @param {Number} speed km/h
 * @return {String} time 00时00分00秒
 */
export function finaltime (distance, speed) {
  if (speed !== 0) {
    var time
    var finaltime = (distance / speed) * 3600
    var hour = Math.floor(finaltime / 3600)
    var Minute = Math.floor(finaltime / 60) % 60
    var second = finaltime % 60

    if (hour < 10) {
      time = '0' + hour + '时'
    } else {
      time = hour + '时'
    }

    if (Minute < 10) {
      time += '0'
    }
    time += Minute + '分'
    if (second < 10) {
      time += '0'
    }
    time += second.toFixed(0) + '秒'

    return time
  } else {
    return '00时00分00秒'
  }
}

/**
 * 要素图层显隐
 * @param {String} type 要素图层类型
 * @param {Boolean} isVisible
 */
export function showInfoLayer (type, isVisible) {
  try {
    if (type) {
      var mapLayers = app.map.getLayers().getArray()
      for (let i = 0; i < mapLayers.length; i++) {
        var layerType = mapLayers[i].getProperties().type
        if (layerType == type) {
          var showedLayer = mapLayers[i]
          showedLayer.setVisible(isVisible)
        }
      }
    }
  } catch (e) {
    console.log(e.name + ':' + e.message)
  }
}

/**
 * 定位到要素
 * @param {String} type 图层类型
 * @param {String} name 要素名称
 */
export function locateTo (type, name) {
  try {
    if (type) {
      var mapLayers = app.map.getLayers().getArray()
      var locateLayer
      for (i = 0; i < mapLayers.length; i++) {
        var layerType = mapLayers[i].getProperties().type
        if (layerType == type) {
          locateLayer = mapLayers[i]
          break
        }
      }
      var layerFeatures = locateLayer.getSource().getFeatures()
      var targetFeature
      for (i = 0; i < layerFeatures.length; i++) {
        var featureName = layerFeatures[i].getProperties().name
        if (featureName == name) {
          targetFeature = layerFeatures[i]
        }
      }
      if (targetFeature) {
        var mapView = app.map.getView()
        mapView.fit(targetFeature.getGeometry(), app.map.getSize(), { duration: 2000 })
      } else {
        console.log(0)
        return
      }
    }
  } catch (e) {
    console.log(e.name + ':' + e.message)
  }
}

/**
 * 定位到坐标点
 * @param {Number} lon wgs84
 * @param {Number} lat wgs84
 * @param {Number} zoom 显示层级
 */
export function pointTo (lon, lat, zoom) {
  try {
    const lonlat = wgs84ToWebMct(lon, lat)
    const mapView = store.getters.app.map.getView(store.getters.app.map.getSize())
    mapView.animate({ center: lonlat }, { zoom: zoom })
  } catch (e) {
    console.log(e.name + ':' + e.message)
  }
}

/**
 * 定位到范围  webMercartor
 * @param {ol.Extent} extent [minx,miny,maxx,maxy]
 */
function locateToExtent (extent) {
  try {
    var mapView = store.getters.app.map.getView()
    mapView.fit(extent, store.getters.app.map.getSize())
  } catch (e) {
    console.log(e.name + ':' + e.message)
  }
}

/**
 * 热力图
 * @type {String} 热力图类型  ais gps mixed
 * @param {Array[][]} arr 二维数组存放经纬度 [[120.19,30.26],[120.29,30.26],[120.29,30.36]]
 * @blur {Number} 数值越大，渲染程度越低
 * @radius {Number} 数值越大，单数据越明显
 * @gradient {Array[String]} 渲染颜色数组
 * @resolution {Number} 最小显示分辨率
 * @isVisible {Boolean} 是否显示热力图
 * @return {ol.layer.Heatmap}  heatMapVectorLayer 热力图
 */
function createHeatMap (type, arr, blur, radius, gradient, resolution, isVisible) {
  try {
    var features = []
    var ex = []
    for (var i = 0; i < arr.length; i++) {
      ex[i] = { type: 'Point', coordinates: [arr[i][0], arr[i][1]] }
      features.push(ex[i])
    }
    var heatData = {
      type: 'FeatureCollection',
      features: features
    }
    var vectorSource = new SVector({
      features: (new GeoJSON()).readFeatures(heatData, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      })
    })

    var heatMapVectorLayer = new Heatmap({
      type: type,
      gradient: gradient,
      source: vectorSource,
      blur: blur,
      radius: radius,
      minResolution: resolution,
      visible: isVisible ? true : isVisible
    })
    return heatMapVectorLayer
  } catch (e) {
    console.log(e.name + ':' + e.message)
  }
}

/**
 * 增加闪烁点
 * @param {Number} lon
 * @param {Number} lat
 * @param {String} id
 */
export function addFlashMarker (lon, lat, id) {
  try {
    var lonlat = wgs84ToWebMct(lon, lat)
    var flashMarker = HSymbol.getMarkerWithID({}, lonlat, 'red', id)
    store.getters.app.flashLayer.addMarkerSymbol([flashMarker])
    var flash_div = document.getElementById('css_animation')
    var flashOverlay = new Overlay({
      element: flash_div,
      positioning: 'center-center',
      offset: [0, 0],
      stopEvent: false
    })
    flashOverlay.setPosition(lonlat)
    store.getters.app.map.addOverlay(flashOverlay)
  } catch (e) {
    console.log(e.name + ':' + e.message)
  }
}

/**
 * 清除绘制要素及标注
 * @description 图层type为draw
 */
export function clearFeature () {
  // 清除绘制
  var coorLayers = store.getters.app.map.getLayers().getArray()
  for (var i = 0; i < coorLayers.length; i++) {
    var layerType = coorLayers[i].getProperties().type
    if (layerType === 'draw') {
      coorLayers[i].getSource().clear()
    }
  }
  // 清除标注
  var overlays = store.getters.app.map.getOverlays()
  // TODO 如果在ol.collection的遍历方法中使用map.removeOverlay方法，只会执行对半效果 1个要素1次 、2个1次、3个2次、4 2、5 3、6 3、 7 4 原因不明
  // 解决：1 可先用一个数组重新装载遍历后的图层，然后遍历新图层做移除操作 2 延时执行 故考虑遍历方法有异步
  // var clearOverlays = [];
  overlays.forEach(function (e) {
    // clearOverlays.push(e);
    setTimeout(function () {
      store.getters.app.map.removeOverlay(e)
    }, 0)
  }, this)
  // for(var i = 0;i<clearOverlays.length;i++){
  //     app.map.removeOverlay(clearOverlays[i]);
  // }
}

/**
 * 获取指定图层某范围内的要素
 * @param {ol.Extent} extent 当前地图范围
 * @param {ol.layer.Vector} layer 当前设置为显示的指定图层
 * @param {Function} callback 回调函数 用以处理获取到的要素
 */
function getFeatureInExtent (extent, layer, callback) {
  if (extent) {
    var features = layer.getSource().getFeaturesInExtent(extent)
    callback(features)
  }
}

/**
 * 计算两点确定直线的方向
 * @param {Number} startx 起点经度
 * @param {Number} starty 起点纬度
 * @param {Number} endx 终点经度
 * @param {Number} endy 终点纬度
 * @description 以正北方向为0 顺时针分割 范围0--360
 */
function calulateXYAngle (startx, starty, endx, endy) {
  var tan = Math.atan(Math.abs((endy - starty) / (endx - startx))) * 180 / Math.PI + 90
  if (endx > startx && endy > starty) { // 第一象限
    return -tan + 180
  } else if (endx > startx && endy < starty) { // 第二象限
    return tan
  } else if (endx < startx && endy > starty) { // 第三象限
    return tan + 180
  } else { // 第四象限
    return 360 - tan
  }
}

/**
 * 获取地图中心点坐标
 * @return {Array} centercoor 地图中心坐标数组 [120.32,118.21]
 */
function getMapCenter () {
  var view = store.getters.app.map.getView()
  var centerMercator = view.getCenter()
  var centercoor = webMctToWGS84(centerMercator[0], centerMercator[1])
  centercoor[0] = parseFloat(centercoor[0].toFixed(2))
  centercoor[1] = parseFloat(centercoor[1].toFixed(2))
  return centercoor
}

/**
 * 获取地图当前层级
 * @return {Number} mapZoom 地图中心层级
 */
export function getMapLevel () {
  var zoom = store.getters.app.map.getView().getZoom()
  if (zoom) {
    var mapLevel = Math.round(zoom)
  } else {
    var mapLevel = 18
  }
  return mapLevel
}

/**
 * 验证经纬度
 * @param {Number} longditude
 * @param {Number} latitude
 */
function validateCoordinates (longitude, latitude) {
  if (validateLon(longitude) && validateLat(latitude)) {
    return true
  } else {
    return false
  }
}

function validateLon (lon) {
  var longrg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,20})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,20}|180)$/
  if (lon == null || lon == '' || lon == undefined) {
    return false
  } else if (!longrg.test(lon)) {
    return false
  } else {
    return true
  }
}

function validateLat (lat) {
  var latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,20}|90\.0{0,20}|[0-8]?\d{1}|90)$/
  if (lat == null || lat == '' || lat == undefined) {
    return false
  } else if (!latreg.test(lat)) {
    return false
  } else {
    return true
  }
}

/**
 * 根据当前地图层级调整要素Text大小
 * @param {Number} level 地图层级
 * @param {Array} featureArray 要设置的要素集
 * @param {Number} scale text大小
 */
function adjustFeatureTextScaleAccordingToMapLevel (featureArray, level, scale) {
  if (featureArray.length != 0) {
    if (level > 15) {
      for (var i = 0; i < featureArray.length; i++) {
        featureArray[i].getStyle().getText().setScale(scale)
      }
    } else if (level < 16) {
      for (var i = 0; i < featureArray.length; i++) {
        featureArray[i].getStyle().getText().setScale(0)
      }
    }
  }
}

/** *******************************************测量工具**************************************************/
/**
 * 格式化距离(wgs84球体测距,返回真实距离)
 * @param {ol.geom.LineString} line
 * @return {String} 格式化后的距离
 */
// export function formatLength (line) {
//   var wgs84Sphere = new ol.Sphere(6378137)
//   var coordinates = line.getCoordinates()
//   var length = 0
//   var sourceProj = app.map.getView().getProjection()
//   for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
//     var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326')
//     var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326')
//     length += wgs84Sphere.haversineDistance(c1, c2)
//   }
//
//   var output
//   if (length > 100) {
//     output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km'
//   } else {
//     output = (Math.round(length * 100) / 100) + ' ' + 'm'
//   }
//   return output
// }

/**
 * 格式化面积(wgs84球体测面积,返回真实面积);
 * @param {ol.geom.Polygon} polygon
 * @return {String} 格式化后的面积
 */
// function formatArea (polygon) {
//   var wgs84Sphere = new ol.Sphere(6378137)
//   var area
//   var sourceProj = store.getters.app.map.getView().getProjection()
//   var geom = polygon.clone().transform(sourceProj, 'EPSG:4326')
//   var coordinates = geom.getLinearRing(0).getCoordinates()
//   area = Math.abs(wgs84Sphere.geodesicArea(coordinates))
//
//   var output
//   if (area > 10000) {
//     output = (Math.round(area / 1000000 * 100) / 100) + ' ' + 'km<sup>2</sup>'
//   } else {
//     output = (Math.round(area * 100) / 100) + ' ' + 'm<sup>2</sup>'
//   }
//   return output
// }

/**
 * 测量距离或面积
 * @param {String} drawType  LineString Polygon
 */
function distanceAndAreaMeasure (drawType) {
  var source = new Vector()
  var vector = new Vector({
    type: 'draw',
    source: source,
    style: new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.3)'
      }),
      stroke: new Stroke({
        color: '#1E90FF',
        width: 3
      })
    })
  })
  store.getters.app.map.addLayer(vector)
  var measurement// 绘制工具
  var measureTooltipElement// 当前测量值
  var measureTooltip// 当前测试提示
  var listener// 鼠标移动事件
  // 开始绘制
  measurement = new Draw({
    source: source,
    type: drawType,
    style: new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new Stroke({
        color: 'rgba(30, 144, 255, 1)',
        lineDash: [10, 10],
        width: 3
      }),
      image: new Circle({
        radius: 5,
        stroke: new Stroke({
          color: 'rgba(30, 144, 255, 0.7)'
        }),
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        })
      })
    })
  })
  measurement.on('drawstart',
    function (evt) {
      var fea = evt.feature// 绘制的要素
      var tooltipCoord = evt.coordinate
      fea.getGeometry().on('change', function (evt) {
        var geom = evt.target
        var output
        if (geom instanceof Polygon) {
          output = formatArea(geom)
          tooltipCoord = geom.getInteriorPoint().getCoordinates()
        } else if (geom instanceof LineString) {
          output = formatLength(geom)
          tooltipCoord = geom.getLastCoordinate()
        }
        measureTooltipElement.innerHTML = output
        measureTooltip.setPosition(tooltipCoord)
      })
    }, this)
  measurement.on('drawend', function (evt) {
    measureTooltipElement.className = 'tooltip tooltip-static'
    measureTooltip.setOffset([0, -7])
    store.getters.app.map.removeInteraction(measurement)
  }, this)
  store.getters.app.map.addInteraction(measurement)
  createMeasureTooltip()

  /**
   * 创建已测量的提示框
   */
  function createMeasureTooltip () {
    measureTooltipElement = document.createElement('div')
    measureTooltipElement.className = 'tooltip tooltip-measure'
    measureTooltip = new Overlay({
      id: 'measureid',
      element: measureTooltipElement,
      offset: [0, -15],
      positioning: 'bottom-center'
    })
    store.getters.app.map.addOverlay(measureTooltip)
  }
}

/** *******************************************测量工具**************************************************/
