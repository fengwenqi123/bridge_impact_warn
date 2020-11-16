/**
 * GIS要素数据加载js
 * created by zj on 2018.8.30
 */

/*******************************************要素获取及展示方法开始****************************************/
/**
 * 分层加载要素数据
 * @param {String} type 加载业务要素类型
 * @description 除船舶图层外,其他要素初始化时顺次添加一次
 */
function loadInfoLayer(type) {
  if ((type == null || type === 'managearea') && app.manageareaLayer) loadManageArea()
  if ((type == null || type === 'maodi') && app.anchorageareaLayer) loadAnchorageArea()
  if ((type == null || type === 'safework') && app.safeworkareaLayer) loadSafeArea()
  if ((type == null || type === 'limitarea') && app.limitsailingareaLayer) loadLimitArea()
  if ((type == null || type === 'marea') && app.monitorareaLayer) loadMonitorArea()
  if ((type == null || type === 'video') && app.videoLayer) loadVideo()
  if ((type == null || type === 'aisBase') && app.aisBasestationLayer) loadAISBasestation()
  if ((type == null || type === 'vhfBase') && app.vhfBasestationLayer) loadVHFBasestation()
  if ((type == null || type === 'rfidBase') && app.rfidBasestationLayer) loadRFIDBasestation()
  if ((type == null || type === 'portEnterprise') && app.portEnterpriseLayer) loadportEnterprise()
  if ((type == null || type === 'hydrology') && app.hydrologyLayer) loadHydrology()
  if ((type == null || type === 'ferry') && app.ferryLayer) loadFerry()
  if ((type == null || type === 'dangerstore') && app.dangerstoreLayer) loadDangerStore()
  if ((type == null || type === 'matou') && app.matouLayer) loadMatou()
  if ((type == null || type === 'support') && app.emergentSourceLayer) loadSupport()
  if ((type == null || type === 'hszs') && app.hszsStationLayer) loadHszs()
  if ((type == null || type === 'kakou') && app.kakouLayer) loadKakou()
  if ((type == null || type === 'collection') && app.collectionPointLayer) loadCollectionLayer()
  if ((type == null || type === 'bridge') && app.bridgeLayer) loadBridgeLayer()
  if ((type == null || type === 'contaminated') && app.contaminatedLayer) loadContaminatedLayer()
  if ((type == null || type === 'airquality') && app.airqualityLayer) loadAirQualityLayer()
  if ((type == null || type === 'segment') && app.segmentLayer) loadSegment()
  if (app.DLHSMarkersLayer && app.DLHSFeaturesLayer) loadDLHSFeatureStyles()
  if ((type == null || type === 'emergencyteam') && app.emergencyTeamLayer) loadEmergencyTeam()
  if ((type == null || type === 'materialreservepoint') && app.materialReservePointLayer) loadMaterialReservePoint()
}

/**
 * 加载危化品存储
 */
function loadDangerStore() {
  $.ajax({
    url: GIS_SERVERIP + '/gis/dangerousStorage/list',
    type: 'get',
    dataType: 'json',
    async: true,
    success: function(d) {
      var markerSymbol = []
      app.dangerstoreLayer.clear()
      $.each(d.data, function(i, item) {
        var dsAttr = {
          'datatype': 'dangerstore',
          'name': item.enterpriseName,
          'id': item.id
        }
        if (validateCoordinates(item.longitude, item.latitude)) {
          var lonlat = wgs84ToWebMct(parseFloat(item.longitude), parseFloat(item.latitude))
          var dsSymbol = HSymbol.getPictureMarkerSymbol(dsAttr, lonlat, 'img/dangerstore.png', 0.7, item.enterpriseName, 13, [0, 0, 0], -20, -20)
          markerSymbol.push(dsSymbol)
        }
      })
      app.dangerstoreLayer.addMarkerSymbol(markerSymbol)
    }
  })
}

/**
 * 加载港口企业
 */
function loadportEnterprise() {
  $.ajax({
    url: GIS_SERVERIP + '/gis/portEnterpriseInformation/list',
    type: 'get',
    dataType: 'json',
    async: true,
    success: function(d) {
      var markerSymbol = []
      app.portEnterpriseLayer.clear()
      $.each(d.data, function(i, item) {
        var gkqyAttr = {
          'datatype': 'portEnterprise',
          'name': item.name,// 港口经营人/企业名称
          'id': item.id
        }
        if (validateCoordinates(item.longitude, item.latitude)) {
          var lonlat = wgs84ToWebMct(item.longitude, item.latitude)
          if (item.dangerousGoodsFlag === '1') {// 危
            var gkqySymbol = HSymbol.getPictureMarkerSymbol(gkqyAttr, lonlat, 'img/wei.png', 0.7, item.name, 13, [0, 0, 0], -20, -20)
          } else if (item.passengerFlag === '1') {// 客
            var gkqySymbol = HSymbol.getPictureMarkerSymbol(gkqyAttr, lonlat, 'img/ke.png', 0.7, item.name, 13, [0, 0, 0], -20, -20)
          } else {// 普
            var gkqySymbol = HSymbol.getPictureMarkerSymbol(gkqyAttr, lonlat, 'img/pu.png', 0.7, item.name, 13, [0, 0, 0], -20, -20)
          }
          markerSymbol.push(gkqySymbol)
        }
      })
      app.portEnterpriseLayer.addMarkerSymbol(markerSymbol)
    }
  })
}

