import request from '@/utils/request'
// import qs from 'qs'

export function lists (pageNum, pageSize, userLoginName, description, startTime, endTime) {
  return request({
    url: '/generico-service/log/getLogListPage',
    method: 'GET',
    params: {
      pageNum, pageSize, userLoginName, description, startTime, endTime
    }
  })
}
