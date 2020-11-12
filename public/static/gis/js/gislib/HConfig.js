/**
 * gis配置常量
 * created by zj on 2018.7.30
 */

var GIS_HOST = 'http://10.100.70.227:8080' // 智慧海事底图地址
var GIS_LAYERHOST = 'http://10.100.70.227:8090' // 智慧海事区县图层地址
var GIS_SERVERIP = 'http://10.100.70.226/api' // 通航要素接口
var GIS_DXNFEATURES = 'https://10.100.70.226/dxl_api'// 合作方要素
var GIS_POINT = 'http://172.16.103.40:8083' // 污染物接收点
var GIS_DLHSFEATURES = 'http://10.100.70.227/JXChannel'
var GIS_AREASHIP = 'http://10.100.70.226/api/gps/track/trackQueryByRect?' // 区域轨迹接口
var GIS_HISTORYSHIP = 'http://10.100.70.226/api/gps/track/shipQuery?' // 历史轨迹接口

// 智慧海事船舶图层
var GIS_SHIPWMS = 'http://10.100.70.227:8090/geoserver/geobase/wms'
var GIS_SHIPWFS = 'http://10.100.70.227:8090/geoserver/geobase/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geobase:zjghship&maxFeatures=20000&outputFormat=application/json'

// 智慧海事区县图层
var GIS_COUNTYWFS = 'http://10.100.70.227:8090/geoserver/geobase/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geobase:zj_county&maxFeatures=20&outputFormat=application/json'

// 船舶类型
var GIS_HXTSHIP = '浙海巡'
var GIS_PASSENGERSHIP = 1
var GIS_GOODSSHIP = 2
var GIS_DANGERSHIP = 3
var GIS_OTHERSHIP = 99
var GIS_NONAMESHIP = 0
