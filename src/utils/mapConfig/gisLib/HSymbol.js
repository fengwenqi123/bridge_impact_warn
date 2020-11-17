import { Feature } from 'ol'
import { Point, LineString, Polygon, Circle as GeomCircle } from 'ol/geom'
import { Style, Icon, Text, Fill, Stroke, Circle } from 'ol/style'

/**
 * 创建基本图形要素工具集
 * created by zj on 2018.7.31
 */

var HSymbol = (function () {
  /**
   * 设置要素style样式
   * @param {String} name
   * @param {Number} size
   * @param {String|Array} textColor
   * @param {Number} scale
   * @return {ol.style.Text} textStyle
   */
  var setTextStyle = function (name, size, textColor, offsetx, offsety, textscale) {
    var textFont = size + 'px Microsoft YaHei'
    var textStyle = new Text({
      text: name,
      font: textFont,
      scale: textscale,
      textAlign: 'left',
      offsetY: offsety || -18,
      offsetX: offsetx || 15,
      fill: new Fill({
        color: textColor
      }),
      stroke: new Stroke({
        color: [255, 255, 255],
        width: 1.5
      })
    })
    return textStyle
  }
  return {
    /**
     * 返回一个图形点符号
     * @param {Object} markerAttr  点属性   {'type':'marker',..}
     * @param {Array} lonlat [lon,lat]
     * @param {String|Array} color
     * @param {Number?} radius
     * @param {String?} name
     * @param {Number?} size
     * @param {String?|Array?} textColor
     * @return {ol.Feature} markerSymbol
     */
    getMarkerSymbol: function (markerAttr, lonlat, color, name, size, textColor, offsetx, offsety, textscale) {
      var markerSymbol = new Feature({
        geometry: new Point(lonlat)
      })
      var label = setTextStyle(name, size, textColor, offsetx, offsety, textscale)
      markerSymbol.setStyle(
        new Style({
          text: label,
          // image图片样式只能用setStyle设置，否则会继承矢量图层的样式
          image: new Circle({
            radius: 7,
            fill: new Fill({
              color: color
            }),
            stroke: new Stroke({
              color: 'black',
              width: 2
            })
          })
        })
      )
      markerSymbol.setProperties(markerAttr, false)
      return markerSymbol
    },

    /**
     * 返回一个轨迹点符号
     * @param {Object} markerAttr  点属性   {'type':'marker',..}
     * @param {Array} lonlat [lon,lat]
     * @param {String|Array} color
     * @param {Number?} radius
     * @param {String?} name
     * @param {Number?} size
     * @param {String?|Array?} textColor
     * @return {ol.Feature} markerSymbol
     */
    getTrackMarker: function (markerAttr, lonlat, color, linecolor, linewidth, radius) {
      var markerSymbol = new Feature({
        geometry: new Point(lonlat)
      })
      markerSymbol.setStyle(
        new Style({
          // image图片样式只能用setStyle设置，否则会继承矢量图层的样式
          image: new Circle({
            radius: radius,
            fill: new Fill({
              color: color
            }),
            stroke: new Stroke({
              color: linecolor,
              width: linewidth
            })
          })
        })
      )
      markerSymbol.setProperties(markerAttr, false)
      return markerSymbol
    },

    /**
     * 返回一个带有区分id的图形点符号
     * @param {Object} markerAttr  点属性   {'type':'marker',..}
     * @param {Array} lonlat [lon,lat]
     * @param {String|Array} color
     * @param {Number?} radius
     * @param {String?} name
     * @param {Number?} size
     * @param {String?|Array?} textColor
     * @return {ol.Feature} markerSymbol
     */
    getMarkerWithID: function (markerAttr, lonlat, color, id, name, size, textColor, offsetx, offsety, textscale) {
      var markerSymbol = new Feature({
        geometry: new Point(lonlat),
        id: id
      })
      var label = setTextStyle(name, size, textColor, offsetx, offsety, textscale)
      markerSymbol.setStyle(
        new Style({
          text: label,
          // image图片样式只能用setStyle设置，否则会继承矢量图层的样式
          image: new Circle({
            radius: 7,
            fill: new Fill({
              color: color
            }),
            stroke: new Stroke({
              color: 'black',
              width: 2
            })
          })
        })
      )
      markerSymbol.setProperties(markerAttr, false)
      return markerSymbol
    },

    /**
     * 返回一个图片点符号
     * @param {Object} pictureAttr  点属性   {'type':'picture',..}
     * @param {Array} lonlat [lon,lat]
     * @param {String} imgsrc
     * @param {Number} scale 设置图片大小
     * @param {String?} name
     * @param {Number?} size
     * @param {String?} textColor
     * @return {ol.Feature} pictureSymbol
     */
    getPictureMarkerSymbol: function (pictureAttr, lonlat, imgsrc, scale, name, size, textColor, offsetx, offsety, textscale) {
      var pictureSymbol = new Feature({
        geometry: new Point(lonlat)
      })
      var label = setTextStyle(name, size, textColor, offsetx, offsety, textscale)
      pictureSymbol.setStyle(
        new Style({
          text: label,
          // image图片样式只能用setStyle设置，否则会继承矢量图层的样式
          image: new Icon({
            src: imgsrc,
            scale: scale
          })
        })
      )
      pictureSymbol.setProperties(pictureAttr, false)
      return pictureSymbol
    },

    /**
     * 返回一个线符号（暂时不加标注）
     * @param {Object} lineAttr  线属性   {'type':'line',..}
     * @param {Array} lonlat 点数组 [[lon1,lat1],[lon2,lat2]]
     * @param {Array} lineColor
     * @param {Number} width
     * @return {ol.Feature} lineSymbol
     */
    getLineSymbol: function (lineAttr, lonlatcoor, lineColor, width) {
      var lineSymbol = new Feature({
        geometry: new LineString(lonlatcoor)
      })
      lineSymbol.setStyle(
        new Style({
          stroke: new Stroke({
            width: width,
            color: lineColor
          })
        })
      )
      lineSymbol.setProperties(lineAttr, false)
      return lineSymbol
    },
    /**
     * 返回一个面符号
     * @param {Object} polygonAttr  面属性   {'type':'polygon',..}
     * @param {Array} polygoncoor 点数组 [[[lon1,lat1],[lon2,lat2],[lon3,lat3]]]
     * @param {Array} fillColor [R,G,B,A]数组  A:alpha 透明度 [255,255,255,0]
     * @param {String|Array} lineColor 边界线颜色
     * @param {Number} width 边界线宽
     * @param {Boolean} isDash 是否是虚线
     * @param {String?} name
     * @param {Number?} size
     * @param {String?|Array?} textColor
     * @return {ol.Feature} polygonSymbol
     */
    getPolygonSymbol: function (polygonAttr, polygoncoor, fillColor, lineColor, width, isDash, name, size, textColor, offsetx, offsety, textscale) {
      var polygonSymbol = new Feature({
        geometry: new Polygon(polygoncoor)
      })
      var label = setTextStyle(name, size, textColor, offsetx, offsety, textscale)
      polygonSymbol.setStyle(
        new Style({
          text: label,
          fill: new Fill({
            color: fillColor
          }),
          stroke: new Stroke({
            color: lineColor,
            width: width,
            lineDash: isDash === true ? [1, 2, 3, 4] : [0]
          })
        })
      )
      polygonSymbol.setProperties(polygonAttr, false)
      return polygonSymbol
    },
    /**
     * 返回一个无标注面符号
     * @param {Object} polygonAttr  面属性   {'type':'polygon',..}
     * @param {Array} polygoncoor 点数组 [[[lon1,lat1],[lon2,lat2],[lon3,lat3]]]
     * @param {Array} fillColor [R,G,B,A]数组  A:alpha 透明度 [255,255,255,0]
     * @param {String|Array} lineColor 边界线颜色
     * @param {Number} width 边界线宽
     * @param {Boolean} isDash 是否是虚线
     * @return {ol.Feature} polygonSymbol
     */
    getPolygonSymbolWithoutLabel: function (polygonAttr, polygoncoor, fillColor, lineColor, width, isDash) {
      var polygonSymbol = new Feature({
        geometry: new Polygon(polygoncoor)
      })
      polygonSymbol.setStyle(
        new Style({
          fill: new Fill({
            color: fillColor
          }),
          stroke: new Stroke({
            color: lineColor,
            width: width,
            lineDash: isDash === true ? [1, 2, 3, 4] : [0]
          })
        })
      )
      polygonSymbol.setProperties(polygonAttr, false)
      return polygonSymbol
    },
    /**
     * 返回一个圆符号
     * @param {Object} polygonAttr  圆属性   {'type':'polygon',..}
     * @param {Array} center 圆心 [lon,lat]
     * @param {Number} radius 半径
     * @param {Array} fillColor [R,G,B,A]数组  A:alpha 透明度 [255,255,255,0]
     * @param {String|Array} lineColor 边界线颜色
     * @param {Number} width 边界线宽
     * @param {Boolean} isDash 是否是虚线
     */
    getCircleSymbol: function (polygonAttr, center, radius, fillColor, lineColor, width, isDash) {
      var CircleSymbol = new Feature({
        geometry: new GeomCircle(center, radius, 'XY')
      })
      CircleSymbol.setStyle(
        new Style({
          fill: new Fill({
            color: fillColor
          }),
          stroke: new Stroke({
            color: lineColor,
            width: width,
            lineDash: isDash === true ? [1, 2, 3, 4] : [0]
          })
        })
      )
      CircleSymbol.setProperties(polygonAttr, false)
      return CircleSymbol
    },
    /**
     * 返回一个文字标签符号
     * @param {Object} lableAttr  面属性   {'type':'lable',..}
     * @param {Array} lonlat [lon,lat]
     * @param {String} name 名称
     * @param {Number} size 字体大小
     * @param {String|Array} textColor
     */
    getLableSymbol: function (lableAttr, lonlat, name, size, textColor) {
      var textFont = size + 'px Microsoft YaHei'
      var lableSymbol = new Feature({
        geometry: new Point(lonlat)
      })
      lableSymbol.setStyle(
        new Style({
          text: new Text({
            textAlign: 'center',
            textBaseline: 'middle',
            font: textFont,
            text: name,
            fill: new Fill({ color: textColor })
          })
        }))
      lableSymbol.setProperties(lableAttr, false)
      return lableSymbol
    },
    /**
     * 返回一个带有ID的文字标签符号
     * @param {Object} lableAttr  面属性   {'type':'lable',..}
     * @param {Array} lonlat [lon,lat]
     * @param {String} id
     * @param {String} name 名称
     * @param {Number} size 字体大小
     * @param {String|Array} textColor
     */
    getLableSymbolWithID: function (lableAttr, lonlat, id, name, size, textColor) {
      var textFont = size + 'px Microsoft YaHei'
      var lableSymbol = new Feature({
        geometry: new Point(lonlat),
        id: id
      })
      lableSymbol.setStyle(
        new Style({
          text: new Text({
            textAlign: 'center',
            textBaseline: 'middle',
            font: textFont,
            text: name,
            fill: new Fill({ color: textColor })
          })
        }))
      lableSymbol.setProperties(lableAttr, false)
      return lableSymbol
    }
  }
})()

export default HSymbol
