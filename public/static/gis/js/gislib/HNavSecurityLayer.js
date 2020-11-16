/**
 * 通航指数图层工具集
 * created by zj on 2019.12.25
 */
var HNavSecurityLayer = (function() {
  let hMap                   //地图对象
  let navLayer               //通航指数图层
  let navUrl = ''         //通航指数接口
  // 暂定通航等级 指数越小越不容易通航;指数越大越容易通航
  // [0,20):I 红色; [20-40):II 橙色; [40,60):III 黄色; [60,80): IV 绿色; [80,100] V 深绿色
  const navStyles = new Map()
  const levelOne = new ol.style.Style({
    fill: new ol.style.Fill({
      color: [255, 0, 0]
    })
  })
  navStyles.set(1, levelOne)
  const levelTwo = new ol.style.Style({
    fill: new ol.style.Fill({
      color: [255, 165, 0]
    })
  })
  navStyles.set(2, levelTwo)
  const levelThree = new ol.style.Style({
    fill: new ol.style.Fill({
      color: [255, 255, 0]
    })
  })
  navStyles.set(3, levelThree)
  const levelFour = new ol.style.Style({
    fill: new ol.style.Fill({
      color: [0, 255, 0]
    })
  })
  navStyles.set(4, levelFour)
  const levelFive = new ol.style.Style({
    fill: new ol.style.Fill({
      color: [0, 100, 0]
    })
  })
  navStyles.set(5, levelFive)

  return {
    /**
     * 初始化通航指数图层
     * @param {ol.Map} map   app.map
     * @param {String} url   通航指数接口地址
     */
    init: (map, url) => {
      hMap = map
      navUrl = url + "/safety/segment/queryAllSegmentValue";
      navLayer = new ol.layer.Vector({
        type: 'navsecurity',
        source: new ol.source.Vector({}),
        style: function(feature) {
          let navProperty = feature.getProperties()
          let segmentvalue = navProperty['segmentvalue']
          let style
          if (segmentvalue >= 0 && segmentvalue < 20) {
            style = navStyles.get(1);
          } else if (segmentvalue >= 20 && segmentvalue < 40) {
            style = navStyles.get(2);
          } else if (segmentvalue >= 40 && segmentvalue < 60) {
            style = navStyles.get(3)
          } else if (segmentvalue >= 60 && segmentvalue < 80) {
            style = navStyles.get(4)
          } else {
            style = navStyles.get(5)
          }
          return style
        }
      })
      hMap.addLayer(navLayer)
    },
    /**
     * 查询通航指数
     */
    queryNavSequrity: () => {
      $.ajax({
        url: navUrl,
        type: 'get',
        async: true,
        success: function(d) {
          let polygonSymbol = []
          navLayer.getSource().clear()
          if (d.data && d.data.length != 0) {
            $.each(d.data, function(i, item) {
              if (item.area != null && item.area != "") {
                let areaObj = JSON.parse(item.area)
                let areaPoints = areaObj.pointList
                let points = []
                for (let p = 0; p < areaPoints.length; p++) {
                  let lonlat = wgs84ToWebMct(areaPoints[p].x, areaPoints[p].y)
                  points.push(lonlat)
                }
                let navproperties = {
                  'datatype': 'navsecurity',
                  'id': item.segmentId,
                  'segmentvalue': item.value
                }
                let navSymbol = new ol.Feature({
                  geometry: new ol.geom.Polygon([points])
                })
                navSymbol.setProperties(navproperties, false)
                polygonSymbol.push(navSymbol)
              }
            })
            navLayer.getSource().addFeatures(polygonSymbol)
          } else {
            console.log('无数据')
          }
        }
      })
    },
    /**
     * 关闭通航指数图层
     */
    close: () => {
      navLayer.getSource().clear()
    }
  }
})()
