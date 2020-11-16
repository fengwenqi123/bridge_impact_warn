import request from '@/utils/request'
// import qs from 'qs'

export function lists (pageNum, pageSize, userLoginName, description, addTime) {
  return request({
    url: '/log/getLogListPage',
    method: 'GET',
    params: {
      pageNum, pageSize, userLoginName, description, addTime
    }
  })
}
