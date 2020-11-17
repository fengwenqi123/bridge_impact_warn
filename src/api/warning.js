import request from '@/utils/request1'
import qs from 'qs'

export function lists (pageNum, pageSize, name, warningTime, entryState) {
  return request({
    url: '/eventRecording/getEventDataList',
    method: 'GET',
    params: {
      pageNum, pageSize, name, warningTime, entryState
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
