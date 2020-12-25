import request from '@/utils/request'
import qs from 'qs'

export function lists (pageNum, pageSize, cercaCoordinates, initiateState) {
  return request({
    url: '/alerta-service/videoManagement/getVideoDataList',
    method: 'GET',
    params: {
      pageNum, pageSize, cercaCoordinates, initiateState
    }
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
