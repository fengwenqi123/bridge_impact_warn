/* eslint-disable */
import store from '@/store'
import bus from '@/components/bus'
import {
  showInfoLayer,
  webMctToWGS84,
  getDistance,
  locateTo,
  pointTo,
  addFlashMarker,
  formatLength,
  finaltime,
  wgs84ToWebMct,
  clearFeature
} from './HTool'
import Overlay from 'ol/Overlay'
import Select from 'ol/interaction/Select'
import HUtil from './HUtil'
import HShipLayer from './HShipLayer.js'
import { GeoJSON } from 'ol/format'
import { GIS_COUNTYWFS, GIS_SERVERIP, GIS_HXTSHIP, GIS_PASSENGERSHIP, GIS_GOODSSHIP, GIS_DANGERSHIP } from './HConfig'
import { Text, Fill, Stroke, Style, Circle } from 'ol/style'
import { Vector } from 'ol/layer'
import { Vector as SVector } from 'ol/source'
import Draw from 'ol/interaction/Draw'
import { LineString, Polygon } from 'ol/geom'
import { Feature } from 'ol'
/**
 * GIS业务js
 * created by zj on 2018.8.30
 * @description 按照规范逐步更正
 */

/** *****************************************展示当前范围内要素开始****************************************/
/**
 * 在地图页面显示当前指定船舶图层中的船舶要素
 * @param {Array[]} shipFeatures 获取到的船舶要素数组
 */
const HUtils = new HUtil()
const HShipLayers = new HShipLayer()

function showShipNameIntable (shipFeatures) {
  var objList = []
  if (shipFeatures.length !== 0) {
    for (var i = 0; i < shipFeatures.length; i++) {
      var obj = {}
      obj.shipName = shipFeatures[i].getProperties().shipname
      obj.shipLon = shipFeatures[i].getProperties().longitude
      obj.shipLat = shipFeatures[i].getProperties().latitude
      obj.shipSpeed = shipFeatures[i].getProperties().speed
      obj.shipDirection = shipFeatures[i].getProperties().direction
      obj.shipheadDirection = shipFeatures[i].getProperties().headdirection
      obj.shipMessage = shipFeatures[i].getProperties().signaltype + shipFeatures[i].getProperties().no
      obj.shipType = shipFeatures[i].getProperties().shiptype
      var receivetimestamp = HUtil.UTCToDateforSecond(shipFeatures[i].getProperties().receive_time)
      obj.receiveTime = HUtil.dateToStrforSecond(receivetimestamp)
      objList.push(obj)
    }
  }
  parent.postMessage({
    act: 'shipNames',
    msg: {
      name: JSON.stringify(objList)
    }
  }, '*')
}

/**
 * 在地图页面显示当前指定船舶图层中的持续关注船舶要素
 * @param {Array[]} shipFeatures 获取到的船舶要素数组
 */
function showStickConcernedShipname (shipFeatures) {
  var objList = []
  if (shipFeatures.length != 0) {
    for (var i = 0; i < shipFeatures.length; i++) {
      if (shipFeatures[i].getProperties().auditstatus === 3) {
        var obj = {}
        obj.shipName = shipFeatures[i].getProperties().shipname
        obj.shipLon = shipFeatures[i].getProperties().longitude
        obj.shipLat = shipFeatures[i].getProperties().latitude
        obj.shipSpeed = shipFeatures[i].getProperties().speed
        obj.shipDirection = shipFeatures[i].getProperties().direction
        obj.shipheadDirection = shipFeatures[i].getProperties().headdirection
        obj.shipMessage = shipFeatures[i].getProperties().signaltype + shipFeatures[i].getProperties().no
        obj.shipType = shipFeatures[i].getProperties().shiptype
        var receivetimestamp = HUtil.UTCToDateforSecond(shipFeatures[i].getProperties().receive_time)
        obj.receiveTime = HUtil.dateToStrforSecond(receivetimestamp)
        obj.auditStatus = shipFeatures[i].getProperties().auditstatus
        objList.push(obj)
      }
    }
  }
  parent.postMessage({
    act: 'StickConcerned',
    msg: {
      name: JSON.stringify(objList)
    }
  }, '*')
}

/**
 *在地图页面显示当前范围内的海事站所
 * @param {Array[]} hszsFeatures
 */
function showHszsNameIntable (hszsFeatures) {
  if (hszsFeatures.length != 0) {
    // var hszsType = hszsFeatures[0].getProperties()['type'];// 海事站所图层 'hszs'
    var hszsNames = []
    for (i = 0; i < hszsFeatures.length; i++) {
      var hszsName = hszsFeatures[i].getProperties().name// 单个海市站所要素船名
      hszsNames.push(hszsName)
    }
    parent.postMessage({
      act: 'hszsNames',
      msg: {
        name: JSON.stringify(hszsNames),
        type: 'hszs'
      }
    }, '*')
  }
}

