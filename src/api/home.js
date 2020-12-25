import request from '@/utils/request'

import qs from 'qs'

export function statShipCheck (departmentId) {
  return request({
    url: '/generico-service/stats/shipCheck/statShipCheckByDepartmentId',
    method: 'GET',
    params: {
      departmentId
    }
  })
}

export function hydrology (pageNum, pageSize, city) {
  return request({
    url: '/generico-service/environment/hydrology/',
    method: 'GET',
    params: {
      pageNum, pageSize, city
    }
  })
}

export function jqAlarm (departmentId, pageNo, pageSize) {
  return request({
    url: '/generico-service/area/patrolRecord/getAlarmByDepartmentId',
    method: 'GET',
    params: {
      departmentId, pageNo, pageSize
    }
  })
}

export function latestReport () {
  return request({
    url: '/generico-service/cvicse/shipReport/latestReport',
    method: 'GET'
  })
}

export function getAlarmByDepartmentId (departmentId, day) {
  const data = qs.stringify({
    departmentId,
    day
  })
  return request({
    url: '/generico-service/generico-service/check/dataForward/data/getAlarmByDepartmentId',
    method: 'POST',
    data
  })
}
