import request from '@/utils/requestNoLoad'
// import qs from 'qs'

export function bridgeList () {
  return request({
    url: '/alerta-service/gis/bridge/list',
    method: 'GET'
  })
}

export function videoList () {
  return request({
    url: '/alerta-service/videoManagement/getVideoDataList?pageSize=30',
    method: 'GET'
  })
}

export function checkAreaList () {
  return request({
    url: '/alerta-service/zoneAdministration/getZoneDataList?pageSize=30',
    method: 'GET'
  })
}
