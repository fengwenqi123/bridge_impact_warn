/**
 * GIS要素数据加载js
 * created by zj on 2018.8.30
 */

/** *****************************************要素获取及展示方法开始****************************************/
/**
 * 分层加载要素数据
 * @param {String} type 加载业务要素类型
 * @description 除船舶图层外,其他要素初始化时顺次添加一次
 */
import store from '@/store'
import { wgs84ToWebMct } from './HTool'
import HSymbol from './HSymbol'
import { bridgeList, videoList, checkAreaList } from '../api/data'
import { Style, Icon } from 'ol/style'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import { Vector as SVector, Cluster } from 'ol/source'
const bridgeImg = require('@/utils/mapConfig/img/bridge.png')
const videoImg = require('@/utils/mapConfig/img/video.png')

export function loadInfoLayer (type) {
  if ((type == null || type === 'bridge') && store.getters.app.bridgeLayer) loadBridgeLayer()
  if ((type == null || type === 'video') && store.getters.app.videoLayer) loadVideo()
  if ((type == null || type === 'checkarea') && store.getters.app.checkAreaLayer) loadCheckArea()
}

function loadCheckArea () {
  checkAreaList().then(response => {
    // console.log(response)
  })
  // $.ajax({
  //   url: GIS_SERVERIP + 'zoneAdministration/getZoneDataList?pageNum=1&pageSize=30',
  //   type: 'get',
  //   dataType: 'json',
  //   success: function (d) {
  //     console.log(d)
  // var areadata = d.data
  // var polygonSymbol = []
  // app.safeworkareaLayer.clear()
  // $.each(areadata, function(i, item) {
  //   var sareaAttr = {
  //     'datatype': 'safework',
  //     'name': item.name
  //   }
  //   if (item.area != null && item.area != '') {
  //     var areaObj = JSON.parse(item.area)
  //     var areaPoints = areaObj.pointList
  //     var points = []
  //     for (i = 0; i < areaPoints.length; i++) {
  //       var lonlat = wgs84ToWebMct(areaPoints[i].x, areaPoints[i].y)
  //       points.push(lonlat)
  //     }
  //     var sareaSymbol = HSymbol.getPolygonSymbol(sareaAttr, [points], [255, 255, 255, 0.2], [50, 205, 50], 2, false, sareaAttr['name'], 16, [255, 165, 0])
  //     polygonSymbol.push(sareaSymbol)
  //   }
  // })
  // app.safeworkareaLayer.addPolygonSymbol(polygonSymbol)
  //   }
  // })
}

/**
 * 加载要素
 */
function loadBridgeLayer () {
  bridgeList().then(response => {
    const markerSymbol = []
    store.getters.app.bridgeLayer.clear()
    response.data.forEach(item => {
      const bridgeAttr = {
        datatype: 'bridge',
        name: item.name,
        id: item.id
      }
      if (item.longitude != null && item.latitude != null) {
        var lonlat = wgs84ToWebMct(item.longitude, item.latitude)
        var bridgeSymbol = HSymbol.getPictureMarkerSymbol(bridgeAttr, lonlat, bridgeImg, 0.5, bridgeAttr.name, 14, [0, 0, 0], -20, -20)
        markerSymbol.push(bridgeSymbol)
      }
    })
    store.getters.app.bridgeLayer.addMarkerSymbol(markerSymbol)
  })
}

function loadVideo () {
  videoList().then(response => {
    const markerSymbol = []
    var videoStyle = new Style({
      image: new Icon({
        src: videoImg,
        scale: 0.7
      })
    })
    store.getters.app.videoLayer.layer.setStyle(videoStyle)
    store.getters.app.videoLayer.layer.setMaxResolution(160)
    response.data.forEach(item => {
      if (item.longitude > 0 && item.longitude < 180 && item.latitude > 0 && item.latitude < 90 && item.enable === 1) {
        console.log(item)
        var videoAttr = {
          datatype: 'shipin',
          name: item.name,
          id: item.id,
          rtmp: item.rtmp,
          userName: item.userName,
          password: item.password,
          port: item.port,
          ipAdress: item.ipAdress,
          channel: item.channel,
          longitude: item.longitude,
          latitude: item.latitude,
          patrolMileage: item.patrolMileage
        }
        var lonlat = wgs84ToWebMct(item.longitude, item.latitude)
        var videoSymbol = new Feature({
          geometry: new Point(lonlat)
        })
        videoSymbol.setProperties(videoAttr, false)
        markerSymbol.push(videoSymbol)
      } else {
        // console.log(item.name)
      }
    })
    // 在控制显示的分辨率范围内clustersource才会加载videosource，导致初始化时地图移动、框选、一键抓拍获取视频要素失效
    // 为保证执行结果，将videoSource设置为全局变量
    store.getters.app.videoSource = new SVector({
      features: markerSymbol
    })
    var videoClusterSource = new Cluster({
      source: store.getters.app.videoSource
    })
    store.getters.app.videoLayer.layer.setSource(videoClusterSource)
    // /* var videofeatures = */store.getters.app.videoSource.getFeaturesInExtent(store.getters.app.currentExtent)
    // showVideoNameIntable(videofeatures)
  })
}

/** *****************************************要素获取及展示方法结束****************************************/
