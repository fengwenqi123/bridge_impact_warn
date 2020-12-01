import request from '@/utils/request1'
import request2 from '@/utils/request2'
import qs from 'qs'

export function getSignal (zwcm) {
  return request2({
    url: '/ais-service/signal/getSignalNameList',
    method: 'GET',
    params: {
      zwcm
    }
  })
}

export function getShipInfo (zwcm) {
  return request({
    url: '/shipAdministration/getSipAdminDataList',
    method: 'GET',
    params: { zwcm }
  })
}

export function shipzhzs (zhzs) {
  return request({
    url: '/collaboration/certificateAll',
    method: 'GET',
    params: zhzs
  })
}

export function shipdzbg (dzbg) {
  return request({
    url: '/cvicse/shipReport',
    method: 'GET',
    params: dzbg
  })
}

export function shipJy (jy) {
  return request({
    url: '/collaboration/shipInspect/list',
    method: 'GET',
    params: jy
  })
}

export function shipdzbg1 (pageNum, pageSize, order, sort, keyword, shipName) {
  return request({
    url: '/cvicse/shipReport',
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
    url: '/account/account',
    method: 'POST',
    data
  })
}

export function hcList (shipName, pageNum, pageSize, order, sort, mmsi, type, direction, keyword) {
  return request({
    url: '/inspection/shipFrequency',
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
    url: '/check/dataForward/data/rzcyxx',
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
    url: '/gps/status/findLatestByShipName',
    method: 'GET',
    params: {
      shipName
    }
  })
}
