import request from '@/utils/request'
import qs from 'qs'

export function lists (pageNum, pageSize, cercaName, initiateState, deptName) {
  return request({
    url: '/alerta-service/zoneAdministration/getZoneDataList',
    method: 'GET',
    params: {
      pageNum, pageSize, cercaName, initiateState, deptName
    }
  })
}

export function listsWithNoPage () {
  return request({
    url: '/alerta-service/zoneAdministration/getZoneList',
    method: 'GET'
  })
}

export function add (form) {
  const data = qs.stringify(form)
  return request({
    url: '/alerta-service/zoneAdministration/saveOrUpdate',
    method: 'POST',
    data
  })
}

export function delt (id) {
  return request({
    url: '/alerta-service/zoneAdministration/remove',
    method: 'delete',
    params: {
      idList: id.join(',')
    }
  })
}
