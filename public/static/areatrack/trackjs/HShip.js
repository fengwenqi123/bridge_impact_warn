/**
 * 船舶专用图形要素工具集
 * created by zj on 2018.7.31
 */

var HShip = (function() {
  /**
   * 设置船舶符号标签样式
   * @param {String} name 船名
   * @param {Number} size 字体大小
   * @param {String|Array} textColor 字体颜色
   * @return {ol.style.Text} textStyle
   */
  var setShipTextStyle = function(name, size, textColor, textscale) {
    var textFont = size + 'px Microsoft YaHei'
    var textStyle = new ol.style.Text({
      text: name,
      font: textFont,
      scale: textscale,
      offsetY: -18,
      offsetX: 15,
      fill: new ol.style.Fill({
        color: textColor
      }),
      stroke: new ol.style.Stroke({
        color: 'white',
        width: 2
      })
    })
    return textStyle
  }
  return {
    /**
     * 返回一个船舶符号
     * @param {Object} shipAttr  船舶属性   {'type':'ship',name:'浙xxxx',...}
     * @param {Array} fillColor [R,G,B,A]数组  A:alpha 透明度 [255,255,255,1?]
     * @param {String|Array} lineColor
     * @param {String?|Array?} textColor
     * @return {ol.Feature} shipSymbol
     */
    getShipSymbol: function(shipAttr, fillColor, lineColor, textColor, textscale) {
      var shipName = shipAttr['name']
      var x = shipAttr['lon']
      var y = shipAttr['lat']
      var speed = shipAttr['speed'] * 1.852//1节 = 1海里/时 = 1.852 千米/时
      var direct = shipAttr['direction']
      //上顶点
      var P = wgs84ToWebMct(x, y)
      //生成船舶符号点坐标
      var newdirect = (450 - direct) % 360
      var newspeed = Math.min(12, speed)//航速最高选12km/h
      var delta = 4000
      //左下顶点
      var leftdirect = (165 + newdirect) % 360
      var leftx = x + Math.cos(leftdirect * Math.PI / 180) / delta
      var lefty = y + Math.sin(leftdirect * Math.PI / 180) / delta
      var PL = wgs84ToWebMct(leftx, lefty)
      //右下顶点
      var rightdirect = (195 + newdirect) % 360
      var rightx = x + Math.cos(rightdirect * Math.PI / 180) / delta
      var righty = y + Math.sin(rightdirect * Math.PI / 180) / delta
      var PR = wgs84ToWebMct(rightx, righty)
      //最上方的线顶点
      var topx = x + Math.cos(newdirect * Math.PI / 180) * newspeed / 50000
      var topy = y + Math.sin(newdirect * Math.PI / 180) * newspeed / 50000
      var PT = wgs84ToWebMct(topx, topy)
      var shipcoor = [[P, PL, PR, P, PT]]
      var shipSymbol = new ol.Feature({
        geometry: new ol.geom.Polygon(shipcoor)
      })
      var label = setShipTextStyle(shipName, 14, textColor, textscale)
      shipSymbol.setStyle(
        new ol.style.Style({
          text: label,
          fill: new ol.style.Fill({
            color: fillColor
          }),
          stroke: new ol.style.Stroke({
            color: lineColor,
            width: 1.5
          })
        })
      )
      shipSymbol.setProperties(shipAttr, false)
      return shipSymbol
    },
    /**
     * 返回轨迹船舶符号
     * @param {Object} shipAttr  船舶属性   {'type':'ship','shipName':'浙xxxx',...}
     * @param {Array} fillColor [R,G,B,A]数组  A:alpha 透明度 [255,255,255,1?]
     * @param {String|Array} lineColor
     * @return {ol.Feature} shipSymbol
     */
    getTrackShipSymbol: function(shipAttr, fillColor, lineColor, textColor) {
      var shipName = shipAttr['shipName']
      var x = shipAttr['longitude']
      var y = shipAttr['latitude']
      var speed = shipAttr['speed'] * 1.852//1节 = 1海里/时 = 1.852 千米/时
      var direct = shipAttr['direction']
      //上顶点
      var P = wgs84ToWebMct(x, y)
      //生成船舶符号点坐标
      var newdirect = (450 - direct) % 360
      var newspeed = Math.min(12, speed)//航速最高选12km/h
      var delta = 4000
      //左下顶点
      var leftdirect = (165 + newdirect) % 360
      var leftx = x + Math.cos(leftdirect * Math.PI / 180) / delta
      var lefty = y + Math.sin(leftdirect * Math.PI / 180) / delta
      var PL = wgs84ToWebMct(leftx, lefty)
      //右下顶点
      var rightdirect = (195 + newdirect) % 360
      var rightx = x + Math.cos(rightdirect * Math.PI / 180) / delta
      var righty = y + Math.sin(rightdirect * Math.PI / 180) / delta
      var PR = wgs84ToWebMct(rightx, righty)
      //最上方的线顶点
      var topx = x + Math.cos(newdirect * Math.PI / 180) * newspeed / 50000
      var topy = y + Math.sin(newdirect * Math.PI / 180) * newspeed / 50000
      var PT = wgs84ToWebMct(topx, topy)
      var shipcoor = [[P, PL, PR, P, PT]]
      var shipSymbol = new ol.Feature({
        geometry: new ol.geom.Polygon(shipcoor)
      })
      var label = setShipTextStyle(shipName, 12, textColor)
      shipSymbol.setStyle(
        new ol.style.Style({
          text: label,
          fill: new ol.style.Fill({
            color: fillColor
          }),
          stroke: new ol.style.Stroke({
            color: lineColor,
            width: 1.5
          })
        })
      )
      shipSymbol.setProperties(shipAttr, false)
      return shipSymbol
    },
    /**
     * 返回一个船舶图形点符号
     * @param {Object} markerAttr  点属性   {'type':'marker',..}
     * @param {String|Array} color
     * @param {Number?} radius
     * @return {ol.Feature} markerSymbol
     */
    getShipMarkerSymbol: function(markerAttr, color, radius) {
      var x = markerAttr['lon']
      var y = markerAttr['lat']
      var lonlat = wgs84ToWebMct(x, y)
      var markerSymbol = new ol.Feature({
        geometry: new ol.geom.Point(lonlat)
      })
      markerSymbol.setStyle(
        new ol.style.Style({
          //image图片样式只能用setStyle设置，否则会继承矢量图层的样式
          image: new ol.style.Circle({
            radius: radius,
            fill: new ol.style.Fill({
              color: color
            })
          })
        })
      )
      markerSymbol.setProperties(markerAttr, false)
      return markerSymbol
    }
  }
})()
