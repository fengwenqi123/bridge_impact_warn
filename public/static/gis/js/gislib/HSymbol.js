/**
 * 创建基本图形要素工具集
 * created by zj on 2018.7.31
 */

var HSymbol = (function() {
  /**
   * 设置要素style样式
   * @param {String} name
   * @param {Number} size
   * @param {String|Array} textColor
   * @param {Number} scale
   * @return {ol.style.Text} textStyle
   */
  var setTextStyle = function(name, size, textColor, offsetx, offsety, textscale) {
    var textFont = size + 'px Microsoft YaHei'
    var textStyle = new ol.style.Text({
      text: name,
      font: textFont,
      scale: textscale,
      textAlign: 'left',
      offsetY: offsety ? offsety : -18,
      offsetX: offsetx ? offsetx : 15,
      fill: new ol.style.Fill({
        color: textColor
      }),
      stroke: new ol.style.Stroke({
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
    getMarkerSymbol: function(markerAttr, lonlat, color, name, size, textColor, offsetx, offsety, textscale) {
      var markerSymbol = new ol.Feature({
        geometry: new ol.geom.Point(lonlat)
      })
      var label = setTextStyle(name, size, textColor, offsetx, offsety, textscale)
      markerSymbol.setStyle(
        new ol.style.Style({
          text: label,
          //image图片样式只能用setStyle设置，否则会继承矢量图层的样式
          image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
              color: color
            }),
            stroke: new ol.style.Stroke({
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
    getTrackMarker: function(markerAttr, lonlat, color, linecolor, linewidth, radius) {
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
            }),
            stroke: new ol.style.Stroke({
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
    getMarkerWithID: function(markerAttr, lonlat, color, id, name, size, textColor, offsetx, offsety, textscale) {
      var markerSymbol = new ol.Feature({
        geometry: new ol.geom.Point(lonlat),
        id: id
      })
      var label = setTextStyle(name, size, textColor, offsetx, offsety, textscale)
      markerSymbol.setStyle(
        new ol.style.Style({
          text: label,
          //image图片样式只能用setStyle设置，否则会继承矢量图层的样式
          image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
              color: color
            }),
            stroke: new ol.style.Stroke({
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
    getPictureMarkerSymbol: function(pictureAttr, lonlat, imgsrc, scale, name, size, textColor, offsetx, offsety, textscale) {
      var pictureSymbol = new ol.Feature({
        geometry: new ol.geom.Point(lonlat)
      })
      var label = setTextStyle(name, size, textColor, offsetx, offsety, textscale)
      pictureSymbol.setStyle(
        new ol.style.Style({
          text: label,
          //image图片样式只能用setStyle设置，否则会继承矢量图层的样式
          image: new ol.style.Icon({
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
    getLineSymbol: function(lineAttr, lonlatcoor, lineColor, width) {
      var lineSymbol = new ol.Feature({
        geometry: new ol.geom.LineString(lonlatcoor)
      })
      lineSymbol.setStyle(
        new ol.style.Style({
          stroke: new ol.style.Stroke({
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
    getPolygonSymbol: function(polygonAttr, polygoncoor, fillColor, lineColor, width, isDash, name, size, textColor, offsetx, offsety, textscale) {
      var polygonSymbol = new ol.Feature({
        geometry: new ol.geom.Polygon(polygoncoor)
      })
      var label = setTextStyle(name, size, textColor, offsetx, offsety, textscale)
      polygonSymbol.setStyle(
        new ol.style.Style({
          text: label,
          fill: new ol.style.Fill({
            color: fillColor
          }),
          stroke: new ol.style.Stroke({
            color: lineColor,
            width: width,
            lineDash: isDash == true ? [1, 2, 3, 4] : [0]
          })
        })
      )
      polygonSymbol.setProperties(polygonAttr, false)
      return polygonSymbol
    },
    /**
     * 返回一个没有标注的面符号
     * @param polygonAttr
     * @param polygoncoor
     * @param fillColor
     * @param lineColor
     * @param width
     * @param isDash
     */
    getPolygonWithoutLabel: function(polygonAttr, polygoncoor, fillColor, lineColor, width, isDash) {
      var polygonSymbol = new ol.Feature({
        geometry: new ol.geom.Polygon(polygoncoor)
      })
      polygonSymbol.setStyle(
        new ol.style.Style({
          fill: new ol.style.Fill({
            color: fillColor
          }),
          stroke: new ol.style.Stroke({
            color: lineColor,
            width: width,
            lineDash: isDash == true ? [1, 2, 3, 4] : [0]
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
    getCircleSymbol: function(polygonAttr, center, radius, fillColor, lineColor, width, isDash) {
      var circleSymbol = new ol.Feature({
        geometry: new ol.geom.Circle(center, radius, 'XY')
      })
      circleSymbol.setStyle(
        new ol.style.Style({
          fill: new ol.style.Fill({
            color: fillColor
          }),
          stroke: new ol.style.Stroke({
            color: lineColor,
            width: width,
            lineDash: isDash ? [1, 2, 3, 4] : [0]
          })
        })
      )
      circleSymbol.setProperties(polygonAttr, false)
      return circleSymbol
    },
    /**
     * 返回一个文字标签符号
     * @param {Object} lableAttr  面属性   {'type':'lable',..}
     * @param {Array} lonlat [lon,lat]
     * @param {String} name 名称
     * @param {Number} size 字体大小
     * @param {String|Array} textColor
     */
    getLableSymbol: function(lableAttr, lonlat, name, size, textColor) {
      var textFont = size + 'px Microsoft YaHei'
      var lableSymbol = new ol.Feature({
        geometry: new ol.geom.Point(lonlat)
      })
      lableSymbol.setStyle(
        new ol.style.Style({
          text: new ol.style.Text({
            textAlign: 'center',
            textBaseline: 'middle',
            font: textFont,
            text: name,
            fill: new ol.style.Fill({ color: textColor })
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
    getLableSymbolWithID: function(lableAttr, lonlat, id, name, size, textColor) {
      var textFont = size + 'px Microsoft YaHei'
      var lableSymbol = new ol.Feature({
        geometry: new ol.geom.Point(lonlat),
        id: id
      })
      lableSymbol.setStyle(
        new ol.style.Style({
          text: new ol.style.Text({
            textAlign: 'center',
            textBaseline: 'middle',
            font: textFont,
            text: name,
            fill: new ol.style.Fill({ color: textColor })
          })
        }))
      lableSymbol.setProperties(lableAttr, false)
      return lableSymbol
    }
  }
})()
