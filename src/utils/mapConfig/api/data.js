import request from '@/utils/mapConfig/request'
// import qs from 'qs'

export function bridgeList () {
  return request({
    url: '/gis/bridge/list',
    method: 'GET'
  })
}

export function videoList () {
  return request({
    url: '/gis/videoSurveillance/list',
    method: 'GET'
  })
}