/**
 *在地图页面显示当前范围内的监控视频
 * @param {Array[]} shipinFeatures
 */
function showVideoNameIntable (shipinFeatures) {
  if (shipinFeatures.length != 0) {
    var shipinNames = []
    for (i = 0; i < shipinFeatures.length; i++) {
      var shipinName = shipinFeatures[i].getProperties().name
      shipinNames.push(shipinName)
    }
    parent.postMessage({
      act: 'jksp',
      msg: {
        name: JSON.stringify(shipinNames)
      }
    }, '*')
    // console.log(shipinNames);
  }
}

/**
 *在地图页面显示当前范围内的救援物资
 * @param {Array[]} supportFeatures
 */
function showSupportNameIntable (supportFeatures) {
  if (supportFeatures.length != 0) {
    // var supportType = supportFeatures[0].getProperties()['type'];// 紧急物资图层 'support'
    var supportNames = []
    for (i = 0; i < supportFeatures.length; i++) {
      var supportName = supportFeatures[i].getProperties().name// 单个紧急物资要素名称
      supportNames.push(supportName)
    }
    parent.postMessage({
      act: 'support',
      msg: {
        name: JSON.stringify(supportNames),
        type: 'support'
      }
    }, '*')
    // console.log(supportType);
    // console.log(supportNames);
  }
}

/** *****************************************展示当前范围内要素结束****************************************/

/** **********************************************要素点击事件开始*****************************************/

/**
 * 公用弹出框显示方法
 * @param {ol.Map} map
 */
