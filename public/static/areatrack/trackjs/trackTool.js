/**
 * GIS基本操作工具集
 * created by zj on 2018.7.30
 */

/**
 * wgs84坐标转webMercator
 * @param {Number} lon
 * @param {Number} lat
 * @return {Array[Number]}} Lonlat
 */
function wgs84ToWebMct(lon, lat) {
  var Lonlat = ol.proj.fromLonLat([lon, lat])
  return Lonlat
}

/**
 * WebMercator转WGS84
 * @param {Number} lon
 * @param {Number} lat
 * @return {Array[Number]} Lonlat
 */
function webMctToWGS84(lon, lat) {
  var Lonlat = ol.proj.toLonLat([lon, lat])
  return Lonlat
}

/**
 * WGS-84转GCJ-02
 * @param {Number} lon
 * @param {Number} lat
 * @return {Array[Number]} Lonlat
 */

function WGS84ToGCJ02(lon, lat) {
  var Lonlat = []
  //参数转换
  var tlon = lon - 105.0
  var tlat = lat - 35.0

  //转经度
  var relon = 300.0 + tlon + 2.0 * tlat + 0.1 * tlon * tlon + 0.1 * tlon * tlat + 0.1 * Math.sqrt(Math.abs(tlon)) +
    (20.0 * Math.sin(6.0 * tlon * Math.PI) + 20.0 * Math.sin(2.0 * tlon * Math.PI)) * 2.0 / 3.0 +
    (20.0 * Math.sin(tlon * Math.PI) + 40.0 * Math.sin(tlon / 3.0 * Math.PI)) * 2.0 / 3.0 +
    (150.0 * Math.sin(tlon / 12.0 * Math.PI) + 300.0 * Math.sin(tlon / 30.0 * Math.PI)) * 2.0 / 3.0
  //转纬度
  var relat = -100.0 + 2.0 * tlon + 3.0 * tlat + 0.2 * tlat * tlat + 0.1 * tlon * tlat + 0.2 * Math.sqrt(Math.abs(tlon)) +
    (20.0 * Math.sin(6.0 * tlon * Math.PI) + 20.0 * Math.sin(2.0 * tlon * Math.PI)) * 2.0 / 3.0 +
    (20.0 * Math.sin(tlat * Math.PI) + 40.0 * Math.sin(tlat / 3.0 * Math.PI)) * 2.0 / 3.0 +
    (160.0 * Math.sin(tlat / 12.0 * Math.PI) + 320 * Math.sin(tlat * Math.PI / 30.0)) * 2.0 / 3.0

  var radLat = lat / 180.0 * Math.PI
  var magic = Math.sin(radLat)
  var magics = 1 - 0.00669342162296594323 * magic * magic
  var sqrtMagic = Math.sqrt(magics)
  var dlon = (relon * 180.0) / (6378245.0 / sqrtMagic * Math.cos(radLat) * Math.PI)
  var dLat = (relat * 180.0) / ((6378245.0 * (1 - 0.00669342162296594323)) / (magic * sqrtMagic) * Math.PI)

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
function GCJ02ToWGS84(lon, lat) {
  var Lonlat = []
  //参数转换
  var tlon = lon - 105.0
  var tlat = lat - 35.0

  //转经度
  var relon = 300.0 + tlon + 2.0 * tlat + 0.1 * tlon * tlon + 0.1 * tlon * tlat + 0.1 * Math.sqrt(Math.abs(tlon)) +
    (20.0 * Math.sin(6.0 * tlon * Math.PI) + 20.0 * Math.sin(2.0 * tlon * Math.PI)) * 2.0 / 3.0 +
    (20.0 * Math.sin(tlon * Math.PI) + 40.0 * Math.sin(tlon / 3.0 * Math.PI)) * 2.0 / 3.0 +
    (150.0 * Math.sin(tlon / 12.0 * Math.PI) + 300.0 * Math.sin(tlon / 30.0 * Math.PI)) * 2.0 / 3.0
  //转维度
  var relat = -100.0 + 2.0 * tlon + 3.0 * tlat + 0.2 * tlat * tlat + 0.1 * tlon * tlat + 0.2 * Math.sqrt(Math.abs(tlon)) +
    (20.0 * Math.sin(6.0 * tlon * Math.PI) + 20.0 * Math.sin(2.0 * tlon * Math.PI)) * 2.0 / 3.0 +
    (20.0 * Math.sin(tlat * Math.PI) + 40.0 * Math.sin(tlat / 3.0 * Math.PI)) * 2.0 / 3.0 +
    (160.0 * Math.sin(tlat / 12.0 * Math.PI) + 320 * Math.sin(tlat * Math.PI / 30.0)) * 2.0 / 3.0

  var radLat = lat / 180.0 * Math.PI
  var magic = Math.sin(radLat)
  var magics = 1 - 0.00669342162296594323 * magic * magic
  var sqrtMagic = Math.sqrt(magics)
  var dlon = (relon * 180.0) / (6378245.0 / sqrtMagic * Math.cos(radLat) * Math.PI)
  var dLat = (relat * 180.0) / ((6378245.0 * (1 - 0.00669342162296594323)) / (magic * sqrtMagic) * Math.PI)

  Lonlat[0] = lon - dlon
  Lonlat[1] = lat - dLat
  return Lonlat
}

/**
 * 两点之间的距离 wgs84
 * @param {Number} plon1
 * @param {Number} plat1
 * @param {Number} plon2
 * @param {Number} plat2
 * @return {Number} distance(单位为千米)
 */
function getDistance(plon1, plat1, plon2, plat2) {

  var radLat1 = plat1 * Math.PI / 180.0
  var radLat2 = plat2 * Math.PI / 180.0
  var radLon1 = plon1 * Math.PI / 180.0
  var radLon2 = plon2 * Math.PI / 180.0

  var a = radLat1 - radLat2
  var b = radLon1 - radLon2

  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))

  //6378137为地球半径
  var distance = (Math.round(s * 6378137 * 10000) / 10000) / 1000
  return distance
}

