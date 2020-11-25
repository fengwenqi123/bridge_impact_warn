import request from '@/utils/request1'
// import qs from 'qs'

export function lists (pageNum, pageSize, shipName, warningTime) {
  return request({
    url: '/eventRecording/getMsgLog',
    method: 'GET',
    params: {
      pageNum, pageSize, shipName, warningTime
    }
  })
}
