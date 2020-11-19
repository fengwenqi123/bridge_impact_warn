import request from '@/utils/request1'
// import qs from 'qs'

export function bridgeList () {
  return request({
    url: '/gis/bridge/list',
    method: 'GET'
  })
}

export function videoList () {
  return request({
    url: '/videoManagement/getVideoDataList?pageSize=30',
    method: 'GET'
  })
}

export function checkAreaList () {
  return request({
    url: '/zoneAdministration/getZoneDataList?pageSize=30',
    method: 'GET'
  })
}
