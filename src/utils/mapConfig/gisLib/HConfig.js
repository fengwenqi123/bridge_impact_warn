/**
 * gis配置常量
 * created by zj on 2020.11.16
 */


/*************************************测试***************************************/
export const GIS_HOST = 'http://192.168.1.209:8090' // 桥梁防撞底图地址
export const GIS_SHIPWMS = 'https://map.cjbe88.com/geoserver/geobasedata/wms'
export const GIS_SHIPWFS = 'https://map.cjbe88.com/geoserver/geobasedata/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geobasedata:zjghship&maxFeatures=20000&outputFormat=application/json'
/*******************************************************************************/



// export const GIS_HOST = 'http://10.100.70.227:8080' // 桥梁防撞底图地址
// export const GIS_SERVERIP = 'http://10.100.70.226/api' // 通航要素接口(桥梁防撞只保留视频)

// 智慧海事船舶图层
// export const GIS_SHIPWMS = 'http://10.100.70.227:8090/geoserver/geobase/wms'
// export const GIS_SHIPWFS = 'http://10.100.70.227:8090/geoserver/geobase/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geobase:zjghship&maxFeatures=20000&outputFormat=application/json'

// 船舶类型
export const GIS_HXTSHIP = '浙海巡'
export const GIS_PASSENGERSHIP = 1
export const GIS_GOODSSHIP = 2
export const GIS_DANGERSHIP = 3
export const GIS_OTHERSHIP = 99
export const GIS_NONAMESHIP = 0
