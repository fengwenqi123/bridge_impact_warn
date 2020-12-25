import request from '@/utils/request'
import qs from 'qs'

export function getSignal (zwcm) {
  return request({
    url: '/ais-service/signal/getSignalNameList',
    method: 'GET',
    params: {
      zwcm
    }
  })
}

export function getShipInfo (zwcm) {
  return request({
    url: '/alerta-service/shipAdministration/getSipAdminDataList',
    method: 'GET',
    params: { zwcm }
  })
}

export function shipzhzs (zhzs) {
  return request({
    url: '/alerta-service/collaboration/certificateAll',
    method: 'GET',
    params: zhzs
  })
}

export function shipdzbg (dzbg) {
  return request({
    url: '/alerta-service/cvicse/shipReport',
    method: 'GET',
    params: dzbg
  })
}

export function shipJy (jy) {
  return request({
    url: '/alerta-service/collaboration/shipInspect/list',
    method: 'GET',
    params: jy
  })
}

export function shipdzbg1 (pageNum, pageSize, order, sort, keyword, shipName) {
  return request({
    url: '/alerta-service/cvicse/shipReport',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      order,
      sort,
      keyword,
      shipName
    }
  })
}

export function add (id, loginName, name, mobile, status, description) {
  const data = qs.stringify({
    id,
    loginName,
    name,
    mobile,
    status,
    description
  })
  return request({
    url: '/alerta-service/account/account',
    method: 'POST',
    data
  })
}

export function hcList (shipName, pageNum, pageSize, order, sort, mmsi, type, direction, keyword) {
  return request({
    url: '/alerta-service/inspection/shipFrequency',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      order,
      sort,
      shipName,
      mmsi,
      type,
      direction,
      keyword
    }
  })
}
export function cyrz (page, row, zwcm, cyxm) {
  return request({
    url: '/alerta-service/check/dataForward/data/rzcyxx',
    method: 'POST',
    params: {
      page,
      row,
      zwcm,
      cyxm
    }
  })
}
export function gpsInfo (shipName) {
  return request({
    url: '/alerta-service/gps/status/findLatestByShipName',
    method: 'GET',
    params: {
      shipName
    }
  })
}
