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
 * 要素图层显隐
 * @param {String} type 要素图层类型
 * @param {Boolean} isVisible
 */
function showInfoLayer(type, isVisible) {
  try {
    if (type) {
      var mapLayers = coorapp.map.getLayers().getArray()
      for (i = 0; i < mapLayers.length; i++) {
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
 * 绘制要素
 */
function drawFeature() {
  // 重新绘制前清除绘制
  clearFeature()
  var drawSource = new ol.source.Vector({wrapX: false})
  var drawVector = new ol.layer.Vector({
    source: drawSource,
    type: 'draw'
  })
  coorapp.map.addLayer(drawVector)
  var GIS_DRAW

  var drawType = $('#edit').attr('editType')
  if (drawType && drawType == 'Point') {
    GIS_DRAW = new ol.interaction.Draw({
      source: drawSource,
      type: drawType
    })

    // 绘制显示的要素样式
    var featureStyle = new ol.style.Style({
      fill: new ol.style.Fill({
        color: [255, 255, 255, 0.8]
      }),
      stroke: new ol.style.Stroke({
        color: 'black',
        width: 2,
        lineDash: [1, 2, 3, 4]
      }),
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: [127, 255, 0]
        }),
        stroke: new ol.style.Stroke({
          color: 'black',
          width: 2
        })
      })
    })
    GIS_DRAW.on('drawend', function(evt) {
      var fea = evt.feature
      fea.setStyle([featureStyle])
      var coor = fea.getGeometry().getCoordinates()
      var newPointcoor = webMctToWGS84(coor[0], coor[1])
      var coordinate = [parseFloat(newPointcoor[0].toFixed(4)), parseFloat(newPointcoor[1].toFixed(4))]
      console.log(parent)
      parent.postMessage({
        act: 'modgis',
        msg: {
          coordinate: coordinate
        }
      }, '*')
      coorapp.map.removeInteraction(GIS_DRAW)
      $('#edit').attr('value', '重新绘制')
    }, this)
    coorapp.map.addInteraction(GIS_DRAW)
  } else if (drawType && drawType == 'Polygon') {
    GIS_DRAW = new ol.interaction.Draw({
      source: drawSource,
      type: drawType
    })

    // 绘制显示的要素样式
    var featureStyle = new ol.style.Style({
      fill: new ol.style.Fill({
        color: [255, 255, 255, 0.8]
      }),
      stroke: new ol.style.Stroke({
        color: [30, 144, 255],
        width: 2,
        lineDash: [1, 2, 3, 4]
      }),
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: [127, 255, 0]
        }),
        stroke: new ol.style.Stroke({
          color: 'black',
          width: 2
        })
      })
    })
    coorapp.areaObj = {brushColor: '', fillColor: '', brushThickness: 10}// 区域json
    coorapp.areaPoints = []// 存放区域轨迹数组
    GIS_DRAW.on('drawend', function(evt) {
      var fea = evt.feature
      if (featureStyle != null) { // 如果传入不为空，则使用自定义样式
        fea.setStyle([featureStyle])
      }
      var coors = fea.getGeometry().getCoordinates()
      // 计算区域重心
      var turfPolygon = turf.polygon(coors)
      var areaCentroid = turf.centroid(turfPolygon).geometry.coordinates
      coorapp.areaCenter = webMctToWGS84(areaCentroid[0], areaCentroid[1])
      console.log(coorapp.areaCenter)
      // 重定义边界
      var areaCoor = coors[0]
      for (i = 0; i < areaCoor.length; i++) {
        var lonlat = webMctToWGS84(areaCoor[i][0], areaCoor[i][1])
        var areaPoint = {}// 单个点json
        areaPoint.x = lonlat[0]
        areaPoint.y = lonlat[1]
        coorapp.areaPoints.push(areaPoint)
      }
      coorapp.areaObj.pointList = coorapp.areaPoints
      coorapp.areaObjStr = JSON.stringify(coorapp.areaObj)
      parent.postMessage({
        act: 'coor',
        msg: {
          name: coorapp.areaObjStr,
          center: coorapp.areaCenter
        }
      }, '*')
      coorapp.map.removeInteraction(GIS_DRAW)
      $('#edit').attr('value', '重新绘制')
    }, this)
    coorapp.map.addInteraction(GIS_DRAW)
  }
}

/**
 * 清除绘制要素
 */
function clearFeature() {
  var coorLayers = coorapp.map.getLayers().getArray()
  for (i = 0; i < coorLayers.length; i++) {
    var layerType = coorLayers[i].getProperties()['type']
    if (layerType == 'draw') {
      coorapp.map.removeLayer(coorLayers[i])
    }
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
      var mapLayers = coorapp.map.getLayers().getArray()
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
      if (targetFeature) {
        var mapView = coorapp.map.getView()
        mapView.fit(targetFeature.getGeometry(), coorapp.map.getSize(), {duration: 2000})
      } else {
        console.log(0)
        return
      }
    }
  } catch (e) {
    console.log(e.name + ':' + e.message)
  }
}