export function showPopup (map) {
  // 大连海事物标图片弹出层
  const imgContainer = document.getElementById('dlhsimg')
  const imgOverlay = new Overlay({
    element: imgContainer,
    autoPan: true
  })
  var singleClick = new Select({
    filter: function (feature, layer) {
      if (layer) {
        if (layer.getProperties().type !== 'draw' && layer.getProperties().type !== 'shipDensity') {
          return true
        }
      }
    }
  })
  singleClick.on('select', function (e) {
    var feature = e.target.getFeatures().getArray()[0]
    if (feature === undefined) {
      setTimeout(function () {
        var overlays = store.getters.app.map.getOverlays()
        overlays.forEach(function (e) {
          setTimeout(function () {
            store.getters.app.map.removeOverlay(e)
          }, 0)
        }, this)
      }, 1000)
      return
    }
    var coord = feature.getGeometry().getCoordinates()
    var property = feature.getProperties()
    var propertyType = property.datatype
    // 只有视频要素没有datatype属性

    if (propertyType == undefined) {
      var videoFeatures = property.features
      var videoList = []
      for (var i = 0; i < videoFeatures.length; i++) {
        let video = videoFeatures[i].getProperties()
        delete video.geometry
        videoList.push(video)
      }
      bus.$emit('video', videoList)
      return
    }
    if (propertyType === 0 || propertyType === 1 || propertyType === 2 || propertyType === 3) {
      store.getters.app.chosenLayer.setVisible(true)
      var obj = {}
      obj.shipName = property.shipname
      obj.shipLon = property.longitude
      obj.shipLat = property.latitude
      obj.shipSpeed = parseFloat(property.speed.toFixed(2))
      obj.shipDirection = property.direction
      obj.shipheadDirection = property.headdirection
      obj.shipMessage = property.signaltype + property.no
      obj.auditstatus = property.auditstatus
      obj.shipType = property.shiptype
      var receivetimestamp = HUtils.UTCToDateforSecond(property.receive_time)
      obj.receiveTime = HUtils.dateToStrforSecond(receivetimestamp)
      // 重新设置选中圆
      var originalShipCoor = feature.getGeometry().getFirstCoordinate(true)
      var centerDirect
      if (obj.shipSpeed < 1) {
        centerDirect = 90
      } else {
        centerDirect = (450 - obj.shipDirection) % 360
      }
      var centerX = originalShipCoor[0] - Math.cos(centerDirect * Math.PI / 180) * 10
      var centerY = originalShipCoor[1] - Math.sin(centerDirect * Math.PI / 180) * 10
      var newCirleCenter = [centerX, centerY]
      var chosenCircleGeometry = store.getters.app.chosenCircle.getGeometry()
      chosenCircleGeometry.setCenter(newCirleCenter)
      HShipLayers.setChosenShipname(obj.shipName)
    }
    console.log(property)
    console.log(obj)
    switch (propertyType) {
      case 0:
        bus.$emit('shipManage', obj)
        break
      case 1:
        bus.$emit('shipManage', obj)
        break
      case 2:
        bus.$emit('shipManage', obj)
        break
      case 3:
        bus.$emit('shipManage', obj)
        break
      case 'aisBase':
        console.log('AIS基站名称:' + property.name)
        console.log('id:' + property.id)
        parent.postMessage({
          act: 'AIS',
          msg: {
            name: property.name,
            id: property.id
          }
        }, '*')
        break
      case 'vhfBase':
        console.log('VHF基站名称:' + property.name)
        console.log('id:' + property.id)
        parent.postMessage({
          act: 'vhfName',
          msg: {
            name: property.name,
            id: property.id
          }
        }, '*')
        break
      case 'matou':
        console.log('码头名称:' + property.name)
        console.log('id:' + property.id)
        parent.postMessage({
          act: 'matouName',
          msg: {
            name: property.name,
            id: property.id
          }
        }, '*')
        break
      case 'support':
        console.log(property)
        parent.postMessage({
          act: 'wzcb',
          msg: {
            name: property.name,
            id: property.id
          }
        }, '*')
        break
      case 'hszs':
        console.log('海事站所名称:' + property.name)
        console.log('id:' + property.id)
        parent.postMessage({
          act: 'hszs',
          msg: {
            name: property.name,
            id: property.id
          }
        }, '*')
        break
      case 'contaminated':
        delete property.geometry
        parent.postMessage({
          act: 'contaminated',
          msg: {
            obj: property
          }
        }, '*')
        break
      case 'kakou':
        console.log('卡口名称:' + property.name)
        console.log('卡口编号:' + property.code)
        console.log('id:' + property.id)
        parent.postMessage({
          act: 'kakou',
          msg: {
            name: property.name,
            code: property.code,
            id: property.id
          }
        }, '*')
        break
      case 'dlhs':
        console.log('物标名称:' + property.name)
        var imgsrc = property.imgsrc
        if (imgsrc !== null && imgsrc !== '') {
          imgsrc = GIS_DLHSFEATURES + '/' + imgsrc
          $('#feaimg').attr('src', imgsrc)
        }
        $('#dlhsimg').show()
        imgOverlay.setPosition(coord)
        map.addOverlay(imgOverlay)
        break
      case 'airquality':
        // parent.postMessage({
        //   act: 'quality',
        //   msg: {
        //     obj: property
        //   }
        // }, '*')
        parent.postMessage({
          act: 'quality',
          msg: {
            obj: property.obj
          }
        }, '*')
        break
      case 'navsecurity':
        parent.postMessage({
          act: 'passage',
          msg: {
            id: property.id,
            value: property.segmentvalue
          }
        }, '*')
        break
      case 'hdpoint':
        console.log(property.id)
        console.log(property.name)
        break
      case 'hydrology':
        console.log(property.id)
        console.log(property.name)
        console.log(property.id)
        console.log(property.name)
        parent.postMessage({
          act: 'hydrology',
          msg: {
            id: property.id
          }
        }, '*')
        break
      case 'ferry':
        console.log(property.id)
        console.log(property.name)
        parent.postMessage({
          act: 'ferry',
          msg: {
            id: property.id
          }
        }, '*')
        break
      case 'bridge':
        bus.$emit('bridge', property.id)
        // console.log(property.id)
        // console.log(property.name)
        // parent.postMessage({
        //   act: 'bridge',
        //   msg: {
        //     id: property.id
        //   }
        // }, '*')
        break
      case 'anchorpoint':
        parent.postMessage({
          act: 'anchoragepoint',
          msg: {
            id: property.id
          }
        }, '*')
        break
      case 'portEnterprise':
        console.log(property.id)
        console.log(property.name)
        parent.postMessage({
          act: 'enterprisePort',
          msg: {
            id: property.id
          }
        }, '*')
        break
      case 'dangerstore':
        console.log(property.id)
        console.log(property.name)
        parent.postMessage({
          act: 'dangerstore',
          msg: {
            id: property.id
          }
        }, '*')
        break
      case 'emergencyteam':
        console.log(property.id)
        console.log(property.name)
        parent.postMessage({
          act: 'emergencyteam',
          msg: {
            id: property.id
          }
        }, '*')
        break
      case 'materialreservepoint':
        console.log(property.id)
        console.log(property.name)
        parent.postMessage({
          act: 'jjwz',
          msg: {
            id: property.id
          }
        }, '*')
        break
      default:
        break
    }
  })
  store.getters.app.map.addInteraction(singleClick)
}

/**
 * 点击视频显示附近船舶信息列表  (船名 经纬度)
 * @param {Number} lon 视频经度
 * @param {Number} lat 视频纬度
 */