function getMapLevel() {
  var view = trackapp.map.getView()
  var mapLevel = view.getZoom()
  return mapLevel
}

/**
 * 要素图层显隐
 * @param {String} type 要素图层类型
 * @param {Boolean} isVisible
 */
function showInfoLayer(type, isVisible) {
  try {
    if (type) {
      var mapLayers = trackapp.map.getLayers().getArray()
      console.log(mapLayers)
      for (var i = 0; i < mapLayers.length; i++) {
        var layerType = mapLayers[i].getProperties()['type']
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
function locateTo(type, name) {
  try {
    if (type) {
      var mapLayers = trackapp.map.getLayers().getArray()
      var locateLayer
      for (i = 0; i < mapLayers.length; i++) {
        var layerType = mapLayers[i].getProperties()['type']
        if (layerType == type) {
          locateLayer = mapLayers[i]
          break
        }
      }
      var layerFeatures = locateLayer.getSource().getFeatures()
      var targetFeature
      for (i = 0; i < layerFeatures.length; i++) {
        var featureName = layerFeatures[i].getProperties()['name']
        if (featureName == name) {
          targetFeature = layerFeatures[i]
        }
      }
      var mapView = trackapp.map.getView()
      mapView.fit(targetFeature.getGeometry(), trackapp.map.getSize(), {duration: 2000})
    }
  } catch (e) {
    console.log(e.name + ':' + e.message)
  }
}

/**
 * 定位到轨迹船舶
 * @param {String} type 图层类型
 * @param {String} name 要素名称
 */
function locateToShip(type, name) {
  try {
    if (type) {
      var mapLayers = trackapp.map.getLayers().getArray()
      var locateLayer
      for (i = 0; i < mapLayers.length; i++) {
        var layerType = mapLayers[i].getProperties()['type']
        if (layerType == type) {
          locateLayer = mapLayers[i]
          break
        }
      }
      var layerFeatures = locateLayer.getSource().getFeatures()
      var targetFeature
      for (i = 0; i < layerFeatures.length; i++) {
        var featureName = layerFeatures[i].getProperties()['shipName']
        if (featureName == name) {
          targetFeature = layerFeatures[i]
        }
      }
      var mapView = trackapp.map.getView()
      mapView.fit(targetFeature.getGeometry(), trackapp.map.getSize(), {duration: 2000})
    }
  } catch (e) {
    console.log(e.name + ':' + e.message)
  }
}

/**
 * 定位到坐标点
 * @param {Number} lon wgs84
 * @param {Number} lat wgs84
 */
function pointTo(lon, lat) {
  try {
    var lonlat = wgs84ToWebMct(lon, lat)
    var mapView = trackapp.map.getView(trackapp.map.getSize())
    mapView.animate({center: lonlat}, {zoom: 14})
  } catch (e) {
    console.log(e.name + ':' + e.message)
  }
}

/***************************************区域轨迹业务逻辑开始******************************/
/**
 * 绘制区域
 */
function drawBox() {
  cleaBox()
  var drawSource = new ol.source.Vector({wrapX: false})
  var drawVector = new ol.layer.Vector({
    source: drawSource,
    type: 'draw'
  })
  trackapp.map.addLayer(drawVector)
  var GIS_BOXDRAW
  var geometryFunction = ol.interaction.Draw.createBox()

  GIS_BOXDRAW = new ol.interaction.Draw({
    source: drawSource,
    type: 'Circle',
    geometryFunction: geometryFunction
  })

  //绘制显示的要素样式
  var featureStyle = new ol.style.Style({
    fill: new ol.style.Fill({
      color: [255, 255, 255, 0.3]
    }),
    stroke: new ol.style.Stroke({
      color: [24, 144, 255],
      width: 3
    })
  })

  GIS_BOXDRAW.on('drawend', function(evt) {
    var fea = evt.feature
    if (featureStyle != null) {// 如果传入不为空，则使用自定义样式
      fea.setStyle([featureStyle])
    }
    var boxCoor = fea.getGeometry().getCoordinates()[0]//区域坐标
    var minLonlat = webMctToWGS84(boxCoor[0][0], boxCoor[0][1])//左下坐标
    var maxLonlat = webMctToWGS84(boxCoor[2][0], boxCoor[2][1])//右上坐标
    trackapp.minLongitude = minLonlat[0]
    trackapp.minLatitude = minLonlat[1]
    trackapp.maxLongitude = maxLonlat[0]
    trackapp.maxLatitude = maxLonlat[1]
    trackapp.map.removeInteraction(GIS_BOXDRAW)
  }, this)
  trackapp.map.addInteraction(GIS_BOXDRAW)
}

/**
 * 清除绘制区域
 */
function cleaBox() {
  delete trackapp.minLongitude
  delete trackapp.minLatitude
  delete trackapp.maxLongitude
  delete trackapp.maxLatitude
  //清除区域
  var trackLayers = trackapp.map.getLayers().getArray()
  for (i = 0; i < trackLayers.length; i++) {
    var layerType = trackLayers[i].getProperties()['type']
    if (layerType == 'draw') {
      trackapp.map.removeLayer(trackLayers[i])
    }
  }
}

/**
 * 显示轨迹
 */
function showTrack() {
  showInfoLayer('trackPoint', true)
  showInfoLayer('trackLine', true)
}

/**
 * 隐藏轨迹
 */
function hideTrack() {
  showInfoLayer('trackPoint', false)
  showInfoLayer('trackLine', false)
}

/***************************************区域轨迹业务逻辑结束******************************/

/***************************************历史轨迹业务逻辑开始******************************/

/**
 * 添加历史轨迹
 * @param {String} shipName 船名
 * @param {String} minReceiveTime 最小时间
 * @param {String} maxReceiveTime 最大时间
 */
function clearHistoryTrack() {
  trackapp.historyTrackLayer.clear()
  //历史轨迹切换到区域轨迹时清除测量提示
  var overlays = trackapp.map.getOverlays()
  overlays.forEach(function(e) {
    setTimeout(function() {
      trackapp.map.removeOverlay(e)
    }, 0)
  }, this)
  //清除船舶移动
  clearInterval(trackapp.moving)
  trackapp.movingLayer.getSource().clear()
}

function clearShipTrack() {
  trackapp.historyTrackLayer.clear()
}

function addHistoryTrack(zwcm, starTime, endTime) {
  trackapp.historyTrackLayer.clear()
  var distanceElement // 当前测量值
  var distanceoverlay // 当前测试提示
  var lastPt //上点坐标
  var lastTime //上点时间
  var getUrl = GIS_HISTORYSHIP + 'zwcm=' + zwcm + '&' + 'starTime=' + starTime + '&'
    + 'endTime=' + endTime
  $.ajax({
    url: getUrl,
    type: 'get',
    dataType: 'json',
    async: false,
    success: function(d) {
      var lineSymbol = []
      var markerSymbol = []
      var onePositionArray = []
      var shipData = d.data
      var trackPointSymbol
      if (shipData.length === 0) {
        alert('信号轨迹数据不存在')
        return
      }

      $.each(shipData, function(i, item) {
        var isValid = true //过滤判断
        //添加轨迹点(统一添加) 船名 接收时间 船速和船向
        var lonlat = wgs84ToWebMct(item['longitude'], item['latitude'])
        var pt = [item['longitude'], item['latitude']]
        var time = item['receiveTimeString']
        if (lastPt) {
          var distance = getDistance(lastPt[0], lastPt[1], pt[0], pt[1])
          if (distance < 0.065 || distance > 80) {// 距离过近或过远
            isValid = false
          } else {
            // console.log(distance)
          }
        } else if (lastTime && lastTime == time) {// 同个时间
          isValid = false
        }

        if (isValid) {
          if (i == 0) {
            trackPointSymbol = HSymbol.getTrackMarker({
              'type': 'trackPoint', 'name': item['shipName'], 'receiveTime': item['receiveTimeString'],
              'speed': item['speed']
            }, lonlat, [50, 205, 50], [50, 205, 50], 1.5, 5)
          } else if (i == shipData.length - 1) {
            trackPointSymbol = HSymbol.getTrackMarker({
              'type': 'trackPoint', 'name': item['shipName'], 'receiveTime': item['receiveTimeString'],
              'speed': item['speed']
            }, lonlat, [255, 69, 0], [255, 69, 0], 1.5, 5)
          } else {
            trackPointSymbol = HSymbol.getTrackMarker({
              'type': 'trackPoint', 'name': item['shipName'], 'receiveTime': item['receiveTimeString'],
              'speed': item['speed']
            }, lonlat, [255, 250, 250], [255, 215, 0], 1.5, 5)
          }
          onePositionArray.push(lonlat)
          markerSymbol.push(trackPointSymbol)
        }
        lastPt = pt
        lastTime = time
      })
      // 添加轨迹线
      var trackLineSymbol = HSymbol.getLineSymbol({
        'type': 'trackLine',
        'name': 'history'
      }, onePositionArray, [255, 48, 48], 2)
      lineSymbol.push(trackLineSymbol)
      trackapp.historyTrackLayer.addLineSymbol(lineSymbol)
      trackapp.historyTrackLayer.addMarkerSymbol(markerSymbol)

      createDistanceoverlay()

      // 创建测量结果提示框
      function createDistanceoverlay() {
        var overlays = trackapp.map.getOverlays()
        overlays.forEach(function(e) {
          setTimeout(function() {
            trackapp.map.removeOverlay(e)
          }, 0)
        }, this)
        distanceElement = document.createElement('div')
        distanceElement.className = 'tooltip tooltip-static'
        distanceoverlay = new ol.Overlay({
          id: 'measureid',
          element: distanceElement,
          offset: [0, -15],
          positioning: 'bottom-center'
        })
        trackapp.map.addOverlay(distanceoverlay)
      }

      var linegeom = trackLineSymbol.getGeometry()
      var output = formatLength(linegeom)
      var overlayCoord = linegeom.getLastCoordinate()

      distanceElement.innerHTML = output
      distanceoverlay.setPosition(overlayCoord)
      locateTo('historytrack', 'history')

      // 添加历史轨迹移动
      // historyTrackMove(shipData)
    }
  })
}

function areaShipTrack(shipData) {
  // trackapp.historyTrackLayer.clear()
  var distanceElement // 当前测量值
  var distanceoverlay // 当前测试提示
  var lastPt //上点坐标
  var lastTime //上点时间
  var lineSymbol = []
  var markerSymbol = []
  var onePositionArray = []
  var trackPointSymbol
  $.each(shipData, function(i, item) {
    var isValid = true //过滤判断
    //添加轨迹点(统一添加) 船名 接收时间 船速和船向
    var lonlat = wgs84ToWebMct(item['longitude'], item['latitude'])
    var pt = [item['longitude'], item['latitude']]
    var time = item['receiveTimeString']
    if (lastPt) {
      var distance = getDistance(lastPt[0], lastPt[1], pt[0], pt[1])
      if (distance < 0.065 || distance > 80) {// 距离过近或过远
        isValid = false
      } else {
        // console.log(distance)
      }
    } else if (lastTime && lastTime == time) {// 同个时间
      isValid = false
    }

    if (isValid) {
      if (i == 0) {
        trackPointSymbol = HSymbol.getTrackMarker({
          'type': 'trackPoint', 'name': item['shipName'], 'receiveTime': item['receiveTimeString'],
          'speed': item['speed']
        }, lonlat, [255,0,0], [255,0,0], 0.5, 1)
      } else if (i == shipData.length - 1) {
        trackPointSymbol = HSymbol.getTrackMarker({
          'type': 'trackPoint', 'name': item['shipName'], 'receiveTime': item['receiveTimeString'],
          'speed': item['speed']
        }, lonlat, [255,0,0], [255,0,0], 0.5, 1)
      } else {
        trackPointSymbol = HSymbol.getTrackMarker({
          'type': 'trackPoint', 'name': item['shipName'], 'receiveTime': item['receiveTimeString'],
          'speed': item['speed']
        }, lonlat, [255,0,0], [255,0,0], 0.5, 1)
      }
      onePositionArray.push(lonlat)
      markerSymbol.push(trackPointSymbol)
    }
    lastPt = pt
    lastTime = time
  })
  // 添加轨迹线
  var trackLineSymbol = HSymbol.getLineSymbol({
    'type': 'trackLine',
    'name': 'history'
  }, onePositionArray, [255, 48, 48], 2)
  // lineSymbol.push(trackLineSymbol)
  trackapp.historyTrackLayer.addLineSymbol(lineSymbol)
  trackapp.historyTrackLayer.addMarkerSymbol(markerSymbol)

  createDistanceoverlay()

  // 创建测量结果提示框
  function createDistanceoverlay() {
    var overlays = trackapp.map.getOverlays()
    overlays.forEach(function(e) {
      setTimeout(function() {
        trackapp.map.removeOverlay(e)
      }, 0)
    }, this)
    distanceElement = document.createElement('div')
    distanceElement.className = 'tooltip tooltip-static'
    distanceoverlay = new ol.Overlay({
      id: 'measureid',
      element: distanceElement,
      offset: [0, -15],
      positioning: 'bottom-center'
    })
    trackapp.map.addOverlay(distanceoverlay)
  }

  var linegeom = trackLineSymbol.getGeometry()
  var output = formatLength(linegeom)
  var overlayCoord = linegeom.getLastCoordinate()

  distanceElement.innerHTML = output
  distanceoverlay.setPosition(overlayCoord)
  locateTo('historytrack', 'history')

  // 添加历史轨迹移动
  // historyTrackMove(shipData)
}

/**
 * 格式化距离(wgs84球体测距,返回真实距离)
 * @param {ol.geom.LineString} line
 * @return {String} 格式化后的距离
 */
function formatLength(line) {
  var wgs84Sphere = new ol.Sphere(6378137)
  var coordinates = line.getCoordinates()
  var length = 0
  var sourceProj = trackapp.map.getView().getProjection()
  for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
    var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326')
    var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326')
    length += wgs84Sphere.haversineDistance(c1, c2)
  }

  var output
  if (length > 100) {
    output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km'
  } else {
    output = (Math.round(length * 100) / 100) + ' ' + 'm'
  }
  return output
}

/**
 * 船舶图标移动
 */
function historyTrackMove(data) {
  //添加移动要素图层
  trackapp.movingLayer = new ol.layer.Vector({
    source: new ol.source.Vector()
  })
  trackapp.map.addLayer(trackapp.movingLayer)
  //整理传入的数据
  trackapp.movePoints = []//整理后的轨迹点
  var groupAmount = data.length - 1
  var minTime = strToDateforSecond(data[0].receiveTimeString)//开始时间
  trackapp.playbackTime = minTime
  var maxTime = strToDateforSecond(data[groupAmount].receiveTimeString)//结束时间
  var timeSpan = maxTime - minTime//总的时间跨度
  var count = timeSpan / 1000//总的位置点
  trackapp.timeInterval = timeSpan / count
  for (var i = 0; i < groupAmount; i++) {
    var moveGroup = {}
    var firstCoor = wgs84ToWebMct(data[i].longitude, data[i].latitude)
    var secondCoor = wgs84ToWebMct(data[i + 1].longitude, data[i + 1].latitude)
    var firstTimeStamp = strToDateforSecond(data[i].receiveTimeString)
    var secondTimeStamp = strToDateforSecond(data[i + 1].receiveTimeString)
    var timeRate = (secondTimeStamp - firstTimeStamp) / timeSpan
    var groupCount = parseInt(count * timeRate)
    //每组的第一个点坐标
    moveGroup.firstCoor = firstCoor
    //每组的第二个点坐标
    moveGroup.secondCoor = secondCoor
    //每组的第一个时刻点
    moveGroup.firstTimeStamp = firstTimeStamp
    //每组的第二个时刻点
    moveGroup.secondTimeStamp = secondTimeStamp
    //每组的时刻点
    moveGroup.groupCount = groupCount
    //每组的移动角度
    moveGroup.rotation = calAngle(firstCoor[0], firstCoor[1], secondCoor[0], secondCoor[1])
    trackapp.movePoints.push(moveGroup)
  }
  //初始化要素
  var moveFeature = new ol.Feature({
    geometry: new ol.geom.Point(trackapp.movePoints[0].firstCoor)
  })
  moveFeature.setStyle(
    new ol.style.Style({
      image: new ol.style.Icon({
        src: 'img/ship.png',
        rotateWithView: false,
        rotation: trackapp.movePoints[0].rotation,
        scale: 1
      })
    })
  )
  trackapp.movingLayer.getSource().addFeature(moveFeature)
  //开始移动
  movingStart(0, 10, 1, trackapp.movePoints)
}

/**
 * 开始移动
 */
function movingStart(start, speed, startPosition, points) {
  trackapp.speed = speed
  if (points.length == 0) {
    return
  }
  if (start == points.length) {
    return
  }
  //移动要素
  var x1 = points[start].firstCoor[0]
  var y1 = points[start].firstCoor[1]
  var x2 = points[start].secondCoor[0]
  var y2 = points[start].secondCoor[1]
  var count = points[start].groupCount//时间段内位置点数量
  var nextAngle = points[start].rotation
  var moveFeature = trackapp.movingLayer.getSource().getFeatures()[0]
  moveFeature.getStyle().getImage().setRotation(nextAngle)
  trackapp.moving = setInterval(function() {
    trackapp.playbackTime = trackapp.playbackTime + trackapp.timeInterval
    var midxPostion = (x2 - x1) * Math.abs(startPosition / count) + x1
    var midyPostion = (y2 - y1) * Math.abs(startPosition / count) + y1
    var nextGeometry = new ol.geom.Point([midxPostion, midyPostion])
    moveFeature.setGeometry(nextGeometry)
    startPosition++
    if (startPosition > count) {
      clearInterval(trackapp.moving)
      start = start + 1
      movingStart(start, speed, 1, points)
    }
  }, trackapp.speed)
}

/**
 * 暂停
 */
function movingPause() {
  clearInterval(trackapp.moving)
}

/**
 * 继续
 */
function movingContinue() {
  clearInterval(trackapp.moving)
  var start
  var startPosition
  for (var i = 0; i < trackapp.movePoints.length; i++) {
    var targetGroup = trackapp.movePoints[i]
    if (trackapp.playbackTime > targetGroup.firstTimeStamp && trackapp.playbackTime < targetGroup.secondTimeStamp) {
      start = i
      startPosition = parseInt((trackapp.playbackTime - targetGroup.firstTimeStamp) / (targetGroup.secondTimeStamp - targetGroup.firstTimeStamp) * targetGroup.groupCount)
      break
    }
  }
  if (start == undefined) {
    return
  }
  movingStart(start, trackapp.speed, startPosition, trackapp.movePoints)
}

/**
 * 加速
 */
function movingAccelerate() {
  clearInterval(trackapp.moving)
  var start
  var startPosition
  for (var i = 0; i < trackapp.movePoints.length; i++) {
    var targetGroup = trackapp.movePoints[i]
    if (trackapp.playbackTime > targetGroup.firstTimeStamp && trackapp.playbackTime < targetGroup.secondTimeStamp) {
      start = i
      startPosition = parseInt((trackapp.playbackTime - targetGroup.firstTimeStamp) / (targetGroup.secondTimeStamp - targetGroup.firstTimeStamp) * targetGroup.groupCount)
      break
    }
  }
  if (start == undefined) {
    return
  }
  movingStart(start, 1, startPosition, trackapp.movePoints)
}

/**
 * 减速
 */
function movingDecrease() {
  clearInterval(trackapp.moving)
  var start
  var startPosition
  for (var i = 0; i < trackapp.movePoints.length; i++) {
    var targetGroup = trackapp.movePoints[i]
    if (trackapp.playbackTime > targetGroup.firstTimeStamp && trackapp.playbackTime < targetGroup.secondTimeStamp) {
      start = i
      startPosition = parseInt((trackapp.playbackTime - targetGroup.firstTimeStamp) / (targetGroup.secondTimeStamp - targetGroup.firstTimeStamp) * targetGroup.groupCount)
      break
    }
  }
  if (start == undefined) {
    return
  }
  movingStart(start, 100, startPosition, trackapp.movePoints)
}

/**
 * 时间点跳跃
 * @param {Object} timeStamp
 */
function movingJump(timeStamp) {
  trackapp.playbackTime = timeStamp
  clearInterval(trackapp.moving)
  var start
  var startPosition
  for (var i = 0; i < trackapp.movePoints.length; i++) {
    var targetGroup = trackapp.movePoints[i]
    if (trackapp.playbackTime > targetGroup.firstTimeStamp && trackapp.playbackTime < targetGroup.secondTimeStamp) {
      start = i
      startPosition = parseInt((trackapp.playbackTime - targetGroup.firstTimeStamp) / (targetGroup.secondTimeStamp - targetGroup.firstTimeStamp) * targetGroup.groupCount)
      break
    }
  }
  if (start == undefined) {
    return
  }
  movingStart(start, trackapp.speed, startPosition, trackapp.movePoints)
}

/**
 * 计算icon偏移角度
 * @param {Number} startX
 * @param {Number} startY
 * @param {Number} endX
 * @param {Number} endY
 */
function calAngle(startX, startY, endX, endY) {
  var angle = -Math.atan2(startY - endY, startX - endX) - 0.5 * Math.PI
  return angle
}

/**
 * 转化时间戳
 * @param {Object} timestr
 */
function strToDateforSecond(timestr) {
  var tDate = new Date(timestr)
  var timeStamp = Date.parse(tDate)
  return timeStamp
}

/***************************************历史轨迹业务逻辑结束******************************/
