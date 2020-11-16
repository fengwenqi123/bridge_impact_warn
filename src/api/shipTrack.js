import request from '@/utils/request'
// import qs from 'qs'

export function shipList (minReceiveTime, maxReceiveTime, minLongitude, maxLongitude, minLatitude, maxLatitude, type) {
  return request({
    url: '/gps/track/trackQueryByRect',
    method: 'GET',
    params: {
      minReceiveTime, maxReceiveTime, minLongitude, maxLongitude, minLatitude, maxLatitude, type
    }
  })
}