function clickVideoButtonToShowShipMessage (lon, lat, xhlc) {
  var roundShipList = []// 返回船舶列表数组
  // 获取混合船舶图层中的所有船舶
  var shipfeatures = HShipLayers.queryShipFeatures()
  $.each(shipfeatures, function (i, item) {
    var shipAttribute = {}
    var feacoor = item.getGeometry().getCoordinates()
    var feaWGS84coor = webMctToWGS84(feacoor[0], feacoor[1])
    var feaLon = parseFloat(feaWGS84coor[0].toFixed(4))
    var feaLat = parseFloat(feaWGS84coor[1].toFixed(4))

    var feaName = item.getProperties().shipname

    var disBetweenShipAndTheVideo = getDistance(lon, lat, feaLon, feaLat)
    if (disBetweenShipAndTheVideo < xhlc) {
      shipAttribute.name = feaName
      shipAttribute.lonitude = feaLon
      shipAttribute.latitude = feaLat
      shipAttribute.distance = disBetweenShipAndTheVideo
      roundShipList.push(shipAttribute)
    }
  })

  function sortDistance (a, b) {
    return a.distance - b.distance
  }

  roundShipList.sort(sortDistance)
  parent.postMessage({
    act: 'rtmp1',
    msg: {
      obj: roundShipList
    }
  }, '*')
}

/**
 * 定位到视频
 * @param name  监控视频名称
 * @description 监控视频属于聚合图层，定位要素方法单独使用
 */
function locateToVideo (name) {
  var targetFeature
  var clusterFeatures = store.getters.app.videoLayer.layer.getSource().getSource().getFeatures()
  if (clusterFeatures.length !== 0) {
    for (var j = 0; j < clusterFeatures.length; j++) {
      var featureName = clusterFeatures[j].getProperties().name
      if (featureName === name) {
        targetFeature = clusterFeatures[j]
      }
    }
  }
  if (targetFeature) {
    var mapView = store.getters.app.map.getView()
    mapView.fit(targetFeature.getGeometry(), store.getters.app.map.getSize())
  } else {
    console.log('获取不到视频,定位失败')
  }
}

/**
 * 创建视频点击提示框
 * @param output
 * @param coor
 */

/**
 * 视频播放
 */
// function playVideo (id, name, ipaddress, channel, username, password, port, lon, lat, patrolMileage) {
//   $.ajax({
//     url: 'http://10.100.70.226:80/api/gis/videoSurveillance/live/' + id,
//     method: 'get',
//     success: function (data) {
//       if (patrolMileage && patrolMileage !== '') {
//         var xhlc = parseInt(patrolMileage) / 1000
//         clickVideoButtonToShowShipMessage(lon, lat, xhlc)
//       }
//       parent.postMessage({
//         act: 'rtmp',
//         msg: {
//           name: name,
//           rtmp: data.data.rtmp,
//           id: id,
//           ip: ipaddress,
//           channel: channel,
//           userName: username,
//           password: password,
//           port: port
//         }
//       }, '*')
//     }
//   })
//   // console.log("视频名称:" + property['name']);
//   // console.log("播放地址:" + property['rtmp']);
//   // console.log("id:" + property['id']);
//   // console.log("ip:" + property['ipAdress']);
//   // console.log("通道:" + property['channel']);
//   // console.log("用户名:" + property['userName']);
//   // console.log("密码:" + property['password']);
//   // console.log("端口:" + property['port']);
// }
/** **********************************************要素点击事件结束*****************************************/

/** ************************************************地图操控开始*******************************************/

/**
 * 显示电子地图
 */
function openDZDT () {
  showInfoLayer('DZDT', true)
  showInfoLayer('YXT', false)
}

/**
 * 显示卫星影像图
 */
function openYXT () {
  showInfoLayer('YXT', true)
  showInfoLayer('DZDT', false)
}

/**
 * 控制双图层显隐
 * @param type
 * @param flag
 */
function showInfoLayers (type, flag) {
  if (type === 'anchoragepoint') {
    showInfoLayer('anchoragepoint', flag)
    showInfoLayer('anchoragepoint', flag)
  }
}

/**
 * 显示和隐藏电子航道图
 */
function switchDZHDT () {
  var switchflag = $('#DZHDT').attr('name')
  if (switchflag == 'show') {
    showInfoLayer('DZHDT', false)
    $('#DZHDT').attr('name', 'hide')
  } else if (switchflag == 'hide') {
    showInfoLayer('DZHDT', true)
    $('#DZHDT').attr('name', 'show')
  }
}

/**
 * 显示和隐藏水深点地图
 */
function switchSSDDT () {
  var switchflag = $('#SSDDT').attr('name')
  if (switchflag == 'show') {
    showInfoLayer('SSDDT', false)
    $('#SSDDT').attr('name', 'hide')
  } else if (switchflag == 'hide') {
    showInfoLayer('SSDDT', true)
    $('#SSDDT').attr('name', 'show')
  }
}

