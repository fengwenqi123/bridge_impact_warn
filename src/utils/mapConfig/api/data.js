import request from '@/utils/request1'
import request_video from '@/utils/mapConfig/request/index'
// import qs from 'qs'

export function bridgeList () {
  return request({
    url: '/gis/bridge/list',
    method: 'GET'
  })
}

export function videoList () {
  return request_video({
    url: '/videoManagement/getVideoDataList?pageSize=100000',
    method: 'GET'
  })
}

export function checkAreaList () {
  return request_video({
    url: '/zoneAdministration/getZoneDataList',
    method: 'GET'
  })
}
