import request from '@/utils/request'
// import qs from 'qs'

export function lists (pageNum, pageSize, shipName, startTime, endTime) {
  return request({
    url: '/alerta-service/eventRecording/getMsgLog',
    method: 'GET',
    params: {
      pageNum, pageSize, shipName, startTime, endTime
    }
  })
}
