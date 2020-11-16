/**
 * 船舶图层操作工具集
 * created by zj on 2018.9.6
 */
var HShipLayer = (function() {
  var hMap // 地图对象
  var mLayer // WMS图层对象
  var fLayer // WFS图层对象
  var fUrl // WFS服务查询用
  var filterParams = { // 过滤对象 CQL语句
    'CQL_FILTER': null
  }
  var queryParams = {}// 查询对象 包括时间 信号类型 船舶类型
  var queryCql = '' // 常规查询条件语句
  var chosenShipname = '' // 点击选中的船舶名称
  var auditStatusFlag = '' // 自定义状态显示辅助判断标志位 正常:1 核查未通过:2 特殊关注:3
  var geoformat = new ol.format.GeoJSON()
  var wktformat = new ol.format.WKT()

  /**
   * 时间过滤条件
   * @param {Number} offlineTime 离线时间 单位:分钟
   * @description 在当前时间120min前默认在线
   */
  var setTimeFilter = function(offlineTime) {
    var timeStamp = HUtil.getCurrentTimeStamp()// 当前时间戳
    var offtimeStamp = timeStamp - offlineTime * 60000
    var now = new Date(offtimeStamp)
    var yy = now.getFullYear()
    var mm = now.getMonth() + 1
    var dd = now.getDate()
    var hh = now.getHours()
    var ii = now.getMinutes()
    var ss = now.getSeconds()
    var offtime = yy + '-'
    if (mm < 10) {
      offtime += '0' + mm + '-'
    } else {
      offtime += mm + '-'
    }

    if (dd < 10) {
      offtime += '0' + dd + 'T'
    } else {
      offtime += dd + 'T'
    }

    if (hh < 10) {
      offtime += '0' + hh + ':'
    } else {
      offtime += hh + ':'
    }

    if (ii < 10) {
      offtime += '0' + ii + ':'
    } else {
      offtime += ii + ':'
    }

    if (ss < 10) {
      offtime += '0' + ss
    } else {
      offtime += ss
    }

    var timeFilter = 'receive_time AFTER ' + offtime
    return timeFilter
  }
  /**
   * 信号类型过滤条件
   * @param {Number} datatype 0:混合 1:GPS 2:AIS
   * @description 0：默认混合
   */
  var setDataTypeFilter = function(datatype) {
    var dataTypeFilter = 'datatype = ' + datatype
    return dataTypeFilter
  }
  /**
   * 船舶种类过滤条件
   * @param {String} shiptype 0:未知 1:客船 2:货船 3:危险品船 99:其他
   */
  var setShipTypeFilter = function(shiptype) {
    var shipTypeFilter
    if (shiptype != '') {
      shipTypeFilter = 'shiptype in (' + shiptype + ')'
    } else {
      shipTypeFilter = 'shiptype not in (0,1,2,3,99)'
    }
    return shipTypeFilter
  }
  /**
   * 船舶速度过滤条件
   * @param {Number} speedsignal 0:全部船舶 1:行驶船舶 2:静止船舶 3:全部隐藏
   * @description 注意和页面中确定船舶状态符号的条件不一样，这里是直接查询数据库，单位是海里/时
   */
  var setShipSpeedFilter = function(speedsignal) {
    var shipSpeedFilter
    if (speedsignal === 0) {
      shipSpeedFilter = 'speed > -1'
    } else if (speedsignal === 1) {
      shipSpeedFilter = 'speed > 1'
    } else if (speedsignal === 2) {
      shipSpeedFilter = 'speed between 0 and 0.54'
    } else if (speedsignal === 3) {
      shipSpeedFilter = 'speed < -1'
    }
    return shipSpeedFilter
  }
  /**
   * 获取船舶形状顶点
   * @param offsetAngle {Number} 顶点距参考点偏移角度
   * @param direct {Number} 调整后角度
   * @param coor {Array} 参考点坐标
   * @param delta {Number} 规格
   */
  var getShipGeomVertex = function(offsetAngle, direct, coor, delta) {
    var vertexdirect = (offsetAngle + direct) % 360
    var vertexx = coor[0] + Math.cos(vertexdirect * Math.PI / 180) * delta
    var vertexy = coor[1] + Math.sin(vertexdirect * Math.PI / 180) * delta
    var vertexcoor = [vertexx, vertexy]
    return vertexcoor
  }
  /**
   * 获取船舶展示形状
   * @param shipSpeed {Number} 船舶行驶速度 km/h
   * @param shipDirect {Number} 船舶方向
   * @param shipCoor {Array} 船舶墨卡托坐标
   */
  var getShipGeometry = function(shipSpeed, shipDirect, shipCoor) {
    var shipGeometryCoor
    var shipGeometry
    if (shipSpeed < 1) { // 船舶静止状态 防误差,行驶速度小于1km/h默认静止
      // 生成船舶符号点坐标
      // 参考点
      var newdirect = 90
      var centerX = shipCoor[0] - Math.cos(newdirect * Math.PI / 180) * 10
      var centerY = shipCoor[1] - Math.sin(newdirect * Math.PI / 180) * 10
      var P = [centerX, centerY]
      var delta = 13
      // 左上顶点
      var PLT = getShipGeomVertex(30, newdirect, P, delta)
      // 左顶点
      var PL = getShipGeomVertex(90, newdirect, P, delta)
      // 左下顶点
      var PLB = getShipGeomVertex(150, newdirect, P, delta)
      // 右下顶点
      var PRB = getShipGeomVertex(210, newdirect, P, delta)
      // 右顶点
      var PR = getShipGeomVertex(270, newdirect, P, delta)
      // 右上顶点
      var PRT = getShipGeomVertex(330, newdirect, P, delta)
      shipGeometryCoor = [[PLT, PL, PLB, PRB, PR, PRT, PLT]]
      shipGeometry = new ol.geom.Polygon(shipGeometryCoor)
    } else { // 船舶行驶状态
      // 上顶点
      var P = shipCoor
      // 生成船舶符号点坐标
      var newdirect = (450 - shipDirect) % 360
      var newspeed = Math.min(12, shipSpeed)// 航速最高12km/h
      var delta = 30
      // 左下顶点
      var PL = getShipGeomVertex(165, newdirect, P, delta)
      // 右下顶点
      var PR = getShipGeomVertex(195, newdirect, P, delta)
      // 最上方的线顶点
      var topx = P[0] + Math.cos(newdirect * Math.PI / 180) * newspeed * 2
      var topy = P[1] + Math.sin(newdirect * Math.PI / 180) * newspeed * 2
      var PT = [topx, topy]
      shipGeometryCoor = [[P, PL, PR, P, PT]]
      shipGeometry = new ol.geom.Polygon(shipGeometryCoor)
    }
    return shipGeometry
  }
  return {
    /**
     * 初始化船舶图层
     * @param {ol.Map} map     app.map
     * @param {String} wmsurl  wms地址
     * @param {String} wfsurl  wfs地址
     */
    init: function(map, wmsurl, wfsurl) {
      hMap = map
      // 初始化wms船舶
      mLayer = new ol.layer.Image({
        type: 'shippoint',
        source: new ol.source.ImageWMS({
          url: wmsurl,
          params: {
            'FORMAT': 'image/png',
            'VERSION': '1.1.0',
            'STYLES': '',
            'LAYERS': 'geobase:zjghship'
          }
        })
      })

      this.setQueryParams(120, 0, [0, 1, 2, 3, 99], 0)
      // 初始化wfs船舶
      // TODO ol.loadingstrategy.bbox 加载策略不适合动态点？  静态服务测试成功 暂保留全部加载
      fUrl = wfsurl
      fLayer = new ol.layer.Vector({
        type: 'shipsymbol',
        source: new ol.source.Vector({}),
        style: function(feature, resolution) {
          var shipproperties = feature.getProperties()
          var speed = shipproperties.speed * 1.852// 1节 = 1海里/时 = 1.852 千米/时
          var direct = shipproperties.direction// 方向
          var shiptype = shipproperties.shiptype// 船舶种类
          var shiptimestamp = HUtil.UTCToDateforSecond(shipproperties.receive_time)// 船舶时间转时间戳
          var onlinetimestamp = HUtil.getCurrentTimeStamp() - 120 * 60 * 1000// 规定的在线时间2小时前到此刻
          var stickconcerntimestamp = HUtil.getCurrentTimeStamp() - 60 * 60 * 1000// 持续关注船舶 规定的在线时间1小时前到此刻
          var auditstatus = shipproperties.auditstatus
          var coordinate = feature.getGeometry().getFirstCoordinate(true)
          var newdirect = (450 - direct) % 360
          var shipgeometry = getShipGeometry(speed, direct, coordinate)
          if (shipproperties.shipname == chosenShipname) {
            var centerDirect
            if (speed < 1) {
              centerDirect = 90
            } else {
              centerDirect = (450 - direct) % 360
            }
            var centerX = coordinate[0] - Math.cos(centerDirect * Math.PI / 180) * 10
            var centerY = coordinate[1] - Math.sin(centerDirect * Math.PI / 180) * 10
            var newCirleCenter = [centerX, centerY]
            var chosenCircleGeometry = app.chosenCircle.getGeometry()
            chosenCircleGeometry.setCenter(newCirleCenter)
          }
          var style
          if (resolution < 400 && resolution > 4) {
            if (auditstatus === 3 && auditStatusFlag === 3) {
              var X = coordinate[0] - Math.cos(newdirect * Math.PI / 180) * 10
              var Y = coordinate[1] - Math.sin(newdirect * Math.PI / 180) * 10
              var center = [X, Y]
              if (shiptimestamp < stickconcerntimestamp) {
                style = new ol.style.Style({
                  geometry: new ol.geom.Point(center),
                  image: new ol.style.Icon({
                    src: 'img/stickconcern_offline.png',
                    scale: 0.8
                  })
                })
              } else {
                style = new ol.style.Style({
                  geometry: new ol.geom.Point(center),
                  image: new ol.style.Icon({
                    src: 'img/stickconcern.png',
                    scale: 0.8
                  })
                })
              }
            }
          } else if (resolution < 4) {
            if (auditstatus === 3 && auditStatusFlag === 3) {// 持续关注船舶
              var X = coordinate[0] - Math.cos(newdirect * Math.PI / 180) * 10
              var Y = coordinate[1] - Math.sin(newdirect * Math.PI / 180) * 10
              var center = [X, Y]
              if (shiptimestamp < stickconcerntimestamp) {
                style = new ol.style.Style({
                  geometry: new ol.geom.Point(center),
                  image: new ol.style.Icon({
                    src: 'img/stickconcern_offline.png',
                    scale: 0.8
                  })
                })
              } else {
                style = new ol.style.Style({
                  geometry: new ol.geom.Point(center),
                  image: new ol.style.Icon({
                    src: 'img/stickconcern.png',
                    scale: 0.8
                  })
                })
              }
            } else if (shipproperties.shipname.substr(0, 3) == GIS_HXTSHIP) { // 海巡艇蓝色黑框
              style = new ol.style.Style({
                geometry: shipgeometry,
                fill: new ol.style.Fill({
                  color: [1, 87, 155]
                }),
                stroke: new ol.style.Stroke({
                  color: [0, 0, 0],
                  width: 1.5
                })
              })
            } else if (shiptimestamp < onlinetimestamp) { // 离线船舶灰色黑框
              style = new ol.style.Style({
                geometry: shipgeometry,
                fill: new ol.style.Fill({
                  color: [200, 200, 200, 0.8]
                }),
                stroke: new ol.style.Stroke({
                  color: [0, 0, 0],
                  width: 1.5
                })
              })
            } else if (shiptype == GIS_PASSENGERSHIP) { // 客船黄色红框
              style = new ol.style.Style({
                geometry: shipgeometry,
                fill: new ol.style.Fill({
                  color: [255, 255, 0]
                }),
                stroke: new ol.style.Stroke({
                  color: [255, 0, 0],
                  width: 1.5
                })
              })
            } else if (shiptype == GIS_GOODSSHIP) { // 货船绿色黑框
              style = new ol.style.Style({
                geometry: shipgeometry,
                fill: new ol.style.Fill({
                  color: [0, 200, 0]
                }),
                stroke: new ol.style.Stroke({
                  color: [0, 0, 0],
                  width: 1.5
                })
              })
            } else if (shiptype == GIS_DANGERSHIP) { // 危险品船红色黄框
              style = new ol.style.Style({
                geometry: shipgeometry,
                fill: new ol.style.Fill({
                  color: [255, 0, 0]
                }),
                stroke: new ol.style.Stroke({
                  color: [255, 255, 0],
                  width: 1.5
                })
              })
            } else {
              style = new ol.style.Style({
                geometry: shipgeometry,
                fill: new ol.style.Fill({
                  color: [255, 255, 255]
                }),
                stroke: new ol.style.Stroke({
                  color: [0, 0, 0],
                  width: 1.5
                })
              })
            }
          }
          return style
        }
      })
      hMap.addLayer(mLayer)
      hMap.addLayer(fLayer)
    },

    /**
     * 设置查询对象
     * @param {Number} offlineTime 离线时间
     * @param {Number} datatype    信号类型
     * @param {Array} shiptype    船舶种类
     * @param {Number} speedsignal 船速标识
     */
    setQueryParams: function(offlineTime, datatype, shiptype, speedsignal) {
      queryParams.offlineTime = offlineTime
      queryParams.dataType = datatype
      queryParams.shipType = shiptype.join(',')
      queryParams.speedSignal = speedsignal
    },

    /**
     * 查询船舶,控制wms船舶图层显示
     */
    queryWMSShips: function() {
      // 设置常规条件
      queryCql = ''
      var timeFilter = setTimeFilter(queryParams.offlineTime)
      var dataTypeFilter = setDataTypeFilter(queryParams.dataType)
      var shipTypeFilter = setShipTypeFilter(queryParams.shipType)
      var shipSpeedFilter = setShipSpeedFilter(queryParams.speedSignal)
      if (app.nameorno && app.nameorno != '') { // 船名 九位码或设备识别号存在则查询(船名模糊查询 九位码或设备识别号精确查询)
        var dataTypeFilter = setDataTypeFilter(queryParams.dataType)
        var queryfilter = '(shipname like \'%' + app.nameorno + '%\' or no = \'' + app.nameorno + '\')' + ' and ' + dataTypeFilter

        if (auditStatusFlag === 3) {
          var stickconcernedfilter = 'auditstatus = 3 and ' + dataTypeFilter
          queryCql = queryCql + '(' + timeFilter + ' and ' + dataTypeFilter + ' and ' + shipTypeFilter + ' and ' + shipSpeedFilter + ') or (' + queryfilter + ') or (' + stickconcernedfilter + ')'
        } else {
          queryCql = queryCql + '(' + timeFilter + ' and ' + dataTypeFilter + ' and ' + shipTypeFilter + ' and ' + shipSpeedFilter + ') or (' + queryfilter + ')'
        }
      } else {
        if (auditStatusFlag === 3) {
          var stickconcernedfilter = 'auditstatus = 3 and ' + dataTypeFilter
          queryCql = queryCql + '(' + timeFilter + ' and ' + dataTypeFilter + ' and ' + shipTypeFilter + ' and ' + shipSpeedFilter + ') or (' + stickconcernedfilter + ')'
        } else {
          queryCql = queryCql + '(' + timeFilter + ' and ' + dataTypeFilter + ' and ' + shipTypeFilter + ' and ' + shipSpeedFilter + ')'
        }
      }
      // console.log(queryCql)
      // 根据过滤条件控制wms船舶图层显示
      filterParams.CQL_FILTER = queryCql
      mLayer.getSource().updateParams(filterParams)
    },
    /**
     * 查询船舶,控制wfs船舶图层显示
     * @ param flag 异步
     */
    queryWFSShips: function(flag) {
      var queryurl = fUrl + '&cql_filter=' + encodeURI(queryCql).replace(/\(/g,'%28')
        .replace(/\)/g,'%29')
      // console.log(queryCql)
      // console.log(queryurl)
      $.ajax({
        url: queryurl,
        type: 'get',
        async: flag,
        success: function(data) {
          var features = geoformat.readFeatures(data)
          fLayer.getSource().clear()
          fLayer.getSource().addFeatures(features)
        }
      })
    },
    /**
     * 船名模糊查询和九位码精确查询
     * @param nameorno
     */
    queryWFSShipsByShipnameOrShipno: function(nameorno) {
      var features = []
      if (nameorno && nameorno != '') {
        var dataTypeFilter = setDataTypeFilter(queryParams.dataType)
        var queryfilter = '(shipname like \'%' + nameorno + '%\' or no = \'' + nameorno + '\')' + ' and ' + dataTypeFilter
        var queryCqlOfName = '' + queryfilter
        var queryurl = fUrl + '&cql_filter=' + encodeURI(queryCqlOfName).replace(/\(/g,'%28')
          .replace(/\)/g,'%29')
        // console.log(queryurl)
        $.ajax({
          url: queryurl,
          type: 'get',
          async: false,
          success: function(data) {
            features = geoformat.readFeatures(data)
          }
        })
      }
      return features
    },
    /**
     * 控制船舶图层显隐
     * @param {Boolean} isshow
     */
    isShowShipLayer: function(isshow) {
      mLayer.setVisible(isshow)
      fLayer.setVisible(isshow)
    },
    /**
     * 定位船舶
     * @param {String} shipname
     */
    locateToTheShip: function(shipname) {
      var shipFeatures = HShipLayer.queryShipFeatures()
      var targetShip
      for (i = 0; i < shipFeatures.length; i++) {
        var name = shipFeatures[i].getProperties()['shipname']
        if (name == shipname) {
          targetShip = shipFeatures[i]
          // 重新设置选中圆
          app.chosenLayer.setVisible(true)
          var originalShipCoor = targetShip.getGeometry().getFirstCoordinate(true)
          var shipDirection = targetShip.getProperties()['direction']
          var shipname = targetShip.getProperties()['shipname']
          var shipspeed = targetShip.getProperties()['speed']
          var centerDirect
          if (shipspeed < 1) {
            centerDirect = 90
          } else {
            centerDirect = (450 - shipDirection) % 360
          }
          var centerX = originalShipCoor[0] - Math.cos(centerDirect * Math.PI / 180) * 10
          var centerY = originalShipCoor[1] - Math.sin(centerDirect * Math.PI / 180) * 10
          var newCirleCenter = [centerX, centerY]
          var chosenCircleGeometry = app.chosenCircle.getGeometry()
          chosenCircleGeometry.setCenter(newCirleCenter)
          this.setChosenShipname(shipname)
        }
      }
      if (targetShip) {
        var mapView = hMap.getView()
        mapView.fit(targetShip.getGeometry(), hMap.getSize(), { duration: 2000 })
      }
    },
    /**
     * 查询指定extent内的船舶数量;全查
     * @param {ol.extent?} extent
     */
    queryShipAmount: function(extent) {
      var shipAmount
      if (extent) {
        shipAmount = fLayer.getSource().getFeaturesInExtent(extent).length
      } else {
        shipAmount = fLayer.getSource().getFeatures().length
      }
      return shipAmount
    },
    /**
     * 查询指定extent内的船舶要素;全查
     * @param {ol.extent?} extent
     */
    queryShipFeatures: function(extent) {
      var shipFeatures
      if (extent) {
        shipFeatures = fLayer.getSource().getFeaturesInExtent(extent)
      } else {
        shipFeatures = fLayer.getSource().getFeatures()
      }
      return shipFeatures
    },
    /**
     * 查询指定区域内的船舶要素
     * @param coors 区域坐标 ol.geom.Geometry
     */
    queryShipsFeaturesInArea: function(geometry) {
      var features = []
      var areaPolygon = wktformat.writeGeometry(geometry)
      var queryurl = fUrl + '&cql_filter=' + encodeURI(queryCql + ' and WITHIN(geom,' + areaPolygon + ')')
      console.log(queryurl)
      $.ajax({
        url: queryurl,
        type: 'get',
        async: false,
        success: function(data) {
          features = geoformat.readFeatures(data)
        }
      })
      return features
    },
    /**
     * 根据船舶种类获取船舶坐标数组
     * @param {String} type 'all':全部坐标;'passenger':客船;'goods':货船;'danger':危险品船;
     */
    getShipsCoorForShiptype: function(type) {
      var shipPoints = []
      var shipFeatures = fLayer.getSource().getFeatures()
      if (type == 'all') {
        for (var i = 0; i < shipFeatures.length; i++) {
          shipPoints.push(shipFeatures[i].getGeometry().getCoordinates())
        }
      } else if (type == 'passenger') {
        for (var i = 0; i < shipFeatures.length; i++) {
          if (shipFeatures[i].getProperties()['shiptype'] == 1) {
            shipPoints.push(shipFeatures[i].getGeometry().getCoordinates())
          }
        }
      } else if (type == 'goods') {
        for (var i = 0; i < shipFeatures.length; i++) {
          if (shipFeatures[i].getProperties()['shiptype'] == 2) {
            shipPoints.push(shipFeatures[i].getGeometry().getCoordinates())
          }
        }
      } else if (type == 'danger') {
        for (var i = 0; i < shipFeatures.length; i++) {
          if (shipFeatures[i].getProperties()['shiptype'] == 3) {
            shipPoints.push(shipFeatures[i].getGeometry().getCoordinates())
          }
        }
      }
      return shipPoints
    },
    /**
     * 设置自定义状态显示判断辅助标志位
     * @param flag 默认:'' 正常:1 核查未通过:2 持续关注:3
     * @description 当前只需显示判断持续关注船舶 2020.2.27
     */
    setAuditStatusFlag: function(flag) {
      if (flag === 1) {
        auditStatusFlag = 1
      } else if (flag === 2) {
        auditStatusFlag = 2
      } else if (flag === 3) {
        auditStatusFlag = 3
      } else {
        auditStatusFlag = ''
      }
    },
    /**
     * 刷新
     */
    refresh: function() {
      this.queryWMSShips()
      this.queryWFSShips(true)
      setTimeout('HShipLayer.refresh()', 5000)
    },
    /**
     * 保存点击时选中的船舶名称
     */
    setChosenShipname: function(shipname) {
      chosenShipname = shipname
    }
  }
})()

