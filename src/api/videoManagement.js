import request from '@/utils/request1'
import qs from 'qs'

export function lists (pageNum, pageSize, ipAddress, videoType) {
  return request({
    url: '/videoManagement/getVideoDataList',
    method: 'GET',
    params: {
      pageNum, pageSize, ipAddress, videoType
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

export function delt (id) {
  return request({
    url: '/videoManagement/remove',
    method: 'delete',
    params: {
      idList: id.join(',')
    }
  })
}
