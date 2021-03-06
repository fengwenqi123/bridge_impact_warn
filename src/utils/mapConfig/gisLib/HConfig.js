/**
 * gis配置常量
 * created by zj on 2020.11.16
 */

/** ***********************************测试***************************************/
// export const GIS_HOST = 'http://192.168.1.120:83/gis' // 桥梁防撞底图地址
// export const GIS_SERVERIP = 'http://192.168.1.120:8001' // 通航要素接口(桥梁防撞只保留视频)
// export const GIS_SHIPWMS = 'https://map.cjbe88.com/geoserver/geobasedata/wms'
// export const GIS_SHIPWFS = 'https://map.cjbe88.com/geoserver/geobasedata/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geobasedata:zjghship&maxFeatures=20000&outputFormat=application/json'
/*******************************************************************************/

// export const GIS_HOST = '/gis' // 桥梁防撞底图地址
// export const GIS_SERVERIP = 'http://172.20.20.15/api' // 通航要素接口(桥梁防撞只保留视频)
// export const GIS_SHIPWMS = '/gis/geoserver/geobase/wms'
// export const GIS_SHIPWFS = '/gis/geoserver/geobase/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geobase:ship_position&maxFeatures=20000&outputFormat=application/json'

export const GIS_HOST = process.env.VUE_APP_GIS_HOST
export const GIS_SERVERIP = process.env.VUE_APP_GIS_SERVERIP
export const GIS_SHIPWMS = process.env.VUE_APP_GIS_SHIPWMS
export const GIS_SHIPWFS = process.env.VUE_APP_GIS_SHIPWFS
// 船舶类型
export const GIS_HXTSHIP = '浙海巡'
export const GIS_PASSENGERSHIP = 1
export const GIS_GOODSSHIP = 2
export const GIS_DANGERSHIP = 3
export const GIS_OTHERSHIP = 99
export const GIS_NONAMESHIP = 0