/**
 * 显示隐藏大连海事标志标牌
 * @param flag
 */
function switchDLHSMarker (flag) {
  if (flag) {
    showInfoLayer('dmarkerassist', true)
    showInfoLayer('dmarker', true)
    showInfoLayer('dfeature', true)
  } else {
    showInfoLayer('dmarkerassist', false)
    showInfoLayer('dmarker', false)
    showInfoLayer('dfeature', false)
  }
}

/**
 * 新窗口中弹出子页面
 * @param {String} url 链接
 * @param {String} 窗口样式
 */
function openWindow (url, styleParameter) {
  window.open(url, '_blank', styleParameter)
}

/**
 * 隐藏船舶选中圆
 */
function hideChosenCricle () {
  store.getters.app.chosenLayer.setVisible(false)
}

/**
 * 信号设置
 * @param {Number} offlineTime 离线时间
 * @param {Number} dataType 0:混合 1:GPS 2:AIS
 * @param {Array} shiptype 0:未知 1:客船 2:货船 3:危险品船 99:其他
 * @param {Number} speedsignal 0:全部船舶 1:行驶船舶 2:静止船舶 3:全部隐藏
 * @description 控制显示船舶图层，包括船舶信号类型、船舶数据类型、船舶离线时间、船舶行驶状态(静止或行驶)
 */
function signalSettings (offlineTime, datatype, shiptype, speedsignal) {
  console.log(datatype)
  HShipLayers.setQueryParams(offlineTime, datatype, shiptype, speedsignal)
  HShipLayers.queryWMSShips()
  HShipLayers.queryWFSShips(false)
  showShipNameIntable(HShipLayers.queryShipFeatures(store.getters.app.currentExtent))
}

/**
 * 自定义状态设置
 * @param auditstatus 默认:'' 正常:1 核查未通过:2 持续关注:3
 * @description 显示持续关注船舶用
 */
function auditStatusSettings (auditstatus) {
  console.log(auditstatus)
  HShipLayers.setAuditStatusFlag(auditstatus)
  HShipLayers.queryWMSShips()
  HShipLayers.queryWFSShips(false)
}

/**
 * 定位浙江省区县
 * @param countyname
 * @description 暂定区县图层为按需请求加载
 */
function locateToCounty (countyname) {
  if (countyname && countyname !== '') {
    const queryfilter = '(name = \'' + countyname + '\')'
    const queryCql = '' + queryfilter
    const queryurl = GIS_COUNTYWFS + '&cql_filter=' + encodeURI(queryCql)
    const geoformat = new GeoJSON()
    $.ajax({
      url: queryurl,
      type: 'get',
      success: function (data) {
        store.getters.app.countyLayer.clear()
        const countyFeature = geoformat.readFeatures(data)
        if (countyFeature.length !== 0) {
          // console.log(countyFeature[0])
          const textFont = 16 + 'px Microsoft YaHei'
          const countyLabel = new Text({
            text: countyname,
            font: textFont,
            scale: 1.5,
            textAlign: 'left',
            fill: new Fill({
              color: [65, 105, 225]
            }),
            stroke: new Stroke({
              color: [255, 255, 255],
              width: 1.5
            })
          })
          countyFeature[0].setStyle(
            new Style({
              text: countyLabel,
              fill: new Fill({
                color: [255, 255, 255, 0]
              }),
              stroke: new Stroke({
                color: [0, 0, 255],
                width: 2,
                lineDash: [1, 2, 3, 4]
              })
            })
          )
          store.getters.app.countyLayer.addPolygonSymbol(countyFeature)
          locateTo('zjcounty', countyname)
        } else {
          console.log('不存在该区县名称')
        }
      }
    })
  }
}

/** ************************************************地图操控结束*******************************************/

/** ***********************************************业务工具栏开始******************************************/

/**
 *显示报警
 * @param {Number} lon
 * @param {Number} lat
 * @param {String} alarmID
 */
function showAlarmPoint (lon, lat, alarmID) {
  $('#css_animation').css('display', 'block')
  pointTo(lon, lat, 14)
  var flashFeatures = store.getters.app.flashLayer.getFeatureArray()
  if (flashFeatures.length !== 0) {
    for (let i = 0; i < flashFeatures.length; i++) {
      var flashFeatureID = flashFeatures[i].getProperties().id
      if (flashFeatureID === alarmID) {
        store.getters.app.flashLayer.removeSingleFeature(flashFeatures[i])
        return
      }
    }
  }
  addFlashMarker(lon, lat, alarmID)
}

/**
 *解除报警
 * @param {String} alarmID
 */
