/**
 * 要素图层类(ol.layer.Vector)
 * @param {String} type 图层类型【必需】
 * @param {Number} scale 最大显示分辨率(需要研究层级和显示分辨率的关系)
 * @param {Boolean} isVisible 图层是否显示
 * @param {数组} data 图层是否显示
 * @param {Number} minShowLevel 图层最小加载级别
 * @param {Number} maxShowLevel 图层最大加载级别
 * @param {Number} nextLoadDataTime 图层数据下次刷新时间 0：用不刷新
 * created by zj on 2018.7.30
 */

function HInfoLayerExt(type, scale, visible, data, minShowLevel, maxShowLevel, nextLoadDataTime){
    this.scale = scale;
    this.layer = new ol.layer.Vector({
    	source : new ol.source.Vector(),
    	type : type,
    	visible : visible
    });
    this.data				= (data) ? data : [];
    this.minShowLevel 		= minShowLevel;
    this.maxShowLevel		= maxShowLevel;
    this.nextLoadDataTime	= (nextLoadDataTime) ? nextLoadDataTime : 0;
}

/**
 * 要素图层中添加点(点标记或点图片)
 * @param {Array[ol.feature]} marker 参数是一个marker数组
 */
HInfoLayerExt.prototype.addMarkerSymbol = function(marker){
	this.layer.getSource().addFeatures(marker);
	this.layer.setMaxResolution(this.scale);
}

/**
 * 要素图层中添加线
 * @param {Array[ol.feature]} line 线数组
 */
HInfoLayerExt.prototype.addLineSymbol = function(line){
	this.layer.getSource().addFeatures(line);
	this.layer.setMaxResolution(this.scale);
}

/**
 * 要素图层中添加面
 * @param {Array[ol.feature]} polygon 面数组
 */
HInfoLayerExt.prototype.addPolygonSymbol = function(polygon){
	this.layer.getSource().addFeatures(polygon);
	this.layer.setMaxResolution(this.scale);
}

/**
 * 要素图层添加文字标签
 * @param {Array[ol.feature]} lableSymbol 文字标签数组
 */
HInfoLayerExt.prototype.addLableSymbol = function(lableSymbol){
    this.layer.getSource().addFeatures(lableSymbol);
	this.layer.setMaxResolution(this.scale);
}

/**
 * 清除图层中的要素
 */
HInfoLayerExt.prototype.clear = function(){
	this.layer.getSource().clear();
}

/**
 * 获取图层中的要素
 * @return {Array[ol.feature]} featureArray 要素数组
 */
HInfoLayerExt.prototype.getFeatureArray = function(){
	var featureArray = this.layer.getSource().getFeatures();
	return featureArray;
}

/**
 * 设置图层数据
 */
HInfoLayerExt.prototype.setData = function(d){
	this.data = d;
}

/**
 * 返回图层数据
 */
HInfoLayerExt.prototype.getData = function(){
	return this.data;
}

/**
 * 返回图层最小加载级别
 */
HInfoLayerExt.prototype.getMinShowLevel = function(){
	return this.minShowLevel;
}

/**
 * 返回图层最大加载级别
 */
HInfoLayerExt.prototype.getMaxShowLevel = function(){
	return this.maxShowLevel;
}

/**
 * 返回图层数据下次加载时间
 */
HInfoLayerExt.prototype.getNextLoadDataTime = function(){
	return this.nextLoadDataTime;
}

/**
 * 返回图层数据下次加载时间
 */
HInfoLayerExt.prototype.setNextLoadDataTime = function(time){
	this.nextLoadDataTime = time;
}
