import request from '@/utils/request1'
import qs from 'qs'

export function lists (pageNum, pageSize, cercaName, initiateState, deptName) {
  return request({
    url: '/zoneAdministration/getZoneDataList',
    method: 'GET',
    params: {
      pageNum, pageSize, cercaName, initiateState, deptName
    }
  })
}

export function add (form) {
  const data = qs.stringify(form)
  return request({
    url: '/zoneAdministration/saveOrUpdate',
    method: 'POST',
    data
  })
}

export function delt (id) {
  return request({
    url: '/zoneAdministration/remove',
    method: 'delete',
    params: {
      idList: id.join(',')
    }
  })
}