function removeAlarmPoint (alarmID) {
  $('#css_animation').css('display', 'none')
  var flashFeatures = store.getters.app.flashLayer.getFeatureArray()
  if (flashFeatures.length != 0) {
    for (let i = 0; i < flashFeatures.length; i++) {
      var flashFeatureID = flashFeatures[i].getProperties().id
      if (flashFeatureID === alarmID) {
        store.getters.app.flashLayer.removeSingleFeature(flashFeatures[i])
        return
      }
    }
  }
}

/**
 * 抵达时间
 * @description 海巡救援
 */
function calArriveTime () {
  var shipSpeed = parseInt($('#hxSpeed').val().split('km/h')[0])

  var source = new SVector()
  var vector = new Vector({
    type: 'draw',
    source: source,
    style: new Style({
      stroke: new Stroke({
        color: [255, 69, 0],
        width: 3
      })
    })
  })
  store.getters.app.map.addLayer(vector)
  var dismeasure
  // 开始绘制
  dismeasure = new Draw({
    source: source,
    type: 'LineString',
    style: new Style({
      image: new Circle({
        radius: 5,
        fill: new Fill({
          color: [255, 255, 255, 0.5]
        }),
        stroke: new Stroke({
          color: [255, 69, 0],
          width: 1.5
        })
      }),
      stroke: new Stroke({
        color: [255, 69, 0],
        width: 2,
        lineDash: [10, 10]
      })
    })
  })
  dismeasure.on('drawstart',
    function (evt) {
      var fea = evt.feature // 绘制的要素
      fea.getGeometry().on('change', function (evt) { // 鼠标在移动的时候执行
        var geom = evt.target
        if (geom instanceof LineString) {
          var distance = formatLength(geom)
          var time = finaltime(distance, shipSpeed)
        }
        $('#arriveTime').attr('value', time)
      })
    }, this)
  dismeasure.on('drawend', function (evt) {
    store.getters.app.map.removeInteraction(dismeasure)
  }, this)
  store.getters.app.map.addInteraction(dismeasure)
}

/**
 * 返回某辖区内总船舶数量和分类船舶数量
 * @param {String} manageName 辖区名称
 * @description 一键巡查用（此方法暂不用，功能改为查询某航段内船舶数量和分类船舶数量）
 */
function quantityOfTheManagearea (manageName) {
  var manageShipInfo = {}
  var allShips = []// 全部船舶
  var goodsShips = []// 货船
  var passengerShips = []// 客船
  var dangerShips = []// 危险品船
  var otherShips = []// 其他船舶
  var manageareaFeaures = store.getters.app.manageareaLayer.getFeatureArray()
  var theManageAreaFeature

  for (var i = 0; i < manageareaFeaures.length; i++) {
    var mName = manageareaFeaures[i].getProperties().name
    if (mName === manageName) {
      theManageAreaFeature = manageareaFeaures[i]
      break
    }
  }
  // console.log(theManageAreaFeature)
  var theExtent = theManageAreaFeature.getGeometry().getExtent()
  var themanageGeo = theManageAreaFeature.getGeometry().getCoordinates(true)
  // 辖区turf polygon
  var theTurfPolygon = turf.polygon(themanageGeo)
  // 先获取辖区extent(矩形)内船舶要素
  var shipfeatures = HShipLayers.queryShipFeatures(theExtent)
  // 再处理extent内船舶
  for (var i = 0; i < shipfeatures.length; i++) {
    var property = shipfeatures[i].getProperties()
    var theShipGeo = wgs84ToWebMct(property.longitude, property.latitude)
    var theTurfPoint = turf.point(theShipGeo)
    if (turf.booleanPointInPolygon(theTurfPoint, theTurfPolygon)) { // 辖区内的船舶
      allShips.push(shipfeatures[i])
      var type = property.shiptype
      if (type === 2) {
        goodsShips.push(shipfeatures[i])
      } else if (type === 1) {
        passengerShips.push(shipfeatures[i])
      } else if (type === 3) {
        dangerShips.push(shipfeatures[i])
      } else {
        otherShips.push(shipfeatures[i])
      }
    }
  }
  manageShipInfo.allships = allShips.length
  manageShipInfo.goodships = goodsShips.length
  manageShipInfo.passengerships = passengerShips.length
  manageShipInfo.dangerships = dangerShips.length
  manageShipInfo.otherships = otherShips.length
  parent.postMessage({
    act: 'manageShipInfo',
    msg: {
      obj: JSON.stringify(manageShipInfo)
    }
  }, '*')
}

/**
 * 返回某航段内总船舶数量和分类船舶数量
 * @param {String} segmentName 辖区名称
 * @description 一键巡查用
 */
