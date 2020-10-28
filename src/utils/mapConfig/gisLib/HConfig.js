/**
 * gis配置常量
 * created by zj on 2018.7.30
 */

export const GIS_HOST = 'http://10.100.70.227:8080' // 智慧海事底图地址
export const GIS_LAYERHOST = 'http://10.100.70.227:8090' // 智慧海事区县图层地址
export const GIS_SERVERIP = 'http://10.100.70.226/api' // 通航要素接口
export const GIS_DXNFEATURES = 'http://10.100.70.209:9099/api'// 合作方要素
export const GIS_POINT = 'http://172.16.103.40:8083' // 污染物接收点
export const GIS_DLHSFEATURES = 'http://10.100.70.227/JXChannel'
export const GIS_AREASHIP = 'http://10.100.70.226/api/gps/track/trackQueryByRect?' // 区域轨迹接口
export const GIS_HISTORYSHIP = 'http://10.100.70.226/api/gps/track/shipQuery?' // 历史轨迹接口

// 智慧海事船舶图层
export const GIS_SHIPWMS = 'http://10.100.70.227:8090/geoserver/geobase/wms'
export const GIS_SHIPWFS = 'http://10.100.70.227:8090/geoserver/geobase/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geobase:zjghship&maxFeatures=20000&outputFormat=application/json'

// 智慧海事区县图层
export const GIS_COUNTYWFS = 'http://10.100.70.227:8090/geoserver/geobase/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geobase:zj_county&maxFeatures=20&outputFormat=application/json'

// 船舶类型
export const GIS_HXTSHIP = '浙海巡'
export const GIS_PASSENGERSHIP = 1
export const GIS_GOODSSHIP = 2
export const GIS_DANGERSHIP = 3
export const GIS_OTHERSHIP = 99
export const GIS_NONAMESHIP = 0