/**
 * 加载渡口
 */
function loadFerry() {
  $.ajax({
    url: GIS_SERVERIP + '/gis/ferry/list',
    type: 'get',
    dataType: 'json',
    async: true,
    success: function(d) {
      var markerSymbol = []
      app.ferryLayer.clear()
      $.each(d.data, function(i, item) {
        var ferryAttr = {
          'datatype': 'ferry',
          'name': item.name,
          'id': item.id
        }
        if (validateCoordinates(item.longitude, item.latitude) && item.status === 1) {
          var lonlat = wgs84ToWebMct(item.longitude, item.latitude)
          var ferrySymbol = HSymbol.getPictureMarkerSymbol(ferryAttr, lonlat, 'img/dukou.png', 0.7, item.name, 13, [0, 0, 0], -20, -20)
          markerSymbol.push(ferrySymbol)
        }
      })
      app.ferryLayer.addMarkerSymbol(markerSymbol)
    }
  })
}

/**
 * 加载水文
 */
function loadHydrology() {
  $.ajax({
    url: GIS_SERVERIP + '/environment/hydrology/list',
    type: 'get',
    dataType: 'json',
    async: true,
    success: function(d) {
      var markerSymbol = []
      app.hydrologyLayer.clear()
      $.each(d.data, function(i, item) {
        var hydrologyAttr = {
          'datatype': 'hydrology',
          'name': item.name,
          'id': item.id
        }
        if (item.longitude != null && item.latitude != null) {
          var lonlat = wgs84ToWebMct(item.longitude, item.latitude)
          if (validateWaterLevel(item.depthHighest, item.depthLowest)) {
            if (item.depth > item.depthHighest || item.depth < item.depthLowest) {
              // console.log(item.name + ':' + '最高水位:' + item.depthHighest + '最低水位:' + item.depthLowest + '当前水位:' + item.depth)
              waterAlarmFlash(lonlat)
            }
          }
          var hydrologySymbol = HSymbol.getPictureMarkerSymbol(hydrologyAttr, lonlat, 'img/hydrology.png', 0.7, hydrologyAttr['name'], 14, [0, 128, 0], -20, -20)
          markerSymbol.push(hydrologySymbol)
        }
      })
      app.hydrologyLayer.addMarkerSymbol(markerSymbol)
    }
  })
}

/**
 * 检测最高最低水文是否符合条件
 * @param highlevel
 * @param lowlevel
 */
function validateWaterLevel(highlevel, lowlevel) {
  var flag = false
  if (highlevel === null || lowlevel === null) {
    return flag
  } else if (highlevel === 0 || lowlevel === 0) {
    return flag
  } else {
    return !flag
  }
}

/**
 * 航标预警闪烁
 */
function waterAlarmFlash(coor) {
  var flash_div = document.createElement('div')
  flash_div.className = 'water_animation'
  var flashOverlay = new ol.Overlay({
    element: flash_div,
    positioning: 'center-center',
    offset: [0, 0],
    stopEvent: false
  })
  flashOverlay.setPosition(coor)
  app.map.addOverlay(flashOverlay)
}

/**
 * 加载航段
 */
function loadSegment() {
  $.ajax({
    url: GIS_SERVERIP + '/safety/segment/querySegmentSimple',
    type: 'get',
    dateType: 'json',
    success: function(d) {
      var areadata = d.data
      var polygonSymbol = []
      var pointSymbol = []
      app.segmentLayer.clear()
      app.segmentPointLayer.clear()
      $.each(areadata, function(i, item) {
        //航段
        var hdpolygonAttr = {
          'datatype': 'hdpolygon',
          'name': item.name
        }
        if (item.segmentRange != null && item.segmentRange != '') {
          var areaObj = JSON.parse(item.segmentRange)
          var areaPoints = areaObj.pointList
          var points = []
          for (i = 0; i < areaPoints.length; i++) {
            var lonlat = wgs84ToWebMct(areaPoints[i].x, areaPoints[i].y)
            points.push(lonlat)
          }
          var hdpolygonSymbol = HSymbol.getPolygonWithoutLabel(hdpolygonAttr, [points], [0, 238, 0, 0.7], [0, 238, 0], 2, true)
          polygonSymbol.push(hdpolygonSymbol)
        }
        //航段图标
        var hdpointAttr = {
          'datatype': 'hdpoint',
          'id': item.id,
          'name': item.name
        }
        if (item.longitude != '' && item.latitude != '' && item.longitude != null && item.latitude != null) {
          var lonlat = wgs84ToWebMct(item.longitude, item.latitude)
          var hdpointSymbol = HSymbol.getPictureMarkerSymbol(hdpointAttr, lonlat, 'img/segment.png', 0.65, hdpointAttr['name'], 14, [0, 0, 0], -20, -20)
          pointSymbol.push(hdpointSymbol)
        }
      })
      app.segmentLayer.addPolygonSymbol(polygonSymbol)
      app.segmentPointLayer.addMarkerSymbol(pointSymbol)
    }
  })
}

