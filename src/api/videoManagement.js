import request from '@/utils/request1'
import qs from 'qs'

export function lists (pageNum, pageSize, cercaCoordinates, initiateState) {
  return request({
    url: '/videoManagement/getVideoDataList',
    method: 'GET',
    params: {
      pageNum, pageSize, cercaCoordinates, initiateState
    }
  })
}

export function add (form) {
  const data = qs.stringify(form)
  return request({
    url: '/videoManagement/saveOrUpdate',
    method: 'POST',
    data
  })
}