function quantityOfTheSegment (segmentName) {
  var segmentShipInfo = {}
  var allShips = []// 全部船舶
  var goodsShips = []// 货船
  var passengerShips = []// 客船
  var dangerShips = []// 危险品船
  var otherShips = []// 其他船舶
  var segmentFeaures = store.getters.app.segmentLayer.getFeatureArray()
  var theSegmentFeature

  for (var i = 0; i < segmentFeaures.length; i++) {
    var sName = segmentFeaures[i].getProperties().name
    if (sName === segmentName) {
      theSegmentFeature = segmentFeaures[i]
      break
    }
  }
  var theExtent = theSegmentFeature.getGeometry().getExtent()
  var thesegmentGeo = theSegmentFeature.getGeometry().getCoordinates(true)
  // 辖区turf polygon
  var theTurfPolygon = turf.polygon(thesegmentGeo)
  // 先获取辖区extent(矩形)内船舶要素
  var shipfeatures = HShipLayers.queryShipFeatures(theExtent)
  // 再处理extent内船舶
  for (var i = 0; i < shipfeatures.length; i++) {
    var property = shipfeatures[i].getProperties()
    var theShipGeo = wgs84ToWebMct(property.longitude, property.latitude)
    var theTurfPoint = turf.point(theShipGeo)
    if (turf.booleanPointInPolygon(theTurfPoint, theTurfPolygon)) { // 辖区内的船舶
      allShips.push(shipfeatures[i])
      var type = property.shiptype
      if (type == 2) {
        goodsShips.push(shipfeatures[i])
      } else if (type == 1) {
        passengerShips.push(shipfeatures[i])
      } else if (type == 3) {
        dangerShips.push(shipfeatures[i])
      } else {
        otherShips.push(shipfeatures[i])
      }
    }
  }
  segmentShipInfo.allships = allShips.length
  segmentShipInfo.goodships = goodsShips.length
  segmentShipInfo.passengerships = passengerShips.length
  segmentShipInfo.dangerships = dangerShips.length
  segmentShipInfo.otherships = otherShips.length
  // console.log(segmentShipInfo)
  parent.postMessage({
    act: 'segmentShipInfo',
    msg: {
      obj: JSON.stringify(segmentShipInfo)
    }
  }, '*')
}

/**
 * 船名模糊查询,九位码精确查询
 * @param {String} nameorno 查询参数,船名或九位码
 */
function queryForShipnameOrShipno (nameorno) {
  hideChosenCricle()
  store.getters.app.nameorno = nameorno
  HShipLayers.queryWMSShips()
  HShipLayers.queryWFSShips(false)
  var selectedShipFeatures = HShipLayers.queryWFSShipsByShipnameOrShipno(nameorno)
  var selectedships = []
  if (selectedShipFeatures.length != 0) {
    for (var i = 0; i < selectedShipFeatures.length; i++) {
      var obj = {}
      obj.name = selectedShipFeatures[i].getProperties().shipname
      obj.type = selectedShipFeatures[i].getProperties().shiptype
      selectedships.push(obj)
    }
  }
  parent.postMessage({
    act: 'ship',
    msg: {
      name: selectedships
    }
  }, '*')
  // console.log(selectedships)
}

/**
 * 获取某区域内船舶
 * @description 参考
 */
function getShipsInArea () {
  // var queryURL =
  //   'http://10.100.70.227:8090/geoserver/geobase/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geobase:zj_city&maxFeatures=20&outputFormat=application/json'
  // var queryFilter = '&cql_filter=' + encodeURI('NAME = \'湖州\'')
  // var areaURL = queryURL + queryFilter
  // var geoformat = new ol.format.GeoJSON()
  // $.ajax({
  //   url: areaURL,
  //   type: 'get',
  //   async: false,
  //   success: function(data) {
  //     var features = geoformat.readFeatures(data)
  //     features[0].setStyle(
  //       new ol.style.Style({
  //         fill: new ol.style.Fill({
  //           color: [255, 255, 0, 0.5]
  //         }),
  //         stroke: new ol.style.Stroke({
  //           color: [255, 0, 0],
  //           width: 1.5
  //         })
  //       }))
  //     app.testFeatureLayer.addPolygonSymbol(features)
  //     var areaGeometry = features[0].getGeometry()
  //     // HShipLayer.queryShipsFeaturesInArea(areaGeometry) //市区坐标太大
  //   }
  // })

  // 测试区域
  var arr = [[120.1298, 30.9511], [120.1195, 30.9466], [120.1195, 30.9295], [120.1260, 30.9264], [120.1335, 30.9307], [120.1361, 30.9458], [120.1298, 30.9511]]
  var coors = []
  for (var i = 0; i < arr.length; i++) {
    coors[i] = wgs84ToWebMct(arr[i][0], arr[i][1])
  }
  var polygonSymbol = new Feature({
    geometry: new Polygon([coors])
  })
  polygonSymbol.setStyle(
    new Style({
      fill: new Fill({
        color: [255, 255, 0, 0.5]
      }),
      stroke: new Stroke({
        color: [255, 0, 0],
        width: 1.5
      })
    }))
  store.getters.app.testFeatureLayer.addPolygonSymbol([polygonSymbol])
  var areaGeometry = polygonSymbol.getGeometry()
  var shipFeatures = HShipLayer.queryShipsFeaturesInArea(areaGeometry)
  for (var i = 0; i < shipFeatures.length; i++) {
    var property = shipFeatures[i].getProperties()
    console.log(property.shipname)
  }
}

