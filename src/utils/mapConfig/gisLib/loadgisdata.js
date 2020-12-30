/* eslint-disable */
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
import { Style, Icon, Fill, Stroke } from 'ol/style'
import { Feature } from 'ol'
import { Point, Polygon } from 'ol/geom'
import { Vector as SVector, Cluster } from 'ol/source'
const bridgeImg = require('@/utils/mapConfig/img/bridge.png')
const videoImg = require('@/utils/mapConfig/img/video.png')

export function loadInfoLayer (type) {
  if ((type == null || type === 'bridge') && store.getters.app.bridgeLayer) loadBridgeLayer()
  if ((type == null || type === 'video') && store.getters.app.videoLayer) loadVideo()
  if ((type == null || type === 'checkarea') && store.getters.app.checkAreaLayer) loadCheckArea()
  if ((type == null || type === 'monitorarea') && store.getters.app.monitoringAreaLayer) loadMonitorArea()
}

export function loadCheckArea () {
  checkAreaList().then(d => {
    var areadata = d.data.dataList
    var polygonSymbol = []
    store.getters.app.checkAreaLayer.clear()
    $.each(areadata, function (i, item) {
      var careaAttr = {
        name: item.cereaName,
        datatype: 'checkarea',
        areaType: item.areaType,
        code: item.code
      }
      if (item.cereaCoordinates != null && item.cereaCoordinates !== '') {
        var areaPoints = JSON.parse(item.cereaCoordinates)
        var points = []
        for (var i = 0; i < areaPoints.length; i++) {
          var lonlat = wgs84ToWebMct(areaPoints[i].x, areaPoints[i].y)
          points.push(lonlat)
        }
        var careaSymbol
          if (item.areaType === '1') {
          careaSymbol = HSymbol.getPolygonSymbolWithoutLabel(careaAttr, [points], [0, 0, 255, 0.6], [0, 0, 255, 0.5], 2, false)
        } else if (item.areaType === '2') {
          careaSymbol = HSymbol.getPolygonSymbolWithoutLabel(careaAttr, [points], [255, 165, 0, 0.6], [255, 165, 0, 0.5], 2, false)
        } else if (item.areaType === '3') {
          careaSymbol = HSymbol.getPolygonSymbolWithoutLabel(careaAttr, [points], [220, 20, 60, 0.6], [220, 20, 60, 0.5], 2, false)
        }
        polygonSymbol.push(careaSymbol)
      }
    })
    store.getters.app.checkAreaLayer.addPolygonSymbol(polygonSymbol)
  })
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
    response.data.dataList.forEach(item => {
      var lon = parseFloat(item.longitude)
      var lat = parseFloat(item.latitude)
      if (lon > 0 && lon < 180 && lat > 0 && lat < 90) {
        var videoAttr = {
          datatype: 'shipin',
          name: item.videoName,
          id: item.id,
          rtmp: item.h5Address,
          userName: item.userName,
          password: item.password,
          port: item.porte,
          ipAdress: item.ipAddress,
          longitude: item.longitude,
          latitude: item.latitude
        }
        var lonlat = wgs84ToWebMct(lon, lat)
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

function loadMonitorArea(){
  const mlayer = store.getters.app.monitoringAreaLayer.layer
  let layerStyle = new Style({
    fill: new Fill({
      color: [0,255,255,0.4]
    }),
    stroke: new Stroke({
      color: [248,248,255,0.9],
      width: 1.5
    })
  })
  mlayer.setStyle(layerStyle)
  // 添加区域
  let polygonSymbol = []
  let areacoors = [
    [[120.166901,30.106308],[120.166907,30.105955],[120.167159,30.106034],[120.166901,30.106308]],
    [[120.167186,30.105612],[120.166939,30.105867],[120.167180,30.105946],[120.167186,30.105612]],
    [[120.167336,30.105245],[120.167336,30.104925],[120.167577,30.105004],[120.167336,30.105245]],
    [[120.167593,30.104610],[120.167357,30.104851],[120.167604,30.104939],[120.167593,30.104610]],
    [[120.167749,30.104248],[120.167760,30.103904],[120.168006,30.103978],[120.167749,30.104248]],
    [[120.168028,30.103570],[120.167797,30.103821],[120.168044,30.103895],[120.168028,30.103570]]
  ]
  areacoors.forEach(coor => {
    let points = []
    coor.forEach(item => {
      let lon = item[0]
      let lat = item[1]
      let lonlat = wgs84ToWebMct(lon, lat)
      points.push(lonlat)
    })
    let feature = new Feature({
      geometry: new Polygon([points])
    })
    feature.setProperties({datatype: 'monitorarea'}, false)
    polygonSymbol.push(feature)
  })
  store.getters.app.monitoringAreaLayer.addPolygonSymbol(polygonSymbol)
  // let polygonSymbol = []
  // let points = []
  // for(let i = 0; i < areacoors.length; i++){
  //   let lon = areacoors[i][0]
  //   let lat = areacoors[i][1]
  //   let lonlat = wgs84ToWebMct(lon, lat)
  //   points.push(lonlat)
  // }

  // let feature = new Feature({
  //   geometry: new Polygon([points])
  // })
  // polygonSymbol.push(feature)
  // console.log(polygonSymbol)
  // store.getters.app.monitoringAreaLayer.addPolygonSymbol(polygonSymbol)
}



/** *****************************************要素获取及展示方法结束****************************************/
