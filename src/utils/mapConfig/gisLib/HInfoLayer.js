import { Vector } from 'ol/layer'
import { Vector as SVector } from 'ol/source'

/**
 * 要素图层类(ol.layer.Vector)
 * @param {String} type 图层类型【必需】
 * @param {Number} maxScale 最大分辨率(放大地图到该分辨率时显示)
 * @param {Number} minScale 最小分辨率(放大地图到该分辨率时隐藏)
 * @param {Boolean} isVisible 图层是否显示【必需】 设置图层显隐，要素对象均存在
 * created by zj on 2018.7.30
 */
class HInfoLayer {
  constructor (type, isVisible, maxScale, minScale) {
    this.maxScale = maxScale
    this.minScale = minScale
    this.layer = new Vector({
      source: new SVector(),
      type: type,
      visible: isVisible
    })
  }

  /**
   * 要素图层中添加点(点标记或点图片)
   * @param {Array[ol.feature]} marker 参数是一个marker数组
   */
  addMarkerSymbol (marker) {
    this.layer.getSource().addFeatures(marker)
    this.layer.setMaxResolution(this.maxScale)
    this.layer.setMinResolution(this.minScale)
  }

  /**
   * 要素图层中添加线
   * @param {Array[ol.feature]} line 线数组
   */
  addLineSymbol (line) {
    this.layer.getSource().addFeatures(line)
    this.layer.setMaxResolution(this.maxScale)
    this.layer.setMinResolution(this.minScale)
  }

  /**
   * 要素图层中添加面
   * @param {Array[ol.feature]} polygon 面数组
   */
  addPolygonSymbol (polygon) {
    this.layer.getSource().addFeatures(polygon)
    // this.layer.setMaxResolution(this.maxScale);
    // this.layer.setMinResolution(this.minScale);
  }

  /**
   * 要素图层中添加圆
   * @param {Array[ol.feature]} circle 圆数组
   */
  addCircleSymbol (circle) {
    this.layer.getSource().addFeatures(circle)
    this.layer.setMaxResolution(this.maxScale)
    this.layer.setMinResolution(this.minScale)
  }

  /**
   * 要素图层添加文字标签
   * @param {Array[ol.feature]} lableSymbol 文字标签数组
   */
  addLableSymbol (lableSymbol) {
    this.layer.getSource().addFeatures(lableSymbol)
    this.layer.setMaxResolution(this.maxScale)
    this.layer.setMinResolution(this.minScale)
  }

  /*
 * 清除图层中的要素
 */
  clear () {
    this.layer.getSource().clear()
  }

  /**
   * 清楚图层中单个要素
   * @param {ol.feature} feature
   */
  removeSingleFeature (feature) {
    this.layer.getSource().removeFeature(feature)
  }

  /**
   * 获取图层中的要素
   * @return {Array[ol.feature]} featureArray 要素数组
   */
  getFeatureArray () {
    return this.layer.getSource().getFeatures()
  }
}
export default HInfoLayer