/**
 * 通航预警闪烁
 */
function navAlarmFlash () {
  var overlays = store.getters.app.map.getOverlays()
  overlays.forEach(function (e) {
    setTimeout(function () {
      store.getters.app.map.removeOverlay(e)
    }, 5)
  }, this)
  $.ajax({
    url: GIS_SERVERIP + '/safety/navigationWarning/gisFlicker',
    type: 'get',
    dataType: 'json',
    async: false,
    success: function (d) {
      var alarmdata = d.data
      for (var i = 0; i < alarmdata.length; i++) {
        var lon = alarmdata[i].longitude
        var lat = alarmdata[i].latitude
        if (lon && lat) {
          var coor = wgs84ToWebMct(lon, lat)
          var flash_div = document.createElement('div')
          flash_div.className = 'nav_animation'
          var flashOverlay = new Overlay({
            element: flash_div,
            positioning: 'center-center',
            offset: [0, 0],
            stopEvent: false
          })
          flashOverlay.setPosition(coor)
          store.getters.app.map.addOverlay(flashOverlay)
        }
      }
    }
  })
}

/* function refreshNavAlarmFlash () {
  navAlarmFlash()
  setInterval(() => {
    navAlarmFlash()
  }, 10000)
}

/!**
 * 获取框选区域内船舶信息
 *!/
function getShipInfoOfMangerArea () {
  clearFeature()
  var source = new SVector({
    wrapX: false
  })
  var vector = new Vector({
    type: 'draw',
    source: source,
    style: new Style({
      fill: new Fill({
        color: [255, 255, 255, 0.3]
      }),
      stroke: new Stroke({
        color: [255, 255, 0],
        width: 3
      })
    })
  })
  var layers = store.getters.app.map.getLayers()
  layers.insertAt(5, vector)
  var draw
  var geometryFunction = Draw.createBox()
  draw = new Draw({
    source: source,
    type: 'Circle',
    geometryFunction: geometryFunction
  })
  draw.on('drawend', function (evt) {
    var fea = evt.feature
    var boxExtent = fea.getGeometry().getExtent()
    // 获取框选区域内的船
    showShipInfo(HShipLayers.queryShipFeatures(boxExtent))
    store.getters.app.map.removeInteraction(draw)
  }, this)
  store.getters.app.map.addInteraction(draw)
} */

// 框选区域显示分类船舶
// function showShipInfo (shipFeatures) {
//   var shipinfo = {}
//   var allShips = [] // 全部船舶名称
//   var hxtShips = [] // 海巡艇船舶名称
//   var passengerShips = [] // 客船名称
//   var goodsShips = [] // 货船名称
//   var dangerShips = [] // 危险品船舶名称
//   var otherShips = [] // 其他船舶名称
//   for (var i = 0; i < shipFeatures.length; i++) {
//     var shiptype = shipFeatures[i].getProperties().shiptype // 船舶种类 1:客船 2:货船 3:危险品船 0或99:其他
//     var shipname = shipFeatures[i].getProperties().shipname
//     allShips.push(shipname)
//     if (shipname.substr(0, 3) === GIS_HXTSHIP) {
//       hxtShips.push(shipname)
//     } else if (shiptype === GIS_PASSENGERSHIP) {
//       passengerShips.push(shipname)
//     } else if (shiptype === GIS_GOODSSHIP) {
//       goodsShips.push(shipname)
//     } else if (shiptype === GIS_DANGERSHIP) {
//       dangerShips.push(shipname)
//     } else {
//       otherShips.push(shipname)
//     }
//   }
//   shipinfo.all = allShips
//   shipinfo.hxt = hxtShips
//   shipinfo.passenger = passengerShips
//   shipinfo.goods = goodsShips
//   shipinfo.danger = dangerShips
//   shipinfo.other = otherShips
//   console.log(shipinfo)
//   parent.postMessage({
//     act: 'qySelect',
//     msg: {
//       obj: JSON.stringify(shipinfo)
//     }
//   }, '*')
// }

/** ***********************************************业务工具栏结束******************************************/