/**
 * 加载辖区
 */
function loadManageArea() {
  $.ajax({
    url: GIS_SERVERIP + '/area/manageRange/?order=name&pageSize=100',
    type: 'get',
    dateType: 'json',
    success: function(d) {
      var areadata = d.data.dataList
      var polygonSymbol = []
      app.manageareaLayer.clear()
      $.each(areadata, function(i, item) {
        var mareaAttr = {
          'datatype': 'managearea',
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
      app.manageareaLayer.addPolygonSymbol(polygonSymbol)
    }
  })
}

/**
 * 加载锚地
 */
function loadAnchorageArea() {
  $.ajax({
    url: GIS_SERVERIP + '/gis/anchorage/list',
    type: 'get',
    dataType: 'json',
    success: function(d) {
      var areadata = d.data
      var polygonSymbol = []
      var pointSymbol = []
      app.anchorageareaLayer.clear()
      app.anchoragePointLayer.clear()
      $.each(areadata, function(i, item) {
        //锚地
        var anareaAttr = {
          'datatype': 'anchorarea'
        }
        //锚地图标
        var anpointAttr = {
          'datatype': 'anchorpoint',
          'id': item.id,
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
          var anareaSymbol = HSymbol.getPolygonWithoutLabel(anareaAttr, [points], [255, 255, 255, 0.2], [0, 191, 255], 2, false)
          polygonSymbol.push(anareaSymbol)

          var coors = anareaSymbol.getGeometry().getCoordinates()
          var turfPolygon = turf.polygon(coors)
          var lonlat = turf.centroid(turfPolygon).geometry.coordinates
          var anpointSymbol
          if (item.property === '危险品锚地') {
            anpointSymbol = HSymbol.getPictureMarkerSymbol(anpointAttr, lonlat, 'img/maodi_danger.png', 0.7, item.name, 16, [0, 0, 0], -20, -20)
          } else {
            anpointSymbol = HSymbol.getPictureMarkerSymbol(anpointAttr, lonlat, 'img/maodi_normal.png', 0.7, item.name, 16, [0, 0, 0], -20, -20)
          }
          pointSymbol.push(anpointSymbol)

        }
      })
      app.anchoragePointLayer.addMarkerSymbol(pointSymbol)
      app.anchorageareaLayer.addPolygonSymbol(polygonSymbol)
    }
  })
}

/**
 * 加载安全作业区
 */
function loadSafeArea() {
  $.ajax({
    url: GIS_SERVERIP + '/gis/safeOperationZone/list',
    type: 'get',
    dataType: 'json',
    success: function(d) {
      var areadata = d.data
      var polygonSymbol = []
      app.safeworkareaLayer.clear()
      $.each(areadata, function(i, item) {
        var sareaAttr = {
          'datatype': 'safework',
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
          var sareaSymbol = HSymbol.getPolygonSymbol(sareaAttr, [points], [255, 255, 255, 0.2], [50, 205, 50], 2, false, sareaAttr['name'], 16, [255, 165, 0])
          polygonSymbol.push(sareaSymbol)
        }
      })
      app.safeworkareaLayer.addPolygonSymbol(polygonSymbol)
    }
  })
}

/**
 * 加载禁限航区
 */
function loadLimitArea() {
  $.ajax({
    url: GIS_SERVERIP + '/gis/restrictedNavigationZone/list',
    type: 'get',
    data: {
      status: 1
    },
    dataType: 'json',
    success: function(d) {
      var areadata = d.data
      var polygonSymbol = []
      var pointSymbol = []
      app.limitsailingareaLayer.clear()
      app.limitsailingpointLayer.clear()
      $.each(areadata, function(i, item) {
        var lareaAttr = {
          'datatype': 'limitarea'
        }
        var lpointAttr = {
          'datatype': 'limitpoint',
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
          var lareaSymbol = HSymbol.getPolygonWithoutLabel(lareaAttr, [points], [255, 255, 255, 0.2], [255, 0, 0], 2, false)
          polygonSymbol.push(lareaSymbol)

          var coors = lareaSymbol.getGeometry().getCoordinates()
          var turfPolygon = turf.polygon(coors)
          var lonlat = turf.centroid(turfPolygon).geometry.coordinates
          var lpointSymbol
          lpointSymbol = HSymbol.getPictureMarkerSymbol(lpointAttr, lonlat, 'img/jxhq.png', 0.7, item.name, 16, [0, 0, 0], -20, -20)
          pointSymbol.push(lpointSymbol)
        }
      })
      app.limitsailingareaLayer.addPolygonSymbol(polygonSymbol)
      app.limitsailingpointLayer.addMarkerSymbol(pointSymbol)
    }
  })
}

/**
 * 加载重点区间
 */
function loadMonitorArea() {
  $.ajax({
    url: GIS_SERVERIP + '/area/custom/?order=name&pageSize=10000',
    type: 'get',
    dataType: 'json',
    async: true,
    success: function(d) {
      var areadata = d.data.dataList
      var polygonSymbol = []
      app.monitorareaLayer.clear()
      $.each(areadata, function(i, item) {
        var mareaAttr = {
          'datatype': 'marea',
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
          var mareaSymbol = HSymbol.getPolygonSymbol(mareaAttr, [points], [255, 255, 255, 0.1], [128, 0, 128], 2, false, mareaAttr['name'], 16, [255, 48, 48])
          polygonSymbol.push(mareaSymbol)
        }
      })
      app.monitorareaLayer.addPolygonSymbol(polygonSymbol)
    }
  })
}

/**
 * 加载船员信息采集点
 */
function loadCollectionLayer() {
  $.ajax({
    url: GIS_SERVERIP + '/gis/crewInfoCollectionPoint/list',
    type: 'get',
    dataType: 'json',
    success: function(d) {
      var markerSymbol = []
      app.collectionPointLayer.clear()
      $.each(d.data, function(i, item) {
        var collectionAttr = {
          'datatype': 'collection',
          'name': item.name
        }
        if (item.longitude != '' && item.latitude != '' && item.longitude != null && item.latitude != null) {
          var lonlat = wgs84ToWebMct(item.longitude, item.latitude)
          var collectionSymbol = HSymbol.getMarkerSymbol(collectionAttr, lonlat, 'white', name, 14, [0, 0, 0], -20, -20)
          markerSymbol.push(collectionSymbol)
        }
      })
      app.collectionPointLayer.addMarkerSymbol(markerSymbol)
    }
  })
}

/**
 * 加载桥梁
 */
function loadBridgeLayer() {
  $.ajax({
    url: GIS_SERVERIP + '/gis/bridge/list',
    type: 'get',
    dataType: 'json',
    async: true,
    success: function(d) {
      var markerSymbol = []
      app.bridgeLayer.clear()
      $.each(d.data, function(i, item) {
        var bridgeAttr = {
          'datatype': 'bridge',
          'name': item.name,
          'id': item.id
        }
        if (item.longitude != null && item.latitude != null) {
          var lonlat = wgs84ToWebMct(item.longitude, item.latitude)
          var bridgeSymbol = HSymbol.getPictureMarkerSymbol(bridgeAttr, lonlat, 'img/bridge.png', 0.5, bridgeAttr['name'], 14, [0, 0, 0], -20, -20)
          markerSymbol.push(bridgeSymbol)
        }
      })
      app.bridgeLayer.addMarkerSymbol(markerSymbol)
    }
  })
}

/**
 * 加载卡口
 */
function loadKakou() {
  $.ajax({
    url: GIS_SERVERIP + '/inspection/crosssection/list',
    type: 'get',
    dataType: 'json',
    async: true,
    success: function(d) {
      var markerSymbol = []
      app.kakouLayer.clear()
      $.each(d.data, function(i, item) {
        var kakouAttr = {
          'datatype': 'kakou',
          'name': item.name,
          'code': item.code,
          'id': item.id
        }
        var lonlat = wgs84ToWebMct(item.longitude, item.latitude)
        var kakouSymbol = HSymbol.getPictureMarkerSymbol(kakouAttr, lonlat, 'img/kakou.png', 0.9, kakouAttr['name'], 14, [0, 0, 0], -20, -20)
        markerSymbol.push(kakouSymbol)
      })
      app.kakouLayer.addMarkerSymbol(markerSymbol)
    }
  })
}

/**
 * 加载海事站所
 */
function loadHszs() {
  $.ajax({
    url: GIS_SERVERIP + '/gis/station/list',
    type: 'get',
    dataType: 'json',
    async: true,
    success: function(d) {
      var markerSymbol = []
      app.hszsStationLayer.clear()
      $.each(d.data, function(i, item) {
        var hszsAttr = {
          'datatype': 'hszs',
          'name': item.name,
          'id': item.id
        }
        var lonlat = wgs84ToWebMct(item.longitude, item.latitude)
        var hszsSymbol = HSymbol.getPictureMarkerSymbol(hszsAttr, lonlat, 'img/hszs.png', 0.7, hszsAttr['name'], 14, [0, 0, 0], -20, -20)
        markerSymbol.push(hszsSymbol)
      })
      app.hszsStationLayer.addMarkerSymbol(markerSymbol)
      // 在页面显示当前范围内海事站所名称
      getFeatureInExtent(app.currentExtent, app.hszsStationLayer.layer, showHszsNameIntable)
    }
  })
}

/**
 * 加载救援物资
 */
function loadSupport() {
  $.ajax({
    url: GIS_SERVERIP + '/gis/emergencyResource/list',
    type: 'get',
    dataType: 'json',
    async: true,
    success: function(d) {
      var markerSymbol = []
      app.emergentSourceLayer.clear()
      $.each(d.data, function(i, item) {
        if (item.longitude != null && item.latitude != null && item.longitude > 0 && item.longitude < 180 && item.latitude > 0 && item.latitude < 90) {
          var supportAttr = {
            'datatype': 'support',
            'name': item.siteName,
            'id': item.id
          }
          var lonlat = wgs84ToWebMct(item.longitude, item.latitude)
          var supportSymbol = HSymbol.getPictureMarkerSymbol(supportAttr, lonlat, 'img/support.png', 0.7, supportAttr['name'], 14, [0, 0, 0], -30, -20)
          markerSymbol.push(supportSymbol)
        }
      })
      app.emergentSourceLayer.addMarkerSymbol(markerSymbol)
      // 在页面显示当前范围内救援物资名称
      getFeatureInExtent(app.currentExtent, app.emergentSourceLayer.layer, showSupportNameIntable)
    }
  })
}

/**
 * 加载码头
 */
function loadMatou() {
  $.ajax({
    url: GIS_SERVERIP + '/gis/pier/list',
    type: 'get',
    dataType: 'json',
    async: true,
    success: function(d) {
      var markerSymbol = []
      app.matouLayer.clear()
      $.each(d.data, function(i, item) {
        if (item.longitude && item.longitude != null && item.latitude && item.latitude != null) {
          var matouAttr = {
            'datatype': 'matou',
            'name': item.fullName,
            'id': item.id
          }
          var lonlat = wgs84ToWebMct(item.longitude, item.latitude)
          var matouSymbol = HSymbol.getPictureMarkerSymbol(matouAttr, lonlat, 'img/matou.png', 0.8, matouAttr['name'], 14, [0, 0, 0], -50, -20)
          markerSymbol.push(matouSymbol)
        }
      })
      app.matouLayer.addMarkerSymbol(markerSymbol)
    }
  })
}

/**
 * 加载RFID基站
 */
function loadRFIDBasestation() {
  $.ajax({
    url: GIS_SERVERIP + '/rfid/rfidStation/list',
    type: 'get',
    dataType: 'json',
    async: true,
    success(d) {
      var markerSymbol = []
      app.rfidBasestationLayer.clear()
      $.each(d.data, function(i, item) {
        var rfidBasestationAttr = {
          'datatype': 'rfidBase',
          'name': item.name,
          'id': item.id
        }
        var lonlat = wgs84ToWebMct(item.longitude, item.latitude)
        var rfidBasestationSymbol = HSymbol.getPictureMarkerSymbol(rfidBasestationAttr, lonlat, 'img/RFIDstation.png', 0.7)
        markerSymbol.push(rfidBasestationSymbol)
      })
      app.rfidBasestationLayer.addMarkerSymbol(markerSymbol)
    }
  })
}

/**
 * 加载VHF基站
 */
function loadVHFBasestation() {
  $.ajax({
    url: GIS_SERVERIP + '/gis/vhfStation/list',
    type: 'get',
    dataType: 'json',
    async: true,
    success(d) {
      var markerSymbol = []
      app.vhfBasestationLayer.clear()
      $.each(d.data, function(i, item) {
        var vhfBasestationAttr = {
          'datatype': 'vhfBase',
          'name': item.name,
          'id': item.id
        }
        var lonlat = wgs84ToWebMct(item.longitude, item.latitude)
        var vhfBasestationSymbol = HSymbol.getPictureMarkerSymbol(vhfBasestationAttr, lonlat, 'img/VHFstation.png', 0.7)
        markerSymbol.push(vhfBasestationSymbol)
      })
      app.vhfBasestationLayer.addMarkerSymbol(markerSymbol)
    }
  })
}

/**
 * 加载AIS基站
 */
function loadAISBasestation() {
  $.ajax({
    url: GIS_SERVERIP + '/gis/aisStation/list',
    type: 'get',
    dataType: 'json',
    async: true,
    success: function(d) {
      var markerSymbol = []
      app.aisBasestationLayer.clear()
      $.each(d.data, function(i, item) {
        var aisBasestationAttr = {
          'datatype': 'aisBase',
          'name': item.name,
          'id': item.id
        }
        var lonlat = wgs84ToWebMct(item.lon, item.lat)
        var aisBasestationSymbol = HSymbol.getPictureMarkerSymbol(aisBasestationAttr, lonlat, 'img/AISstation.png', 0.7)
        markerSymbol.push(aisBasestationSymbol)
      })
      app.aisBasestationLayer.addMarkerSymbol(markerSymbol)
    }
  })
}

/**
 * 加载监控摄像头
 */
// function loadShipin() {
//   app.shipinLayer.clear()
//   $.ajax({
//     url: GIS_SERVERIP + '/gis/videoSurveillance/list',
//     type: 'get',
//     dataType: 'json',
//     async: true,
//     success: function(d) {
//       var markerSymbol = []
//       $.each(d.data, function(i, item) {
//         if (item.longitude > 100 && item.latitude > 20 && item.latitude < 90) {
//           var shipinAttr = {
//             'datatype': 'shipin',
//             'name': item.name,
//             'id': item.id,
//             'rtmp': item.rtmp,
//             'userName': item.userName,
//             'password': item.password,
//             'port': item.port,
//             'ipAdress': item.ipAdress,
//             'channel': item.channel,
//             'longitude': item.longitude,
//             'latitude': item.latitude,
//             'patrolMileage': item.patrolMileage
//           }
//           var lonlat = wgs84ToWebMct(item.longitude, item.latitude)
//           var videoSymbol = HSymbol.getPictureMarkerSymbol(shipinAttr, lonlat, 'img/video.png', 0.7, shipinAttr['name'], 14, [0, 0, 0], 15, 1)
//           markerSymbol.push(videoSymbol)
//         }
//       })
//       app.shipinLayer.addMarkerSymbol(markerSymbol)
//     }
//   })
// }

/**
 * 加载监控摄像头
 */
function loadVideo() {
  // app.videoLayer.clear()
  $.ajax({
    url: GIS_SERVERIP + '/gis/videoSurveillance/list',
    type: 'get',
    data: {
      dataSource: '2,3'
    },
    dataType: 'json',
    async: true,
    success: function(d) {
      var markerSymbol = []
      var videoStyle = new ol.style.Style({
        image: new ol.style.Icon({
          src: 'img/video.png',
          scale: 0.7
        })
      })
      app.videoLayer.layer.setStyle(videoStyle)
      app.videoLayer.layer.setMaxResolution(160)
      $.each(d.data, function(i, item) {
        if (item.longitude > 0 && item.longitude < 180 && item.latitude > 0 && item.latitude < 90 && item.enable === 1) {
          var videoAttr = {
            'datatype': 'shipin',
            'name': item.name,
            'id': item.id,
            'rtmp': item.rtmp,
            'userName': item.userName,
            'password': item.password,
            'port': item.port,
            'ipAdress': item.ipAdress,
            'channel': item.channel,
            'longitude': item.longitude,
            'latitude': item.latitude,
            'patrolMileage': item.patrolMileage
          }
          var lonlat = wgs84ToWebMct(item.longitude, item.latitude)
          var videoSymbol = new ol.Feature({
            geometry: new ol.geom.Point(lonlat)
          })
          videoSymbol.setProperties(videoAttr, false)
          markerSymbol.push(videoSymbol)
        } else {
          // console.log(item.name)
        }
      })
      // 在控制显示的分辨率范围内clustersource才会加载videosource，导致初始化时地图移动、框选、一键抓拍获取视频要素失效
      // 为保证执行结果，将videoSource设置为全局变量
      app.videoSource = new ol.source.Vector({
        features: markerSymbol
      })
      var videoClusterSource = new ol.source.Cluster({
        source: app.videoSource
      })
      app.videoLayer.layer.setSource(videoClusterSource)
      var videofeatures = app.videoSource.getFeaturesInExtent(app.currentExtent)
      showVideoNameIntable(videofeatures)
    }
  })
}

/**
 * 加载污染物
 */
function loadContaminatedLayer() {
  app.contaminatedLayer.clear()
  $.ajax({
    url: GIS_POINT + '/sewage/sewageSite/list',
    type: 'get',
    dataType: 'json',
    async: true,
    success: function(d) {
      var markerSymbol = []
      $.each(d.data, function(i, item) {
        item.datatype = 'contaminated'
        // var conAttr = {
        //   'markId': item.markId,
        //   'name': item.markName,
        //   'markLng': item.markLng,
        //   'markLat': item.markLat,
        //   'remark': item.remark,
        //   'markAddress': item.markAddress,
        //   'contact': item.contact,
        //   'contactTel': item.contactTel
        // }
        var lonlat = wgs84ToWebMct(item.longitude, item.latitude)
        var conSymbol = HSymbol.getPictureMarkerSymbol(item, lonlat, 'img/contaminated.png', 0.7, item.name, 14, [0, 0, 0], 15, 1)
        markerSymbol.push(conSymbol)
      })
      app.contaminatedLayer.addMarkerSymbol(markerSymbol)
    }
  })
}

/**
 * 加载空气质量
 */
function loadAirQualityLayer() {
  app.contaminatedLayer.clear()
  $.ajax({
    url: GIS_SERVERIP + '/environment/airQuality/list',
    type: 'get',
    dataType: 'json',
    async: true,
    success: function(d) {
      var markerSymbol = []
      $.each(d.data, function(i, item) {
        if (item.longitude != null && item.latitude != null) {
          // item.datatype = 'airquality'
          // item.name=item.deviceName
          var airAttr = {
            'datatype': 'airquality',
            'id': item.id,
            'name': item.deviceName,
            'obj': item
          }
          var lonlat = wgs84ToWebMct(item.longitude, item.latitude)
          var airSymbol = HSymbol.getPictureMarkerSymbol(airAttr, lonlat, 'img/airquality.png', 0.7, item.deviceName, 14, [0, 0, 0], 15, 1)
          markerSymbol.push(airSymbol)
        }
      })
      app.airqualityLayer.addMarkerSymbol(markerSymbol)
    }
  })
}

/**
 * 加载大连海事要素标志样式
 */
function loadDLHSFeatureStyles() {
  $.ajax({
    url: GIS_DLHSFEATURES + '/getFeatureStyle.action',
    type: 'get',
    dataType: 'json',
    success: function(d) {
      transformAndSaveStyles(d)
    }
  })
}

/**
 * 解析并转换请求到的要素样式
 * @param {Object} geojson
 */
function transformAndSaveStyles(geojson) {
  app.styleCollection = new Object()
  var styles = JSON.parse(geojson.style)
  var len = styles.length + 1
  for (var i = 1; i < len; i++) {
    var style = styles[i - 1]
    var layerID = style.subclass_id
    var radius = style.pointradius
    var src = GIS_DLHSFEATURES + '/' + style.imgsrc
    var scale = style.imgscale
    var strokewidth = style.strokewidth
    var line_m = style.line_m
    var line_n = style.line_n
    var strokecolor = style.strokecolor
    var fillcolor = style.fillcolor
    var stroke = new ol.style.Stroke({
      color: strokecolor,
      width: strokewidth,
      lineDash: [line_m, line_n]
    })
    var fill = new ol.style.Fill({
      color: fillcolor
    })
    if (src != '') {
      var image = new ol.style.Icon({
        src: src,
        offsetX: -32,
        offsetY: -32,
        scale: scale
      })
    } else {
      var image = new ol.style.Circle({
        radius: radius,
        stroke: stroke,
        fill: fill
      })
    }

    var style = new ol.style.Style({
      image: image,
      stroke: stroke,
      fill: fill
    })
    app.styleCollection[layerID] = style// 将读取的样式记录存储到对象中
  }
}

/**
 * 加载大连海事要素标志
 * @param minLon 左下经度
 * @param minLat 左下纬度
 * @param maxLon 右上经度
 * @param maxLat 右上纬度
 */
function loadDLHSFeatures(minLon, minLat, maxLon, maxLat) {
  if (typeof app.styleCollection === 'undefined') {
    return
  }
  // console.log(app.styleCollection)
  app.DLHSMarkerAssistLayer.clear()
  app.DLHSMarkersLayer.clear()
  app.DLHSFeaturesLayer.clear()
  $.ajax({
    url: GIS_DLHSFEATURES + '/Load.action',
    type: 'get',
    dataType: 'json',
    data: {
      'minLon': minLon,
      'minLat': minLat,
      'maxLon': maxLon,
      'maxLat': maxLat
    },
    success: function(d) {
      renderFeatures(d)
    }
  })
}

/**
 * 解析并渲染要素
 * @param geojson
 */
function renderFeatures(geojson) {
  if (geojson.data == null && geojson.data == '') {
    return
  }
  var markerAssistIDArr = ['H09', 'H10']
  var markerIDArr = ['H11', 'H24', 'H25', 'H26', 'H27']
  var featuresIDArr = ['H05', 'H08', 'H16', 'H17', 'H18', 'H19', 'H20', 'H22']
  var markerAssistArr = [] //助航标志数组
  var markerArr = []       //标志标牌数组
  var featuresArr = []     //涉水要素数组
  var features = geojson.data.features
  var len = features.length
  for (var i = 0; i < len; i++) {
    //解析要素属性
    var id = features[i].properties.ID
    var bh = features[i].properties.bh
    var name = features[i].properties.name
    var featureclass = features[i].properties.featureclass
    var subclass = features[i].properties.subclass
    var featureclassid = features[i].properties.featureclass_id
    var subclassid = features[i].properties.subclass_id
    var basetype = features[i].properties.basetype
    var cusattr = features[i].properties.cusattr
    var imgsrc = features[i].properties.imgsrc
    //转换要素坐标
    var dlhsFeature
    if (basetype == '0') { // 暂只加载点标注
      var lanlon = features[i].geometry.coordinates
      var x = lanlon[0]
      var y = lanlon[1]
      var pcoor = ol.proj.transform(lanlon, 'EPSG:4326', 'EPSG:3857')
      var px = pcoor[0]
      var py = pcoor[1]
      var geo = new ol.geom.Point([px, py])
      dlhsFeature = new ol.Feature({ geometry: geo })
      dlhsFeature.setId(id)
      dlhsFeature.set('datatype', 'dlhs') //只有一个点击事件所以要素统一datatype
      dlhsFeature.set('bh', bh)
      dlhsFeature.set('name', name)
      dlhsFeature.set('featureclass', featureclass)
      dlhsFeature.set('subclass', subclass)
      dlhsFeature.set('featureclassid', featureclassid)
      dlhsFeature.set('subclassid', subclassid)
      dlhsFeature.set('basetype', basetype)
      dlhsFeature.set('cusattr', cusattr)
      dlhsFeature.set('imgsrc', imgsrc)
      //设置要素样式
      var featureStyle
      if (app.styleCollection[subclassid]) {
        var theStyle = app.styleCollection[subclassid]
        featureStyle = new ol.style.Style({
          image: theStyle.getImage(),
          stroke: theStyle.getStroke(),
          fill: theStyle.getFill(),
          text: new ol.style.Text({
            text: cusattr,
            offsetY: -25,
            font: '10px Calibri,sans-serif',
            fill: new ol.style.Fill({
              color: '#fff'
            }),
            stroke: new ol.style.Stroke({
              color: '#000',
              width: 3
            })
          })
        })
        dlhsFeature.setStyle(featureStyle)
      }
      if (markerAssistIDArr.includes(featureclassid)) {
        markerAssistArr.push(dlhsFeature)
      } else if (markerIDArr.includes(featureclassid)) {
        markerArr.push(dlhsFeature)
      } else if (featuresIDArr.includes(featureclassid)) {
        featuresArr.push(dlhsFeature)
      }
    }
    // if (basetype == '1') {
    //   var linecoords = []
    //   var linelanlon = features[i].geometry.coordinates
    //   for (var j = 0; j < linelanlon.length; j++) {
    //     var lanlng = linelanlon[j]
    //     var pcoord = ol.proj.transform(lanlng, 'EPSG:4326', 'EPSG:3857')
    //     linecoords.push(pcoord)
    //   }
    //   newfeature = new ol.Feature(new ol.geom.LineString(linecoords))
    // }
    // if (basetype == '2') {
    //   var tpolygoncoords = []
    //   var polygonlanlon = features[i].geometry.coordinates
    //   for (var j = 0; j < polygonlanlon.length; j++) {
    //     var lanlng = polygonlanlon[j]
    //     var pcoord = ol.proj.transform(lanlng, 'EPSG:4326', 'EPSG:3857')
    //     tpolygoncoords.push(pcoord)
    //   }
    //   var polygoncoords = []
    //   polygoncoords.push(tpolygoncoords)
    //   newfeature = new ol.Feature(new ol.geom.Polygon(polygoncoords))
    // }
  }
  app.DLHSMarkerAssistLayer.addMarkerSymbol(markerAssistArr)
  app.DLHSMarkersLayer.addMarkerSymbol(markerArr)
  app.DLHSFeaturesLayer.addMarkerSymbol(featuresArr)
}

/*******************************************要素获取及展示方法结束****************************************/

/**********************************************加载第三方要素开始*******************************************/

/**
 * 加载三防队伍
 */
function loadEmergencyTeam() {
  $.ajax({
    url: GIS_DXNFEATURES + '/emergencyResourc/getsfEmergencyTeamList',
    type: 'get',
    dataType: 'json',
    data: {
      'pageSize': 1000
    },
    async: true,
    success: function(d) {
      var markerSymbol = []
      app.emergencyTeamLayer.clear()
      var data = d.data.records
      $.each(data, function(i, item) {
        var emergencyTeamAttr = {
          'datatype': 'emergencyteam',
          'name': item.teamName,
          'id': item.id
        }
        if (validateCoordinates(item.longitude, item.latitude)) {
          var lonlat = wgs84ToWebMct(item.longitude, item.latitude)
          var etSymbol = HSymbol.getPictureMarkerSymbol(emergencyTeamAttr, lonlat, 'img/team.png', 0.9, item.teamName, 14, [0, 0, 0], -20, -20)
          markerSymbol.push(etSymbol)
        }
      })
      app.emergencyTeamLayer.addMarkerSymbol(markerSymbol)
    }
  })
}

/**
 * 加载物资站点 仓库
 */
function loadMaterialReservePoint() {
  $.ajax({
    url: GIS_DXNFEATURES + '/emergencyResourc/getSfMaterialReservePointList',
    type: 'get',
    dataType: 'json',
    data: {
      'pageSize': 1000
    },
    async: true,
    success: function(d) {
      var markerSymbol = []
      app.materialReservePointLayer.clear()
      var data = d.data.records
      $.each(data, function(i, item) {
        var materialreservepointAttr = {
          'datatype': 'materialreservepoint',
          'name': item.reservePointName,
          'id': item.id
        }
        if (validateCoordinates(item.longitude, item.latitude)) {
          var lonlat = wgs84ToWebMct(item.longitude, item.latitude)
          var mrSymbol
          if (item.siteOrWarehouse === 0) {// 0 站点
            if (item.suppliesIsNull === 0) {// 0 不存在物资
              mrSymbol = HSymbol.getPictureMarkerSymbol(materialreservepointAttr, lonlat, 'img/hszs.png', 0.9, item.reservePointName, 14, [0, 0, 0], -20, -20)
            } else {// 1 存在物资
              mrSymbol = HSymbol.getPictureMarkerSymbol(materialreservepointAttr, lonlat, 'img/hszs_full.png', 0.9, item.reservePointName, 14, [0, 0, 0], -20, -20)
            }
          } else {// 1 仓库
            mrSymbol = HSymbol.getPictureMarkerSymbol(materialreservepointAttr, lonlat, 'img/store.png', 0.9, item.reservePointName, 14, [0, 0, 0], -20, -20)
          }
          markerSymbol.push(mrSymbol)
        }
      })
      app.materialReservePointLayer.addMarkerSymbol(markerSymbol)
    }
  })
}

/**********************************************加载第三方要素结束*******************************************/
